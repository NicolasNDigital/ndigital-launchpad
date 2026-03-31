import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Papa from "papaparse"
import * as XLSX from "xlsx"
import confetti from "canvas-confetti"
import {
  Upload, ShieldCheck, MessageSquare, Send,
  Check, CheckCircle2, AlertCircle, Loader2,
  ChevronLeft, ChevronRight, FileSpreadsheet, X, Eye,
  AlertTriangle, UserX, ArrowRight, Star, Smartphone,
  LayoutDashboard,
} from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import StepProgress from "./StepProgress"
import CampaignSidebar from "./CampaignSidebar"

// ── Templates ──────────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    name: "Direct",
    tag: "Efficace",
    tagColor: "text-neon-cyan bg-neon-cyan/10 border-neon-cyan/20",
    description: "Court, clair, taux de clic élevé.",
    text: "Bonjour {{Prénom}}, merci de votre visite ! Un petit avis ici nous aiderait beaucoup : [LIEN]",
  },
  {
    name: "Chaleureux",
    tag: "Recommandé",
    tagColor: "text-warning bg-warning/10 border-warning/20",
    description: "Ton convivial, idéal pour les artisans.",
    text: "Hello {{Prénom}}, ce fut un plaisir de vous accompagner 😊 Si vous avez 30s pour nous laisser 5 étoiles, c'est par ici : [LIEN]",
  },
]

const FAKE_LINK = "https://g.page/r/exemple-avis"

// ── Phone cleaning ─────────────────────────────────────────────────────────

function cleanPhoneNumber(raw: string): string {
  const n = raw.replace(/[\s.\-()\/]/g, "").trim()
  if (n.startsWith("+33")) return n
  if (n.startsWith("0033") && n.length >= 12) return "+33" + n.slice(4)
  if (n.startsWith("0") && n.length === 10) return "+33" + n.slice(1)
  if ((n.startsWith("6") || n.startsWith("7")) && n.length === 9) return "+33" + n
  return n
}

function processContacts(raw: string[]): { cleaned: string[]; duplicatesRemoved: number } {
  const cleaned = raw.map(cleanPhoneNumber).filter(Boolean)
  const seen = new Set<string>()
  const unique: string[] = []
  for (const c of cleaned) { if (!seen.has(c)) { seen.add(c); unique.push(c) } }
  return { cleaned: unique, duplicatesRemoved: cleaned.length - unique.length }
}

// ── Column detection ───────────────────────────────────────────────────────

const PHONE_CANDIDATES = [
  "phone", "telephone", "téléphone", "tel", "tél", "mobile",
  "numero", "numéro", "recipient", "destinataire", "portable", "gsm", "number",
]

function detectPhoneColumn(headers: string[]): string | null {
  const norm = headers.map((h) => h.toLowerCase().trim())
  for (const c of PHONE_CANDIDATES) { const i = norm.indexOf(c); if (i !== -1) return headers[i] }
  return null
}

function extractRaw(rows: Record<string, string>[], col: string): string[] {
  return rows.map((r) => r[col]?.toString().trim()).filter(Boolean)
}

// ── Types ──────────────────────────────────────────────────────────────────

type SmsResult = { recipient: string; status: "sent" | "failed"; error?: string }

