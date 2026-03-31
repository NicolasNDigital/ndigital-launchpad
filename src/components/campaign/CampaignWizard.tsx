import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Papa from "papaparse"
import * as XLSX from "xlsx"
import {
  Upload, ShieldCheck, MessageSquare, Send,
  Check, CheckCircle2, AlertCircle, Loader2,
  ChevronLeft, ChevronRight, FileSpreadsheet, X, Eye,
  AlertTriangle, UserX, ArrowRight,
} from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import StepProgress from "./StepProgress"
import CampaignSidebar from "./CampaignSidebar"

// ── Phone cleaning ─────────────────────────────────────────────────────────

/**
 * Normalise un numéro de téléphone français au format international +33.
 * Gère : 06/07, numéros sans le 0 initial (6x, 7x), 0033, +33.
 */
function cleanPhoneNumber(raw: string): string {
  const n = raw.replace(/[\s.\-()\/]/g, "").trim()

  if (n.startsWith("+33")) return n                                 // déjà international
  if (n.startsWith("0033") && n.length >= 12) return "+33" + n.slice(4) // 0033...
  if (n.startsWith("0") && n.length === 10) return "+33" + n.slice(1)   // 06.../07...
  if ((n.startsWith("6") || n.startsWith("7")) && n.length === 9)       // 6x.../7x... (0 manquant)
    return "+33" + n
  return n // format inconnu — on le garde tel quel
}

function processContacts(raw: string[]): { cleaned: string[]; duplicatesRemoved: number } {
  const cleaned = raw.map(cleanPhoneNumber).filter(Boolean)
  const seen = new Set<string>()
  const unique: string[] = []
  for (const c of cleaned) {
    if (!seen.has(c)) { seen.add(c); unique.push(c) }
  }
  return { cleaned: unique, duplicatesRemoved: cleaned.length - unique.length }
}

// ── Column detection ───────────────────────────────────────────────────────

const PHONE_CANDIDATES = [
  "phone", "telephone", "téléphone", "tel", "tél", "mobile",
  "numero", "numéro", "recipient", "destinataire", "portable", "gsm", "number",
]

function detectPhoneColumn(headers: string[]): string | null {
  const norm = headers.map((h) => h.toLowerCase().trim())
  for (const c of PHONE_CANDIDATES) {
    const i = norm.indexOf(c)
    if (i !== -1) return headers[i]
  }
  return null
}

function extractRaw(rows: Record<string, string>[], col: string): string[] {
  return rows.map((r) => r[col]?.toString().trim()).filter(Boolean)
}

// ── Types ──────────────────────────────────────────────────────────────────

type SmsResult = { recipient: string; status: "sent" | "failed"; error?: string }

interface WizardState {
  contacts: string[]              // liste finale : nettoyée + dédupliquée + sans exclusions
  fileName: string | null
  phoneColumn: string | null
  allColumns: string[]
  allRows: Record<string, string>[]
  duplicatesRemoved: number
  autoDetected: boolean           // true si la colonne a été trouvée automatiquement
  // Anti-spam
  recentlySent: string[]          // numéros déjà contactés dans les 30 derniers jours
  recentChecked: boolean          // le check a déjà été lancé pour cette liste
  recentExcluded: boolean         // l'utilisateur a cliqué "Exclure"
  // Suite du tunnel
  rgpdAccepted: boolean
  message: string
  campaignName: string
}

const STEPS = [
  { label: "Import & Mapping", icon: FileSpreadsheet },
  { label: "Validation RGPD",  icon: ShieldCheck     },
  { label: "Message",          icon: MessageSquare   },
  { label: "Résumé & Envoi",   icon: Send            },
]

const SLIDE = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit:  (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
}

// ── Component ──────────────────────────────────────────────────────────────

interface CampaignWizardProps {
  onClose: () => void
  onSent:  () => void
}

