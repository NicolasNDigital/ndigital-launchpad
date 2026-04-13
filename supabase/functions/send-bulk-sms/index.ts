import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

interface SendBulkSmsPayload {
  recipients: string[]
  message: string
}

interface TwilioResult {
  recipient: string
  status: "sent" | "failed"
  error?: string
}

serve(async (req: Request) => {
  // Preflight CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS })
  }

  try {
    // ── 1. Vérification de l'utilisateur connecté ────────────────────────
    const authHeader = req.headers.get("Authorization")
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization header" }), {
        status: 401,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      })
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    )

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      })
    }

    // ── 2. Validation du payload ─────────────────────────────────────────
    const payload: SendBulkSmsPayload = await req.json()

    if (!Array.isArray(payload.recipients) || payload.recipients.length === 0) {
      return new Response(JSON.stringify({ error: "recipients must be a non-empty array" }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      })
    }

    if (!payload.message || typeof payload.message !== "string" || payload.message.trim().length === 0) {
      return new Response(JSON.stringify({ error: "message must be a non-empty string" }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      })
    }

    // ── 3. Vérification du solde (double contrôle côté serveur) ──────────
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    const { data: profileData, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("sms_credits")
      .eq("id", user.id)
      .single()

    if (profileError || !profileData) {
      return new Response(JSON.stringify({ error: "Profile not found" }), {
        status: 404,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      })
    }

    if (profileData.sms_credits < payload.recipients.length) {
      return new Response(JSON.stringify({ error: "Insufficient credits" }), {
        status: 402,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      })
    }

    // ── 4. Appels Twilio ─────────────────────────────────────────────────
    const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID")!
    const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN")!
    const twilioFrom = Deno.env.get("TWILIO_FROM_NUMBER")!

    const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`
    const basicAuth = btoa(`${twilioAccountSid}:${twilioAuthToken}`)

    const results: TwilioResult[] = []

    for (const recipient of payload.recipients) {
      try {
        const body = new URLSearchParams({
          To: recipient,
          From: twilioFrom,
          Body: payload.message,
        })

        const twilioResponse = await fetch(twilioEndpoint, {
          method: "POST",
          headers: {
            Authorization: `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        })

        if (twilioResponse.ok) {
          results.push({ recipient, status: "sent" })
        } else {
          const errData = await twilioResponse.json()
          results.push({ recipient, status: "failed", error: errData.message ?? "Twilio error" })
        }
      } catch (e) {
        results.push({ recipient, status: "failed", error: String(e) })
      }
    }

    // ── 5. Insertion des logs en une seule requête (bulk insert) ─────────
    const sentCount = results.filter((r) => r.status === "sent").length

    const logsToInsert = results.map((r) => ({
      user_id: user.id,
      recipient: r.recipient,
      message: payload.message,
      status: r.status,
      cost: 1,
    }))

    await supabaseAdmin.from("sms_logs").insert(logsToInsert)

    // ── 6. Décrémentation du solde (uniquement les envois réussis) ────────
    if (sentCount > 0) {
      await supabaseAdmin
        .from("profiles")
        .update({ sms_credits: profileData.sms_credits - sentCount, updated_at: new Date().toISOString() })
        .eq("id", user.id)
    }

    // ── 7. Réponse ────────────────────────────────────────────────────────
    return new Response(
      JSON.stringify({
        sent: sentCount,
        failed: results.length - sentCount,
        results,
      }),
      {
        status: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
    )
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    })
  }
})