interface WizardState {
  contacts: string[]
  fileName: string | null
  phoneColumn: string | null
  allColumns: string[]
  allRows: Record<string, string>[]
  duplicatesRemoved: number
  autoDetected: boolean
  recentlySent: string[]
  recentChecked: boolean
  recentExcluded: boolean
  rgpdAccepted: boolean
  selectedTemplate: number | null
  googleLink: string
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

// ── Smartphone mockup ──────────────────────────────────────────────────────

function SmartphonePreview({ message }: { message: string }) {
  return (
    <div
      className="relative mx-auto select-none"
      style={{ width: 200 }}
    >
      {/* Body */}
      <div
        className="bg-[#0d0d1a] rounded-[2.2rem] border-2 border-electric-violet/40 overflow-hidden"
        style={{ boxShadow: "0 0 40px rgba(139,92,246,0.18), inset 0 0 0 1px rgba(139,92,246,0.1)" }}
      >
        {/* Notch bar */}
        <div className="flex justify-center pt-3 pb-2 bg-black/40">
          <div className="w-16 h-4 bg-black rounded-full" />
        </div>

        {/* Status bar */}
        <div className="flex justify-between items-center px-4 py-1 text-white/25 text-[9px]">
          <span>9:41</span>
          <span className="flex gap-0.5">
            {[...Array(4)].map((_, i) => (
              <span key={i} className={`w-0.5 rounded-full bg-current ${i < 3 ? "h-2" : "h-1"}`} />
            ))}
          </span>
        </div>

        {/* Contact header */}
        <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-electric-violet/20 border border-electric-violet/30 flex items-center justify-center flex-shrink-0">
            <Star className="w-3.5 h-3.5 text-electric-violet" />
          </div>
          <div>
            <p className="text-white/80 text-[11px] font-medium leading-none">NDIGITAL</p>
            <p className="text-white/30 text-[9px] mt-0.5">SMS</p>
          </div>
        </div>

        {/* Screen / bubble area */}
        <div className="bg-[#0a0a18] px-3 py-4 min-h-[140px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-start"
            >
              {message ? (
                <div className="max-w-[90%] bg-[#1e1e30] border border-white/8 rounded-2xl rounded-tl-sm px-3 py-2.5">
                  <p className="text-white/80 text-[11px] leading-relaxed">{message}</p>
                  <p className="text-white/25 text-[9px] text-right mt-1.5">Maintenant</p>
                </div>
              ) : (
                <p className="text-white/20 text-[10px] italic">Choisissez un modèle…</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom bar */}
        <div className="px-3 py-2 bg-black/30 flex items-center gap-2">
          <div className="flex-1 h-6 rounded-full bg-white/5 border border-white/8" />
          <div className="w-6 h-6 rounded-full bg-electric-violet/30 flex items-center justify-center flex-shrink-0">
            <Send className="w-3 h-3 text-electric-violet" />
          </div>
        </div>

        {/* Home bar */}
        <div className="flex justify-center pb-2 pt-1">
          <div className="w-10 h-1 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

// ── Success animation ──────────────────────────────────────────────────────

function SuccessScreen({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    const end = Date.now() + 2200
    const colors = ["#8b5cf6", "#06b6d4", "#f59e0b", "#ffffff"]
    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,  spread: 55, origin: { x: 0 }, colors,
        startVelocity: 45, gravity: 0.8,
      })
      confetti({
        particleCount: 6,
        angle: 120, spread: 55, origin: { x: 1 }, colors,
        startVelocity: 45, gravity: 0.8,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-10"
    >
      {/* Pulsing rings */}
      <div className="relative w-24 h-24 mx-auto mb-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-electric-violet"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.2 + i * 0.5, opacity: 0 }}
            transition={{ duration: 1.8, delay: i * 0.35, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
          className="w-24 h-24 rounded-full bg-electric-violet/15 border-2 border-electric-violet flex items-center justify-center"
          style={{ boxShadow: "0 0 40px rgba(139,92,246,0.4)" }}
        >
          <CheckCircle2 className="w-11 h-11 text-electric-violet" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-heading font-bold text-white mb-2">Campagne envoyée !</h3>
        <p className="text-white/50 mb-8">Vos clients vont recevoir votre demande d'avis sous peu.</p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-electric-violet hover:bg-electric-violet/80 text-white font-semibold transition-all"
        >
          <LayoutDashboard className="w-4 h-4" />
          Retour au Dashboard
        </button>
      </motion.div>
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

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
    rgpdAccepted: false, selectedTemplate: null, googleLink: "", message: "",
    campaignName: "",
  })

  const credits   = profile?.sms_credits ?? 0
  const cost      = state.contacts.length
  const hasEnough = credits >= cost

  // ── Template helpers ──────────────────────────────────────────────────

  function buildMessage(templateIdx: number, googleLink: string) {
    const link = googleLink.trim() || FAKE_LINK
    return TEMPLATES[templateIdx].text.replace("[LIEN]", link)
  }

  function selectTemplate(idx: number) {
    setState((s) => ({
      ...s,
      selectedTemplate: idx,
      message: buildMessage(idx, s.googleLink),
    }))
  }

  function setGoogleLink(link: string) {
    setState((s) => ({
      ...s,
      googleLink: link,
      message: s.selectedTemplate !== null ? buildMessage(s.selectedTemplate, link) : s.message,
    }))
  }

  // Computed preview: always show fake link in mockup, real link in summary
  const previewMessage =
    state.selectedTemplate !== null
      ? TEMPLATES[state.selectedTemplate].text.replace("[LIEN]", FAKE_LINK)
      : ""

  // ── Navigation ────────────────────────────────────────────────────────

  async function go(next: number) {
    if (next === 1 && !state.recentChecked && state.contacts.length > 0) {
      await checkRecentlySent(state.contacts)
    }
    setDir(next > step ? 1 : -1)
    setStep(next)
  }

  // ── File parsing ──────────────────────────────────────────────────────

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
    const detected = detectPhoneColumn(headers)
    const col      = detected ?? headers[0] ?? null
    const raw      = col ? extractRaw(rows, col) : []
    const { cleaned, duplicatesRemoved } = processContacts(raw)
    if (duplicatesRemoved > 0)
      toast.info(`${duplicatesRemoved} doublon${duplicatesRemoved > 1 ? "s" : ""} supprimé${duplicatesRemoved > 1 ? "s" : ""} automatiquement.`)
    setState((s) => ({
      ...s, fileName, allColumns: headers, allRows: rows,
      phoneColumn: col, autoDetected: !!detected,
      contacts: cleaned, duplicatesRemoved,
      recentlySent: [], recentChecked: false, recentExcluded: false,
    }))
  }

  function changeColumn(col: string) {
    const { cleaned, duplicatesRemoved } = processContacts(extractRaw(state.allRows, col))
    setState((s) => ({
      ...s, phoneColumn: col, autoDetected: false,
      contacts: cleaned, duplicatesRemoved,
      recentlySent: [], recentChecked: false, recentExcluded: false,
    }))
  }

  // ── Anti-spam check ───────────────────────────────────────────────────

  async function checkRecentlySent(contacts: string[]) {
    if (!user || contacts.length === 0) return
    const since = new Date()
    since.setDate(since.getDate() - 30)
    const { data } = await supabase
      .from("sms_logs").select("recipient")
      .eq("user_id", user.id).gte("created_at", since.toISOString())
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

  // ── Send ──────────────────────────────────────────────────────────────

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
      <div
        className="border-2 border-dashed border-white/15 hover:border-electric-violet/50 transition-colors rounded-2xl p-10 text-center cursor-pointer group"
        onClick={() => fileRef.current?.click()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="w-14 h-14 rounded-2xl bg-electric-violet/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-electric-violet/20 transition-colors">
          <Upload className="w-7 h-7 text-electric-violet" />
        </div>
        {state.fileName
          ? <><p className="text-white font-medium">{state.fileName}</p><p className="text-white/40 text-sm mt-1">Cliquez pour changer</p></>
          : <><p className="text-white/60 mb-1">Glissez votre fichier ici</p><p className="text-white/30 text-sm">.csv ou .xlsx acceptés</p></>
        }
        <input ref={fileRef} type="file" accept=".csv,.xlsx,.xls" className="hidden"
          onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }} />
      </div>

      {state.allColumns.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
          <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${
            state.autoDetected ? "bg-green-500/10 text-green-400" : "bg-warning/10 text-warning"
          }`}>
            {state.autoDetected
              ? <><CheckCircle2 className="w-4 h-4" /> Colonne téléphone détectée automatiquement</>
              : <><AlertTriangle className="w-4 h-4" /> Aucune colonne reconnue — sélectionnez ci-dessous</>
            }
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white/50">Numéro de téléphone</div>
            <ArrowRight className="w-4 h-4 text-white/30 flex-shrink-0" />
            <select
              value={state.phoneColumn ?? ""}
              onChange={(e) => changeColumn(e.target.value)}
              className="flex-1 bg-white/8 border border-electric-violet/40 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-electric-violet transition-colors"
            >
              {state.allColumns.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

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
                    {state.duplicatesRemoved} doublon{state.duplicatesRemoved > 1 ? "s" : ""} retiré{state.duplicatesRemoved > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {state.contacts.slice(0, 6).map((c, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 text-white/60 text-xs font-mono">{c}</span>
                ))}
                {state.contacts.length > 6 && (
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 text-white/40 text-xs">+{state.contacts.length - 6}</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>,

    /* ── STEP 2 : Validation RGPD ────────────────────────────────────── */
    <div key="s2" className="space-y-5">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-4 h-4 text-electric-violet" />
          <h3 className="font-medium text-white">Vérification des contacts</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[["destinataires", state.contacts.length, "text-white"],
            ["crédits requis", cost, "text-white"],
            ["déjà contactés", state.recentExcluded ? 0 : state.recentlySent.length,
              state.recentlySent.length > 0 && !state.recentExcluded ? "text-warning" : "text-green-400"]
          ].map(([label, val, color]) => (
            <div key={String(label)} className="bg-white/5 rounded-xl p-3 text-center">
              <p className={`text-2xl font-bold ${color}`}>{val}</p>
              <p className="text-white/50 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {state.recentlySent.length > 0 && !state.recentExcluded && (
        <div className="bg-warning/8 border border-warning/30 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-warning font-medium text-sm mb-1">
                {state.recentlySent.length} contact{state.recentlySent.length > 1 ? "s" : ""} déjà contacté{state.recentlySent.length > 1 ? "s" : ""} ce mois-ci
              </p>
              <p className="text-white/50 text-xs mb-3">Les inclure peut nuire à votre réputation d'expéditeur.</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {state.recentlySent.slice(0, 8).map((n, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-warning/15 text-warning text-xs font-mono">{n}</span>
                ))}
                {state.recentlySent.length > 8 && (
                  <span className="px-2 py-0.5 rounded bg-warning/10 text-warning/60 text-xs">+{state.recentlySent.length - 8}</span>
                )}
              </div>
              <button onClick={excludeRecentlySent}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-warning/20 hover:bg-warning/30 border border-warning/30 text-warning text-sm font-medium transition-colors">
                <UserX className="w-4 h-4" />
                Exclure ces {state.recentlySent.length} contact{state.recentlySent.length > 1 ? "s" : ""}
              </button>
            </div>
          </div>
        </div>
      )}

      {state.recentExcluded && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-sm text-green-400">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> Contacts récents exclus — liste mise à jour.
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 max-h-40 overflow-y-auto">
        <p className="text-white/40 text-xs mb-2">Liste finale ({state.contacts.length} numéros)</p>
        <div className="space-y-0.5">
          {state.contacts.map((c, i) => (
            <div key={i} className="flex items-center gap-2 py-0.5">
              <span className="text-white/20 text-xs w-6 text-right flex-shrink-0">{i + 1}</span>
              <span className="text-white/65 text-sm font-mono">{c}</span>
            </div>
          ))}
        </div>
      </div>

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

    /* ── STEP 3 : Message / Templates ────────────────────────────────── */
    <div key="s3" className="space-y-5">

      {/* Template cards */}
      <div className="grid grid-cols-2 gap-4">
        {TEMPLATES.map((tpl, idx) => {
          const selected = state.selectedTemplate === idx
          return (
            <button
              key={idx}
              onClick={() => selectTemplate(idx)}
              className={`text-left rounded-2xl p-4 border-2 transition-all duration-200 ${
                selected
                  ? "border-electric-violet bg-electric-violet/10"
                  : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08]"
              }`}
              style={selected ? { boxShadow: "0 0 20px rgba(139,92,246,0.2)" } : {}}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="font-semibold text-white text-sm">{tpl.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${tpl.tagColor}`}>{tpl.tag}</span>
              </div>
              <p className="text-white/45 text-xs leading-relaxed mb-3">{tpl.description}</p>
              <p className="text-white/60 text-[11px] leading-relaxed line-clamp-3 font-mono">
                {tpl.text.replace("[LIEN]", FAKE_LINK)}
              </p>
              {selected && (
                <div className="mt-3 flex items-center gap-1.5 text-electric-violet text-xs font-medium">
                  <Check className="w-3.5 h-3.5" /> Sélectionné
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Alerte si lien Google manquant */}
      {state.selectedTemplate !== null && !state.googleLink.trim() && (
        <div className="flex items-center gap-2 bg-warning/8 border border-warning/30 rounded-xl px-4 py-3 text-sm text-warning">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          Renseignez votre lien d'avis Google dans le panneau de droite pour continuer.
        </div>
      )}

      {/* Smartphone preview */}
      <div className="flex items-center gap-6">
        <div className="flex-1 bg-white/[0.03] border border-white/8 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Smartphone className="w-4 h-4 text-white/40" />
            <span className="text-white/40 text-xs">Aperçu en direct</span>
          </div>
          <SmartphonePreview message={previewMessage} />
        </div>
      </div>
    </div>,

    /* ── STEP 4 : Résumé & Envoi ─────────────────────────────────────── */
    <div key="s4" className="space-y-5">
      {done ? (
        <SuccessScreen onBack={onSent} />
      ) : (
        <>
          {/* Résumé ultra-pro */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/8 bg-white/[0.03]">
              <h3 className="text-sm font-semibold text-white/70">Résumé de la campagne</h3>
            </div>
            {[
              ["Campagne",               state.campaignName || "Sans nom"],
              ["Modèle choisi",          state.selectedTemplate !== null ? TEMPLATES[state.selectedTemplate].name : "—"],
              ["Destinataires valides",  `${state.contacts.length}`],
              ["Crédits à débiter",      `${cost}`],
            ].map(([label, value], i) => (
              <div key={i} className="px-5 py-3.5 flex justify-between text-sm border-b border-white/5 last:border-0">
                <span className="text-white/50">{label}</span>
                <span className={`font-medium ${label === "Crédits à débiter" && !hasEnough ? "text-red-400" : "text-white"}`}>{value}</span>
              </div>
            ))}
          </div>

          {/* Aperçu final du message avec le vrai lien */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-white/40 text-xs mb-3 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> Aperçu final du message
            </p>
            <div className="flex justify-end">
              <div className="max-w-[80%] bg-electric-violet/20 border border-electric-violet/25 rounded-2xl rounded-br-sm px-4 py-3">
                <p className="text-white/85 text-sm leading-relaxed">{state.message}</p>
                <p className="text-white/30 text-xs text-right mt-1.5">Maintenant</p>
              </div>
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
              : <><Send className="w-5 h-5" /> Lancer l'envoi ({state.contacts.length} SMS)</>
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
    state.selectedTemplate !== null && state.googleLink.trim().length > 0,
    true,
  ][step]

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <div className="flex gap-6 items-start">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold text-white">Nouvelle campagne</h2>
            <p className="text-white/40 text-sm mt-0.5">Étape {step + 1} sur {STEPS.length}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/8 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-8"><StepProgress steps={STEPS} current={step} /></div>

        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 min-h-[340px]">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div key={step} custom={dir} variants={SLIDE}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.22, ease: "easeInOut" }}>
              {stepContent[step]}
            </motion.div>
          </AnimatePresence>
        </div>

        {!done && (
          <div className="flex justify-between mt-5">
            <button onClick={() => go(step - 1)} disabled={step === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/8 transition-all disabled:opacity-0 disabled:pointer-events-none">
              <ChevronLeft className="w-4 h-4" /> Précédent
            </button>
            {step < STEPS.length - 1 && (
              <button onClick={() => go(step + 1)} disabled={!canNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold bg-electric-violet text-white hover:bg-electric-violet/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                Suivant <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      <CampaignSidebar
        campaignName={state.campaignName}
        onCampaignNameChange={(v) => setState((s) => ({ ...s, campaignName: v }))}
        googleLink={state.googleLink}
        onGoogleLinkChange={setGoogleLink}
        contactCount={state.contacts.length}
        credits={credits}
        currentStep={step}
      />
    </div>
  )
}
