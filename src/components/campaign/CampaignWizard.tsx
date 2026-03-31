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
  LayoutDashboard, Pencil, Trash2,
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

const FAKE_LINK = "avis-pro.eu/nXXXX"
const SMS_DOMAIN = "avis-pro.eu"

function generateShortCode(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let code = "n"
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

// ── Phone helpers ──────────────────────────────────────────────────────────

function cleanPhoneNumber(raw: string): string {
  const n = raw.replace(/[\s.\-()\/]/g, "").trim()
  if (n.startsWith("+33")) return n
  if (n.startsWith("0033") && n.length >= 12) return "+33" + n.slice(4)
  if (n.startsWith("0") && n.length === 10) return "+33" + n.slice(1)
  if ((n.startsWith("6") || n.startsWith("7")) && n.length === 9) return "+33" + n
  return n
}

function isValidPhone(phone: string): boolean {
  return /^\+[1-9]\d{7,14}$/.test(phone)
}

// ── Column detection ───────────────────────────────────────────────────────

const PHONE_CANDIDATES = [
  "phone", "telephone", "téléphone", "tel", "tél", "mobile",
  "numero", "numéro", "recipient", "destinataire", "portable", "gsm", "number",
]
const FIRSTNAME_CANDIDATES = ["prenom", "prénom", "firstname", "first_name", "first", "givenname"]
const LASTNAME_CANDIDATES  = ["nom", "lastname", "last_name", "last", "surname", "familyname"]

function detectCol(headers: string[], candidates: string[]): string | null {
  const norm = headers.map((h) => h.toLowerCase().trim())
  for (const c of candidates) { const i = norm.indexOf(c); if (i !== -1) return headers[i] }
  return null
}

// ── ContactRow ─────────────────────────────────────────────────────────────

type RowStatus = "ok" | "recent" | "duplicate" | "invalid"

interface ContactRow {
  id: number
  phone: string       // cleaned/normalized
  rawPhone: string    // as read from file
  firstName: string
  lastName: string
  status: RowStatus
}

function buildContactRows(
  rows: Record<string, string>[],
  phoneCol: string,
  firstNameCol: string | null,
  lastNameCol: string | null,
): ContactRow[] {
  const seen = new Set<string>()
  return rows
    .filter((r) => r[phoneCol]?.toString().trim())
    .map((r, i) => {
      const rawPhone  = r[phoneCol]?.toString().trim() ?? ""
      const phone     = cleanPhoneNumber(rawPhone)
      const firstName = firstNameCol ? (r[firstNameCol]?.toString().trim() ?? "") : ""
      const lastName  = lastNameCol  ? (r[lastNameCol]?.toString().trim()  ?? "") : ""
      let status: RowStatus = "ok"
      if (!phone || !isValidPhone(phone)) {
        status = "invalid"
      } else if (seen.has(phone)) {
        status = "duplicate"
      } else {
        seen.add(phone)
      }
      return { id: i, phone, rawPhone, firstName, lastName, status }
    })
}

// ── Types ──────────────────────────────────────────────────────────────────

type SmsResult = { recipient: string; status: "sent" | "failed"; error?: string }

interface WizardState {
  contactRows: ContactRow[]
  fileName: string | null
  phoneColumn: string | null
  firstNameColumn: string | null
  lastNameColumn: string | null
  allColumns: string[]
  allRows: Record<string, string>[]
  recentChecked: boolean
  recentExcluded: boolean
  rgpdAccepted: boolean
  selectedTemplate: number | null
  googleLink: string
  shortCode: string | null
  shortLinkSaved: boolean
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

// ── Select dark style (native select ignores Tailwind bg) ─────────────────

const SELECT_STYLE: React.CSSProperties = {
  backgroundColor: "#0f0f1a",
  color: "rgba(255,255,255,0.85)",
}

// ── Status badge ───────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<RowStatus, { label: string; cls: string; dot: string }> = {
  ok:        { label: "OK",        cls: "text-green-400 bg-green-400/10 border-green-400/20",  dot: "bg-green-400"  },
  recent:    { label: "Récent",    cls: "text-warning bg-warning/10 border-warning/20",         dot: "bg-warning"    },
  duplicate: { label: "Doublon",   cls: "text-red-400 bg-red-400/10 border-red-400/20",         dot: "bg-red-400"    },
  invalid:   { label: "Invalide",  cls: "text-red-400 bg-red-400/10 border-red-400/20",         dot: "bg-red-400"    },
}

function StatusBadge({ status }: { status: RowStatus }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-medium ${cfg.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}

// ── Smartphone mockup ──────────────────────────────────────────────────────

function SmartphonePreview({ message }: { message: string }) {
  return (
    <div className="relative mx-auto select-none" style={{ width: 200 }}>
      <div
        className="bg-[#0d0d1a] rounded-[2.2rem] border-2 border-electric-violet/40 overflow-hidden"
        style={{ boxShadow: "0 0 40px rgba(139,92,246,0.18), inset 0 0 0 1px rgba(139,92,246,0.1)" }}
      >
        <div className="flex justify-center pt-3 pb-2 bg-black/40">
          <div className="w-16 h-4 bg-black rounded-full" />
        </div>
        <div className="flex justify-between items-center px-4 py-1 text-white/25 text-[9px]">
          <span>9:41</span>
          <span className="flex gap-0.5">
            {[...Array(4)].map((_, i) => (
              <span key={i} className={`w-0.5 rounded-full bg-current ${i < 3 ? "h-2" : "h-1"}`} />
            ))}
          </span>
        </div>
        <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-electric-violet/20 border border-electric-violet/30 flex items-center justify-center flex-shrink-0">
            <Star className="w-3.5 h-3.5 text-electric-violet" />
          </div>
          <div>
            <p className="text-white/80 text-[11px] font-medium leading-none">NDIGITAL</p>
            <p className="text-white/30 text-[9px] mt-0.5">SMS</p>
          </div>
        </div>
        <div className="bg-[#0a0a18] px-3 py-4 min-h-[140px]">
          <AnimatePresence mode="wait">
            <motion.div key={message} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex justify-start">
              {message
                ? <div className="max-w-[90%] bg-[#1e1e30] border border-white/8 rounded-2xl rounded-tl-sm px-3 py-2.5">
                    <p className="text-white/80 text-[11px] leading-relaxed">{message}</p>
                    <p className="text-white/25 text-[9px] text-right mt-1.5">Maintenant</p>
                  </div>
                : <p className="text-white/20 text-[10px] italic">Choisissez un modèle…</p>
              }
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="px-3 py-2 bg-black/30 flex items-center gap-2">
          <div className="flex-1 h-6 rounded-full bg-white/5 border border-white/8" />
          <div className="w-6 h-6 rounded-full bg-electric-violet/30 flex items-center justify-center flex-shrink-0">
            <Send className="w-3 h-3 text-electric-violet" />
          </div>
        </div>
        <div className="flex justify-center pb-2 pt-1">
          <div className="w-10 h-1 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

// ── Success screen ─────────────────────────────────────────────────────────

function SuccessScreen({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    const end = Date.now() + 2200
    const colors = ["#8b5cf6", "#06b6d4", "#f59e0b", "#ffffff"]
    const frame = () => {
      confetti({ particleCount: 6, angle: 60,  spread: 55, origin: { x: 0 }, colors, startVelocity: 45, gravity: 0.8 })
      confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors, startVelocity: 45, gravity: 0.8 })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  return (
    <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
      <div className="relative w-24 h-24 mx-auto mb-8">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} className="absolute inset-0 rounded-full border-2 border-electric-violet"
            initial={{ scale: 1, opacity: 0.6 }} animate={{ scale: 2.2 + i * 0.5, opacity: 0 }}
            transition={{ duration: 1.8, delay: i * 0.35, repeat: Infinity, ease: "easeOut" }} />
        ))}
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
          className="w-24 h-24 rounded-full bg-electric-violet/15 border-2 border-electric-violet flex items-center justify-center"
          style={{ boxShadow: "0 0 40px rgba(139,92,246,0.4)" }}>
          <CheckCircle2 className="w-11 h-11 text-electric-violet" />
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="text-2xl font-heading font-bold text-white mb-2">Campagne envoyée !</h3>
        <p className="text-white/50 mb-8">Vos clients vont recevoir votre demande d'avis sous peu.</p>
        <button onClick={onBack} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-electric-violet hover:bg-electric-violet/80 text-white font-semibold transition-all">
          <LayoutDashboard className="w-4 h-4" /> Retour au Dashboard
        </button>
      </motion.div>
    </motion.div>
  )
}

