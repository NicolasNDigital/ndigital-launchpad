/**
 * ShortLinkRedirect.tsx — À copier dans le projet Avis-Pro (Lovable)
 *
 * Ce composant gère la redirection des liens courts Ndigital.
 * Format attendu : avis-pro.eu/nXXXX (code commençant par "n")
 *
 * Prérequis dans Lovable :
 *   - Ajouter les variables d'environnement (Settings → Environment variables) :
 *       VITE_NDIGITAL_SUPABASE_URL  = https://yhdmfxbogaxepchnxhnd.supabase.co
 *       VITE_NDIGITAL_SUPABASE_KEY  = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloZG1meGJvZ2F4ZXBjaG54aG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MDUyNDAsImV4cCI6MjA4ODI4MTI0MH0.MLKW5hXpC6Jv5-UlwGkVe_-VL8vySg1Ffv9-spPoJ8M
 *
 *   - Ajouter la route dans ton router (ex: React Router) :
 *       <Route path="/:code" element={<ShortLinkRedirect />} />
 *     ou si Lovable utilise un seul point d'entrée :
 *       <Route path="*" element={<ShortLinkRedirect />} />
 */

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const NDIGITAL_SUPABASE_URL = import.meta.env.VITE_NDIGITAL_SUPABASE_URL as string
const NDIGITAL_SUPABASE_KEY = import.meta.env.VITE_NDIGITAL_SUPABASE_KEY as string

export default function ShortLinkRedirect() {
  const { code } = useParams<{ code: string }>()
  const navigate  = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only handle codes starting with "n" (Ndigital namespace)
    if (!code || !code.startsWith("n")) {
      setError("Lien invalide.")
      return
    }

    async function redirect() {
      try {
        // 1. Fetch the destination URL from Ndigital's Supabase
        const res = await fetch(
          `${NDIGITAL_SUPABASE_URL}/rest/v1/short_links?short_code=eq.${code}&select=id,destination_url`,
          {
            headers: {
              apikey: NDIGITAL_SUPABASE_KEY,
              Authorization: `Bearer ${NDIGITAL_SUPABASE_KEY}`,
              "Content-Type": "application/json",
            },
          }
        )

        if (!res.ok) throw new Error(`Supabase error: ${res.status}`)

        const data: { id: string; destination_url: string }[] = await res.json()

        if (!data.length || !data[0].destination_url) {
          setError("Ce lien n'existe pas ou a expiré.")
          return
        }

        const { id, destination_url } = data[0]

        // 2. Increment clicks_count asynchronously (fire & forget)
        fetch(
          `${NDIGITAL_SUPABASE_URL}/rest/v1/rpc/increment_short_link_clicks`,
          {
            method: "POST",
            headers: {
              apikey: NDIGITAL_SUPABASE_KEY,
              Authorization: `Bearer ${NDIGITAL_SUPABASE_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ link_id: id }),
          }
        ).catch(() => {
          // Silently ignore — click tracking is non-critical
        })

        // 3. Redirect immediately
        window.location.replace(destination_url)
      } catch (err) {
        setError("Une erreur est survenue. Vérifiez votre connexion.")
        console.error("[ShortLinkRedirect]", err)
      }
    }

    redirect()
  }, [code])

  if (error) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0f", color: "#fff", fontFamily: "system-ui" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 48, marginBottom: 8 }}>🔗</p>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Lien introuvable</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0f", color: "#fff", fontFamily: "system-ui" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid #8b5cf6", borderTopColor: "transparent", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>Redirection en cours…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    </div>
  )
}