export default function CampaignWizard({ onClose, onSent }: CampaignWizardProps) {
  const { user, profile } = useAuth()
  const [step, setStep]       = useState(0)
  const [dir,  setDir]        = useState(1)
  const [sending, setSending] = useState(false)
  const [progress, setProgress] = useState(0)
  const [done, setDone]       = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const [state, setState] = useState<WizardState>({
    contacts: [], fileName: null, phoneColumn: null,
    allColumns: [], allRows: [], duplicatesRemoved: 0, autoDetected: false,
    recentlySent: [], recentChecked: false, recentExcluded: false,
    rgpdAccepted: false, message: "", campaignName: "",
  })

  const credits   = profile?.sms_credits ?? 0
  const cost      = state.contacts.length
  const hasEnough = credits >= cost

  // ── Navigation ─────────────────────────────────────────────────────────

  async function go(next: number) {
    // Trigger anti-spam check when entering step 2
    if (next === 1 && !state.recentChecked && state.contacts.length > 0) {
      await checkRecentlySent(state.contacts)
    }
    setDir(next > step ? 1 : -1)
    setStep(next)
  }

  // ── File parsing ───────────────────────────────────────────────────────

  function handleFile(file: File) {
    const ext = file.name.split(".").pop()?.toLowerCase()
    if (ext === "csv") {
      Papa.parse<Record<string, string>>(file, {
        header: true, skipEmptyLines: true,
        complete: ({ data, meta }) => applyRows(data, meta.fields ?? [], file.name),
        error: () => toast.error("Impossible de lire le fichier CSV."),
      })
    } else if (ext === "xlsx" || ext === "xls") {
      const reader = new FileReader()
      reader.onload = (e) => {
        const wb   = XLSX.read(e.target?.result, { type: "binary" })
        const rows = XLSX.utils.sheet_to_json<Record<string, string>>(
          wb.Sheets[wb.SheetNames[0]], { defval: "" }
        )
        applyRows(rows, rows.length > 0 ? Object.keys(rows[0]) : [], file.name)
      }
      reader.readAsBinaryString(file)
    } else {
      toast.error("Format non supporté (.csv, .xlsx uniquement).")
    }
  }

  function applyRows(rows: Record<string, string>[], headers: string[], fileName: string) {
    const detected  = detectPhoneColumn(headers)
    const col       = detected ?? headers[0] ?? null
    const raw       = col ? extractRaw(rows, col) : []
    const { cleaned, duplicatesRemoved } = processContacts(raw)

    if (duplicatesRemoved > 0) toast.info(`${duplicatesRemoved} doublon${duplicatesRemoved > 1 ? "s" : ""} supprimé${duplicatesRemoved > 1 ? "s" : ""} automatiquement.`)

    setState((s) => ({
      ...s, fileName, allColumns: headers, allRows: rows,
      phoneColumn: col, autoDetected: !!detected,
      contacts: cleaned, duplicatesRemoved,
      recentlySent: [], recentChecked: false, recentExcluded: false,
    }))
  }

  function changeColumn(col: string) {
    const raw = extractRaw(state.allRows, col)
    const { cleaned, duplicatesRemoved } = processContacts(raw)
    setState((s) => ({
      ...s, phoneColumn: col, autoDetected: false,
      contacts: cleaned, duplicatesRemoved,
      recentlySent: [], recentChecked: false, recentExcluded: false,
    }))
  }

  // ── Anti-spam check ────────────────────────────────────────────────────

  async function checkRecentlySent(contacts: string[]) {
    if (!user || contacts.length === 0) return
    const since = new Date()
    since.setDate(since.getDate() - 30)

    const { data } = await supabase
      .from("sms_logs")
      .select("recipient")
      .eq("user_id", user.id)
      .gte("created_at", since.toISOString())
      .in("recipient", contacts)

    const recent = [...new Set((data ?? []).map((r) => r.recipient))]
    setState((s) => ({ ...s, recentlySent: recent, recentChecked: true }))
  }

  function excludeRecentlySent() {
    const excluded = new Set(state.recentlySent)
    setState((s) => ({
      ...s,
      contacts: s.contacts.filter((c) => !excluded.has(c)),
      recentExcluded: true,
    }))
  }

  // ── Send ───────────────────────────────────────────────────────────────

  async function handleSend() {
    if (!user) return
    setSending(true)
    setProgress(0)
    const timer = setInterval(() => setProgress((p) => (p < 88 ? p + 4 : p)), 350)
    try {
      const { data, error } = await supabase.functions.invoke<{
        sent: number; failed: number; results: SmsResult[]
      }>("send-bulk-sms", {
        body: { recipients: state.contacts, message: state.message },
      })
      clearInterval(timer)
      setProgress(100)
      if (error) throw error
      const { sent, failed } = data!
      setDone(true)
      toast.success(`${sent} SMS envoyé${sent > 1 ? "s" : ""}.${failed > 0 ? ` ${failed} échec(s).` : ""}`)
      setTimeout(onSent, 1200)
    } catch (err) {
      clearInterval(timer)
      setProgress(0)
      setSending(false)
      const msg = err instanceof Error ? err.message : String(err)
      toast.error(msg.includes("Insufficient") ? "Crédits insuffisants." : `Erreur : ${msg}`)
    }
  }

  // ── Step content ──────────────────────────────────────────────────────

  const stepContent = [

    /* ── STEP 1 : Import & Mapping ──────────────────────────────────── */
    <div key="s1" className="space-y-5">

      {/* Drop zone */}
      <div
        className="border-2 border-dashed border-white/15 hover:border-electric-violet/50 transition-colors rounded-2xl p-10 text-center cursor-pointer group"
        onClick={() => fileRef.current?.click()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="w-14 h-14 rounded-2xl bg-electric-violet/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-electric-violet/20 transition-colors">
          <Upload className="w-7 h-7 text-electric-violet" />
        </div>
        {state.fileName ? (
          <><p className="text-white font-medium">{state.fileName}</p>
            <p className="text-white/40 text-sm mt-1">Cliquez pour changer de fichier</p></>
        ) : (
          <><p className="text-white/60 mb-1">Glissez votre fichier ici</p>
            <p className="text-white/30 text-sm">.csv ou .xlsx acceptés</p></>
        )}
        <input ref={fileRef} type="file" accept=".csv,.xlsx,.xls" className="hidden"
          onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }} />
      </div>

      {/* Mapping card — shown as soon as a file is loaded */}
      {state.allColumns.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">

          {/* Detection status */}
          <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${
            state.autoDetected
              ? "bg-green-500/10 text-green-400"
              : "bg-warning/10 text-warning"
          }`}>
            {state.autoDetected
              ? <><CheckCircle2 className="w-4 h-4" /> Colonne téléphone détectée automatiquement</>
              : <><AlertTriangle className="w-4 h-4" /> Aucune colonne téléphone reconnue — sélectionnez-la ci-dessous</>
            }
          </div>

          {/* Mapping selector — toujours visible */}
          <div className="space-y-2">
            <label className="text-white/50 text-xs uppercase tracking-wide">
              Mapping des colonnes
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white/50">
                Numéro de téléphone
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 flex-shrink-0" />
              <select
                value={state.phoneColumn ?? ""}
                onChange={(e) => changeColumn(e.target.value)}
                className="flex-1 bg-white/8 border border-electric-violet/40 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-electric-violet transition-colors"
              >
                {state.allColumns.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          {state.contacts.length > 0 && (
            <div className="border-t border-white/8 pt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">{state.contacts.length}</span>
                  <span className="text-white/60">numéro{state.contacts.length > 1 ? "s" : ""} valide{state.contacts.length > 1 ? "s" : ""}</span>
                </div>
                {state.duplicatesRemoved > 0 && (
                  <span className="text-white/40 text-xs bg-white/5 px-2 py-1 rounded-lg">
                    {state.duplicatesRemoved} doublon{state.duplicatesRemoved > 1 ? "s" : ""} supprimé{state.duplicatesRemoved > 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {/* Aperçu des numéros nettoyés */}
              <div>
                <p className="text-white/30 text-xs mb-2">Aperçu (format normalisé)</p>
                <div className="flex flex-wrap gap-2">
                  {state.contacts.slice(0, 6).map((c, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 text-white/60 text-xs font-mono">{c}</span>
                  ))}
                  {state.contacts.length > 6 && (
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 text-white/40 text-xs">+{state.contacts.length - 6}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>,

    /* ── STEP 2 : Validation RGPD ────────────────────────────────────── */
    <div key="s2" className="space-y-5">

      {/* Stats */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-4 h-4 text-electric-violet" />
          <h3 className="font-medium text-white">Vérification des contacts</h3>
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{state.contacts.length}</p>
            <p className="text-white/50 text-xs mt-0.5">destinataires</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{cost}</p>
            <p className="text-white/50 text-xs mt-0.5">crédits requis</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <p className={`text-2xl font-bold ${state.recentlySent.length > 0 && !state.recentExcluded ? "text-warning" : "text-green-400"}`}>
              {state.recentExcluded ? 0 : state.recentlySent.length}
            </p>
            <p className="text-white/50 text-xs mt-0.5">déjà contactés</p>
          </div>
        </div>
      </div>

      {/* Alerte anti-spam */}
      {state.recentlySent.length > 0 && !state.recentExcluded && (
        <div className="bg-warning/8 border border-warning/30 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-warning font-medium text-sm mb-1">
                {state.recentlySent.length} contact{state.recentlySent.length > 1 ? "s" : ""} déjà contacté{state.recentlySent.length > 1 ? "s" : ""} ce mois-ci
              </p>
              <p className="text-white/50 text-xs mb-3">
                Ces numéros ont reçu un SMS dans les 30 derniers jours. Les inclure peut nuire à votre réputation.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {state.recentlySent.slice(0, 8).map((n, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-warning/15 text-warning text-xs font-mono">{n}</span>
                ))}
                {state.recentlySent.length > 8 && (
                  <span className="px-2 py-0.5 rounded bg-warning/10 text-warning/60 text-xs">+{state.recentlySent.length - 8}</span>
                )}
              </div>
              <button
                onClick={excludeRecentlySent}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-warning/20 hover:bg-warning/30 border border-warning/30 text-warning text-sm font-medium transition-colors"
              >
                <UserX className="w-4 h-4" />
                Exclure ces {state.recentlySent.length} contact{state.recentlySent.length > 1 ? "s" : ""}
              </button>
            </div>
          </div>
        </div>
      )}

      {state.recentExcluded && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-sm text-green-400">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          Contacts récents exclus — liste mise à jour.
        </div>
      )}

      {/* Liste scrollable */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 max-h-44 overflow-y-auto">
        <p className="text-white/40 text-xs mb-2">Liste finale ({state.contacts.length} numéros)</p>
        <div className="space-y-0.5">
          {state.contacts.map((c, i) => (
            <div key={i} className="flex items-center gap-2 py-1">
              <span className="text-white/20 text-xs w-6 text-right flex-shrink-0">{i + 1}</span>
              <span className="text-white/65 text-sm font-mono">{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RGPD */}
      <div className="bg-electric-violet/8 border border-electric-violet/25 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-electric-violet flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-white/80 text-sm font-medium mb-1">Conformité RGPD</p>
            <p className="text-white/50 text-xs leading-relaxed mb-4">
              En cochant cette case, vous confirmez que les destinataires ont consenti à recevoir
              des communications SMS de votre établissement conformément au RGPD.
            </p>
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setState((s) => ({ ...s, rgpdAccepted: !s.rgpdAccepted }))}
                className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all flex-shrink-0 ${
                  state.rgpdAccepted ? "bg-electric-violet border-electric-violet" : "border-white/30 bg-white/5"
                }`}
              >
                {state.rgpdAccepted && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-white/70 text-sm">Je confirme avoir le consentement des destinataires</span>
            </label>
          </div>
        </div>
      </div>
    </div>,

    /* ── STEP 3 : Message ────────────────────────────────────────────── */
    <div key="s3" className="space-y-5">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <label className="block text-white/60 text-sm mb-3">Contenu du message</label>
        <textarea
          value={state.message}
          onChange={(e) => setState((s) => ({ ...s, message: e.target.value }))}
          placeholder="Bonjour ! Vous avez visité notre établissement 😊 Votre avis compte beaucoup pour nous. Laissez-le ici : [LIEN GOOGLE]"
          rows={5}
          maxLength={160}
          className="w-full bg-white/5 border border-white/10 focus:border-electric-violet rounded-xl px-4 py-3 text-white placeholder:text-white/25 resize-none outline-none transition-colors text-sm"
        />
        <div className="flex justify-between mt-2">
          <span className="text-white/30 text-xs">160 caractères max · 1 SMS par contact</span>
          <span className={`text-xs font-mono ${state.message.length > 140 ? "text-warning" : "text-white/30"}`}>
            {state.message.length}/160
          </span>
        </div>
      </div>

      {state.message.trim() && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-xs mb-3">Aperçu</p>
          <div className="flex justify-end">
            <div className="max-w-[75%] bg-electric-violet/25 border border-electric-violet/30 rounded-2xl rounded-br-sm px-4 py-3">
              <p className="text-white/90 text-sm leading-relaxed">{state.message}</p>
              <p className="text-white/30 text-xs text-right mt-1">Maintenant</p>
            </div>
          </div>
        </div>
      )}
    </div>,

    /* ── STEP 4 : Résumé & Envoi ─────────────────────────────────────── */
    <div key="s4" className="space-y-5">
      {done ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>
          <p className="text-xl font-semibold text-white mb-1">Campagne envoyée !</p>
          <p className="text-white/50 text-sm">Retour au tableau de bord…</p>
        </div>
      ) : (
        <>
          <div className="bg-white/5 border border-white/10 rounded-2xl divide-y divide-white/8">
            {[
              ["Campagne",         state.campaignName || "Sans nom"],
              ["Destinataires",    `${state.contacts.length}`],
              ["Crédits consommés",`${cost}`],
            ].map(([label, value]) => (
              <div key={label} className="px-5 py-4 flex justify-between text-sm">
                <span className="text-white/50">{label}</span>
                <span className={`font-medium ${label === "Crédits consommés" && !hasEnough ? "text-red-400" : "text-white"}`}>{value}</span>
              </div>
            ))}
            <div className="px-5 py-4">
              <span className="text-white/50 text-sm">Message</span>
              <p className="text-white/80 text-sm mt-1 leading-relaxed">{state.message}</p>
            </div>
          </div>

          {!hasEnough && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              Crédits insuffisants — il manque {cost - credits} crédit{cost - credits > 1 ? "s" : ""}.
            </div>
          )}

          {sending && (
            <div>
              <div className="flex justify-between text-xs text-white/50 mb-1.5">
                <span>Envoi en cours…</span><span>{progress}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div className="bg-electric-violet h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          <button
            onClick={handleSend}
            disabled={sending || !hasEnough || state.contacts.length === 0 || !state.message.trim()}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold transition-all
              bg-electric-violet hover:bg-electric-violet/80 active:scale-[0.98]
              disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-electric-violet"
          >
            {sending
              ? <><Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours…</>
              : <><Send className="w-5 h-5" /> Lancer l'envoi</>
            }
          </button>
        </>
      )}
    </div>,
  ]

  // ── Nav guards ────────────────────────────────────────────────────────

  const canNext = [
    state.contacts.length > 0,
    state.rgpdAccepted,
    state.message.trim().length > 0,
    true,
  ][step]

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <div className="flex gap-6 items-start">
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold text-white">Nouvelle campagne</h2>
            <p className="text-white/40 text-sm mt-0.5">Étape {step + 1} sur {STEPS.length}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/8 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-8">
          <StepProgress steps={STEPS} current={step} />
        </div>

        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 min-h-[340px]">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={step} custom={dir} variants={SLIDE}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              {stepContent[step]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between mt-5">
          <button
            onClick={() => go(step - 1)} disabled={step === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/8 transition-all disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-4 h-4" /> Précédent
          </button>

          {step < STEPS.length - 1 && (
            <button
              onClick={() => go(step + 1)} disabled={!canNext}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold bg-electric-violet text-white hover:bg-electric-violet/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Suivant <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <CampaignSidebar
        campaignName={state.campaignName}
        onCampaignNameChange={(v) => setState((s) => ({ ...s, campaignName: v }))}
        contactCount={state.contacts.length}
        credits={credits}
        currentStep={step}
      />
    </div>
  )
}