// ── Mapping row ────────────────────────────────────────────────────────────

function MappingRow({
  label, required, value, columns, detected, onChange,
}: {
  label: string
  required?: boolean
  value: string
  columns: string[]
  detected: boolean
  onChange: (v: string) => void
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-32 flex-shrink-0">
        <span className="text-white/60 text-sm">{label}</span>
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </div>
      <ArrowRight className="w-4 h-4 text-white/20 flex-shrink-0" />
      <div className="flex-1 relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={SELECT_STYLE}
          className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition-colors ${
            value
              ? detected ? "border-green-500/40" : "border-electric-violet/40"
              : required ? "border-red-500/40" : "border-white/10"
          }`}
        >
          <option value="" style={{ backgroundColor: "#0f0f1a" }}>— non mappé —</option>
          {columns.map((c) => <option key={c} value={c} style={{ backgroundColor: "#0f0f1a" }}>{c}</option>)}
        </select>
      </div>
      <div className="w-16 text-right flex-shrink-0">
        {value && detected && <span className="text-green-400 text-[10px]">Auto</span>}
        {value && !detected && <span className="text-electric-violet text-[10px]">Manuel</span>}
        {!value && required && <span className="text-red-400 text-[10px]">Requis</span>}
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

interface CampaignWizardProps {
  onClose: () => void
  onSent:  () => void
}

export default function CampaignWizard({ onClose, onSent }: CampaignWizardProps) {
  const { user, profile } = useAuth()
  const [step, setStep]         = useState(0)
  const [dir,  setDir]          = useState(1)
  const [sending, setSending]   = useState(false)
  const [progress, setProgress] = useState(0)
  const [done, setDone]         = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  // Inline edit state
  const [editingId,  setEditingId]  = useState<number | null>(null)
  const [editValue,  setEditValue]  = useState("")

  const [state, setState] = useState<WizardState>({
    contactRows: [], fileName: null,
    phoneColumn: null, firstNameColumn: null, lastNameColumn: null,
    allColumns: [], allRows: [],
    recentChecked: false, recentExcluded: false,
    rgpdAccepted: false, selectedTemplate: null,
    googleLink: "", shortCode: null, shortLinkSaved: false,
    message: "", campaignName: "",
  })

  // ── Derived values ────────────────────────────────────────────────────

  const contacts  = state.contactRows
    .filter((r) => r.status === "ok" || r.status === "recent")
    .map((r) => r.phone)

  const recentRows = state.contactRows.filter((r) => r.status === "recent")
  const credits    = profile?.sms_credits ?? 0
  const cost       = contacts.length
  const hasEnough  = credits >= cost

  // ── Template helpers ──────────────────────────────────────────────────

  function buildMessage(templateIdx: number, shortCode: string | null) {
    const smsLink = shortCode ? `${SMS_DOMAIN}/${shortCode}` : FAKE_LINK
    return TEMPLATES[templateIdx].text.replace("[LIEN]", smsLink)
  }

  function selectTemplate(idx: number) {
    setState((s) => ({ ...s, selectedTemplate: idx, message: buildMessage(idx, s.shortCode) }))
  }

  function setGoogleLink(link: string) {
    setState((s) => {
      const newCode = link.trim() ? (s.shortCode ?? generateShortCode()) : null
      return {
        ...s, googleLink: link, shortCode: newCode, shortLinkSaved: false,
        message: s.selectedTemplate !== null ? buildMessage(s.selectedTemplate, newCode) : s.message,
      }
    })
  }

  const previewMessage = state.selectedTemplate !== null
    ? buildMessage(state.selectedTemplate, state.shortCode) : ""

  // ── Auto-save short link ──────────────────────────────────────────────

  useEffect(() => {
    if (!user || !state.shortCode || !state.googleLink.trim() || state.shortLinkSaved) return
    supabase.from("short_links").upsert(
      { short_code: state.shortCode, destination_url: state.googleLink.trim(), user_id: user.id },
      { onConflict: "short_code" }
    ).then(({ error }) => {
      if (!error) setState((s) => ({ ...s, shortLinkSaved: true }))
    })
  }, [state.shortCode, state.googleLink, user])

  async function ensureShortLinkSaved(): Promise<boolean> {
    if (!user || !state.shortCode || !state.googleLink.trim()) return false
    if (state.shortLinkSaved) return true
    const { error } = await supabase.from("short_links").upsert(
      { short_code: state.shortCode, destination_url: state.googleLink.trim(), user_id: user.id },
      { onConflict: "short_code" }
    )
    if (error) { toast.error("Erreur lors de la création du lien court."); return false }
    setState((s) => ({ ...s, shortLinkSaved: true }))
    return true
  }

  // ── Navigation ────────────────────────────────────────────────────────

  async function go(next: number) {
    if (next === 1 && !state.recentChecked && contacts.length > 0) {
      await checkRecentlySent(contacts)
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
        const rows = XLSX.utils.sheet_to_json<Record<string, string>>(wb.Sheets[wb.SheetNames[0]], { defval: "" })
        applyRows(rows, rows.length > 0 ? Object.keys(rows[0]) : [], file.name)
      }
      reader.readAsBinaryString(file)
    } else {
      toast.error("Format non supporté (.csv, .xlsx uniquement).")
    }
  }

  function applyRows(rows: Record<string, string>[], headers: string[], fileName: string) {
    const phoneCol     = detectCol(headers, PHONE_CANDIDATES)     ?? headers[0] ?? null
    const firstNameCol = detectCol(headers, FIRSTNAME_CANDIDATES)
    const lastNameCol  = detectCol(headers, LASTNAME_CANDIDATES)

    if (!phoneCol) { toast.error("Aucune colonne valide trouvée."); return }

    const contactRows = buildContactRows(rows, phoneCol, firstNameCol, lastNameCol)
    const dupes = contactRows.filter((r) => r.status === "duplicate").length
    const invalids = contactRows.filter((r) => r.status === "invalid").length
    if (dupes > 0) toast.info(`${dupes} doublon${dupes > 1 ? "s" : ""} détecté${dupes > 1 ? "s" : ""} (rouge).`)
    if (invalids > 0) toast.warning(`${invalids} numéro${invalids > 1 ? "s" : ""} invalide${invalids > 1 ? "s" : ""} détecté${invalids > 1 ? "s" : ""} (rouge).`)

    setState((s) => ({
      ...s, fileName, allColumns: headers, allRows: rows,
      phoneColumn: phoneCol,
      firstNameColumn: firstNameCol,
      lastNameColumn: lastNameCol,
      contactRows,
      recentChecked: false, recentExcluded: false,
    }))
  }

  function remapColumns(phoneCol: string, firstNameCol: string | null, lastNameCol: string | null) {
    const rows = buildContactRows(state.allRows, phoneCol, firstNameCol, lastNameCol)
    setState((s) => ({
      ...s, phoneColumn: phoneCol, firstNameColumn: firstNameCol, lastNameColumn: lastNameCol,
      contactRows: rows, recentChecked: false, recentExcluded: false,
    }))
  }

  // ── Row inline edit ───────────────────────────────────────────────────

  function startEdit(row: ContactRow) {
    setEditingId(row.id)
    setEditValue(row.rawPhone)
  }

  function commitEdit(rowId: number) {
    const cleaned = cleanPhoneNumber(editValue.trim())
    setState((s) => {
      const others = s.contactRows.filter((r) => r.id !== rowId)
      const otherPhones = new Set(others.map((r) => r.phone))
      let status: RowStatus = "ok"
      if (!cleaned || !isValidPhone(cleaned)) status = "invalid"
      else if (otherPhones.has(cleaned)) status = "duplicate"
      const updated = s.contactRows.map((r) =>
        r.id === rowId ? { ...r, rawPhone: editValue.trim(), phone: cleaned, status } : r
      )
      return { ...s, contactRows: updated }
    })
    setEditingId(null)
  }

  function deleteRow(rowId: number) {
    setState((s) => ({ ...s, contactRows: s.contactRows.filter((r) => r.id !== rowId) }))
  }

  // ── Anti-spam check ───────────────────────────────────────────────────

  async function checkRecentlySent(contactList: string[]) {
    if (!user || contactList.length === 0) return
    const since = new Date(); since.setDate(since.getDate() - 30)
    const { data } = await supabase.from("sms_logs").select("recipient")
      .eq("user_id", user.id).gte("created_at", since.toISOString()).in("recipient", contactList)
    const recent = new Set((data ?? []).map((r) => r.recipient))
    setState((s) => ({
      ...s,
      recentChecked: true,
      contactRows: s.contactRows.map((r) => ({
        ...r, status: r.status === "ok" && recent.has(r.phone) ? "recent" : r.status,
      })),
    }))
  }

  function excludeRecentlySent() {
    setState((s) => ({
      ...s,
      contactRows: s.contactRows.filter((r) => r.status !== "recent"),
      recentExcluded: true,
    }))
  }

  // ── Send ──────────────────────────────────────────────────────────────

  async function handleSend() {
    if (!user) return
    const saved = await ensureShortLinkSaved()
    if (!saved) return
    setSending(true); setProgress(0)
    const timer = setInterval(() => setProgress((p) => (p < 88 ? p + 4 : p)), 350)
    try {
      const { data, error } = await supabase.functions.invoke<{
        sent: number; failed: number; results: SmsResult[]
      }>("send-bulk-sms", { body: { recipients: contacts, message: state.message } })
      clearInterval(timer); setProgress(100)
      if (error) throw error
      const { sent, failed } = data!
      setDone(true)
      toast.success(`${sent} SMS envoyé${sent > 1 ? "s" : ""}.${failed > 0 ? ` ${failed} échec(s).` : ""}`)
    } catch (err) {
      clearInterval(timer); setProgress(0); setSending(false)
      const msg = err instanceof Error ? err.message : String(err)
      toast.error(msg.includes("Insufficient") ? "Crédits insuffisants." : `Erreur : ${msg}`)
    }
  }

  // ── Step content ──────────────────────────────────────────────────────

  const okCount     = state.contactRows.filter((r) => r.status === "ok").length
  const recentCount = state.contactRows.filter((r) => r.status === "recent").length
  const dupeCount   = state.contactRows.filter((r) => r.status === "duplicate").length
  const badCount    = state.contactRows.filter((r) => r.status === "invalid").length

  const stepContent = [

    /* ── STEP 1 : Import & Mapping ──────────────────────────────────── */
    <div key="s1" className="space-y-5">

      {/* Drop zone */}
      <div
        className="border-2 border-dashed border-white/15 hover:border-electric-violet/50 transition-colors rounded-2xl p-8 text-center cursor-pointer group"
        onClick={() => fileRef.current?.click()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="w-12 h-12 rounded-2xl bg-electric-violet/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-electric-violet/20 transition-colors">
          <Upload className="w-6 h-6 text-electric-violet" />
        </div>
        {state.fileName
          ? <><p className="text-white font-medium text-sm">{state.fileName}</p><p className="text-white/40 text-xs mt-1">Cliquez pour changer</p></>
          : <><p className="text-white/60 text-sm mb-1">Glissez votre fichier ici</p><p className="text-white/30 text-xs">.csv ou .xlsx acceptés</p></>
        }
        <input ref={fileRef} type="file" accept=".csv,.xlsx,.xls" className="hidden"
          onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }} />
      </div>

      {/* Mapping */}
      {state.allColumns.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
          <p className="text-white/50 text-xs uppercase tracking-wide font-medium mb-1">Mapping des colonnes</p>
          <MappingRow
            label="Prénom" value={state.firstNameColumn ?? ""}
            columns={state.allColumns}
            detected={state.firstNameColumn === detectCol(state.allColumns, FIRSTNAME_CANDIDATES)}
            onChange={(v) => remapColumns(state.phoneColumn!, v || null, state.lastNameColumn)}
          />
          <MappingRow
            label="Nom" value={state.lastNameColumn ?? ""}
            columns={state.allColumns}
            detected={state.lastNameColumn === detectCol(state.allColumns, LASTNAME_CANDIDATES)}
            onChange={(v) => remapColumns(state.phoneColumn!, state.firstNameColumn, v || null)}
          />
          <MappingRow
            label="Téléphone" required value={state.phoneColumn ?? ""}
            columns={state.allColumns}
            detected={state.phoneColumn === detectCol(state.allColumns, PHONE_CANDIDATES)}
            onChange={(v) => v && remapColumns(v, state.firstNameColumn, state.lastNameColumn)}
          />
        </div>
      )}

      {/* Contact list */}
      {state.contactRows.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {/* Summary bar */}
          <div className="px-4 py-3 border-b border-white/8 flex items-center gap-3 flex-wrap">
            <span className="text-white/60 text-xs">{state.contactRows.length} ligne{state.contactRows.length > 1 ? "s" : ""}</span>
            {okCount     > 0 && <span className="flex items-center gap-1 text-green-400  text-xs"><span className="w-1.5 h-1.5 rounded-full bg-green-400"  />{okCount} OK</span>}
            {recentCount > 0 && <span className="flex items-center gap-1 text-warning    text-xs"><span className="w-1.5 h-1.5 rounded-full bg-warning"    />{recentCount} récent{recentCount > 1 ? "s" : ""}</span>}
            {dupeCount   > 0 && <span className="flex items-center gap-1 text-red-400    text-xs"><span className="w-1.5 h-1.5 rounded-full bg-red-400"    />{dupeCount} doublon{dupeCount > 1 ? "s" : ""}</span>}
            {badCount    > 0 && <span className="flex items-center gap-1 text-red-400    text-xs"><span className="w-1.5 h-1.5 rounded-full bg-red-400"    />{badCount} invalide{badCount > 1 ? "s" : ""}</span>}
          </div>

          {/* Table */}
          <div className="max-h-64 overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-[#0d0d1a]">
                <tr>
                  {["#", "Prénom", "Nom", "Téléphone", "Statut", ""].map((h) => (
                    <th key={h} className="px-3 py-2 text-left text-white/30 font-medium uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state.contactRows.map((row, i) => (
                  <tr key={row.id} className={`border-t border-white/5 ${row.status === "invalid" || row.status === "duplicate" ? "opacity-60" : ""}`}>
                    <td className="px-3 py-2 text-white/25">{i + 1}</td>
                    <td className="px-3 py-2 text-white/70">{row.firstName || <span className="text-white/20">—</span>}</td>
                    <td className="px-3 py-2 text-white/70">{row.lastName  || <span className="text-white/20">—</span>}</td>
                    <td className="px-3 py-2 font-mono">
                      {editingId === row.id ? (
                        <input
                          autoFocus
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => commitEdit(row.id)}
                          onKeyDown={(e) => { if (e.key === "Enter") commitEdit(row.id); if (e.key === "Escape") setEditingId(null) }}
                          className="bg-white/10 border border-electric-violet/50 rounded px-2 py-0.5 text-white w-32 outline-none text-xs"
                        />
                      ) : (
                        <span className={row.status === "invalid" ? "text-red-400" : "text-white/80"}>{row.phone || row.rawPhone}</span>
                      )}
                    </td>
                    <td className="px-3 py-2"><StatusBadge status={row.status} /></td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1">
                        <button onClick={() => startEdit(row)} className="p-1 rounded text-white/30 hover:text-electric-violet hover:bg-electric-violet/10 transition-colors">
                          <Pencil className="w-3 h-3" />
                        </button>
                        <button onClick={() => deleteRow(row.id)} className="p-1 rounded text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          {[
            ["destinataires", contacts.length, "text-white"],
            ["crédits requis", cost, "text-white"],
            ["déjà contactés", recentRows.length, recentRows.length > 0 && !state.recentExcluded ? "text-warning" : "text-green-400"],
          ].map(([label, val, color]) => (
            <div key={String(label)} className="bg-white/5 rounded-xl p-3 text-center">
              <p className={`text-2xl font-bold ${color}`}>{val}</p>
              <p className="text-white/50 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {recentRows.length > 0 && !state.recentExcluded && (
        <div className="bg-warning/8 border border-warning/30 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-warning font-medium text-sm mb-1">
                {recentRows.length} contact{recentRows.length > 1 ? "s" : ""} déjà contacté{recentRows.length > 1 ? "s" : ""} ce mois-ci
              </p>
              <p className="text-white/50 text-xs mb-3">Les inclure peut nuire à votre réputation d'expéditeur.</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {recentRows.slice(0, 8).map((r, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-warning/15 text-warning text-xs font-mono">{r.phone}</span>
                ))}
                {recentRows.length > 8 && <span className="px-2 py-0.5 rounded bg-warning/10 text-warning/60 text-xs">+{recentRows.length - 8}</span>}
              </div>
              <button onClick={excludeRecentlySent}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-warning/20 hover:bg-warning/30 border border-warning/30 text-warning text-sm font-medium transition-colors">
                <UserX className="w-4 h-4" /> Exclure ces {recentRows.length} contact{recentRows.length > 1 ? "s" : ""}
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
        <p className="text-white/40 text-xs mb-2">Liste finale ({contacts.length} numéros)</p>
        <div className="space-y-0.5">
          {contacts.map((c, i) => (
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
              En cochant cette case, vous confirmez que les destinataires ont consenti à recevoir des communications SMS de votre établissement conformément au RGPD.
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
      <div className="grid grid-cols-2 gap-4">
        {TEMPLATES.map((tpl, idx) => {
          const selected = state.selectedTemplate === idx
          return (
            <button key={idx} onClick={() => selectTemplate(idx)}
              className={`text-left rounded-2xl p-4 border-2 transition-all duration-200 ${
                selected ? "border-electric-violet bg-electric-violet/10" : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08]"
              }`}
              style={selected ? { boxShadow: "0 0 20px rgba(139,92,246,0.2)" } : {}}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="font-semibold text-white text-sm">{tpl.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${tpl.tagColor}`}>{tpl.tag}</span>
              </div>
              <p className="text-white/45 text-xs leading-relaxed mb-3">{tpl.description}</p>
              <p className="text-white/60 text-[11px] leading-relaxed line-clamp-3 font-mono">{tpl.text.replace("[LIEN]", FAKE_LINK)}</p>
              {selected && <div className="mt-3 flex items-center gap-1.5 text-electric-violet text-xs font-medium"><Check className="w-3.5 h-3.5" /> Sélectionné</div>}
            </button>
          )
        })}
      </div>

      {state.selectedTemplate !== null && !state.googleLink.trim() && (
        <div className="flex items-center gap-2 bg-warning/8 border border-warning/30 rounded-xl px-4 py-3 text-sm text-warning">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" /> Renseignez votre lien d'avis Google dans le panneau de droite pour continuer.
        </div>
      )}

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
      {done ? <SuccessScreen onBack={onSent} /> : (
        <>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/8 bg-white/[0.03]">
              <h3 className="text-sm font-semibold text-white/70">Résumé de la campagne</h3>
            </div>
            {[
              ["Campagne",              state.campaignName || "Sans nom"],
              ["Modèle choisi",         state.selectedTemplate !== null ? TEMPLATES[state.selectedTemplate].name : "—"],
              ["Destinataires valides", `${contacts.length}`],
              ["Crédits à débiter",     `${cost}`],
            ].map(([label, value], i) => (
              <div key={i} className="px-5 py-3.5 flex justify-between text-sm border-b border-white/5 last:border-0">
                <span className="text-white/50">{label}</span>
                <span className={`font-medium ${label === "Crédits à débiter" && !hasEnough ? "text-red-400" : "text-white"}`}>{value}</span>
              </div>
            ))}
          </div>

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
              <div className="flex justify-between text-xs text-white/50 mb-1.5"><span>Envoi en cours…</span><span>{progress}%</span></div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div className="bg-electric-violet h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          <button
            onClick={handleSend}
            disabled={sending || !hasEnough || contacts.length === 0 || !state.message.trim()}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold transition-all bg-electric-violet hover:bg-electric-violet/80 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-electric-violet"
          >
            {sending ? <><Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours…</> : <><Send className="w-5 h-5" /> Lancer l'envoi ({contacts.length} SMS)</>}
          </button>
        </>
      )}
    </div>,
  ]

  // ── Nav guards ────────────────────────────────────────────────────────

  const canNext = [
    contacts.length > 0,
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
            <motion.div key={step} custom={dir} variants={SLIDE} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22, ease: "easeInOut" }}>
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
        shortCode={state.shortCode}
        contactCount={contacts.length}
        credits={credits}
        currentStep={step}
      />
    </div>
  )
}
