import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import Papa from "papaparse"
import * as XLSX from "xlsx"
import { ArrowLeft, Upload, Send, AlertCircle, CheckCircle2, Loader2, Users, MessageSquare, CreditCard } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"
type SmsResult = { recipient: string; status: "sent" | "failed"; error?: string }
import { toast } from "sonner"

// Noms de colonnes reconnus comme numéros de téléphone
const PHONE_COLUMN_CANDIDATES = [
  "phone", "telephone", "téléphone", "tel", "tél",
  "mobile", "numero", "numéro", "recipient", "destinataire",
  "portable", "gsm", "number",
]

function detectPhoneColumn(headers: string[]): string | null {
  const normalized = headers.map((h) => h.toLowerCase().trim())
  for (const candidate of PHONE_COLUMN_CANDIDATES) {
    const idx = normalized.indexOf(candidate)
    if (idx !== -1) return headers[idx]
  }
  return null
}

function extractContacts(rows: Record<string, string>[], phoneCol: string): string[] {
  return rows
    .map((row) => row[phoneCol]?.toString().trim())
    .filter(Boolean)
}

type SendStatus = "idle" | "sending" | "done" | "error"

export default function BulkSms() {
  const { user, profile } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [contacts, setContacts] = useState<string[]>([])
  const [phoneColumn, setPhoneColumn] = useState<string | null>(null)
  const [allColumns, setAllColumns] = useState<string[]>([])
  const [fileName, setFileName] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle")
  const [progress, setProgress] = useState(0)

  const credits = profile?.sms_credits ?? 0
  const cost = contacts.length
  const hasEnoughCredits = credits >= cost
  const canSend = cost > 0 && message.trim().length > 0 && hasEnoughCredits && sendStatus === "idle"

  // ── Parsing ──────────────────────────────────────────────────────────────

  function handleFile(file: File) {
    setFileName(file.name)
    setContacts([])
    setPhoneColumn(null)

    const ext = file.name.split(".").pop()?.toLowerCase()

    if (ext === "csv") {
      Papa.parse<Record<string, string>>(file, {
        header: true,
        skipEmptyLines: true,
        complete: ({ data, meta }) => processRows(data, meta.fields ?? []),
        error: () => toast.error("Impossible de lire le fichier CSV."),
      })
    } else if (ext === "xlsx" || ext === "xls") {
      const reader = new FileReader()
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target?.result, { type: "binary" })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: "" })
        const headers = rows.length > 0 ? Object.keys(rows[0]) : []
        processRows(rows, headers)
      }
      reader.readAsBinaryString(file)
    } else {
      toast.error("Format non supporté. Utilisez un fichier CSV ou Excel (.xlsx).")
    }
  }

  function processRows(rows: Record<string, string>[], headers: string[]) {
    setAllColumns(headers)
    const detected = detectPhoneColumn(headers)
    if (detected) {
      setPhoneColumn(detected)
      setContacts(extractContacts(rows, detected))
    } else if (headers.length > 0) {
      // Pas de colonne détectée automatiquement : on prend la première par défaut
      setPhoneColumn(headers[0])
      setContacts(extractContacts(rows, headers[0]))
    } else {
      toast.error("Le fichier semble vide ou mal formaté.")
    }
  }

  function handleColumnChange(col: string) {
    setPhoneColumn(col)
    // Re-parse n'est pas nécessaire : on a déjà toutes les rows via processRows
    // On réaffiche juste le label — le vrai re-extract se fait au prochain import
    // Pour simplifier, on vide et demande à l'utilisateur de ré-importer
    setContacts([])
    toast.info(`Colonne "${col}" sélectionnée. Ré-importez le fichier pour mettre à jour la liste.`)
  }

  // ── Drag & drop ───────────────────────────────────────────────────────────

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  // ── Envoi ─────────────────────────────────────────────────────────────────

  async function handleSend() {
    if (!user) return
    setSendStatus("sending")
    setProgress(0)

    // Feedback visuel immédiat — la progression passe à 10 % pendant l'appel réseau
    const progressTimer = setInterval(() => {
      setProgress((p) => (p < 90 ? p + 5 : p))
    }, 400)

    try {
      const { data, error } = await supabase.functions.invoke<{
        sent: number
        failed: number
        results: SmsResult[]
      }>("send-bulk-sms", {
        body: { recipients: contacts, message },
      })

      clearInterval(progressTimer)
      setProgress(100)

      if (error) throw error

      const { sent, failed } = data!
      setSendStatus("done")
      toast.success(
        `${sent} SMS envoyé${sent > 1 ? "s" : ""} avec succès.${failed > 0 ? ` ${failed} échec(s).` : ""}`
      )
    } catch (err) {
      clearInterval(progressTimer)
      setProgress(0)
      setSendStatus("error")
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.includes("Insufficient credits")) {
        toast.error("Crédits insuffisants — rechargez votre solde.")
      } else {
        toast.error(`Erreur lors de l'envoi : ${msg}`)
      }
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-3xl">

        {/* Navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-electric-violet hover:text-electric-violet/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2 gradient-text">
          Envoi Groupé SMS
        </h1>
        <p className="text-white/60 mb-10">
          Importez votre liste de contacts et envoyez un SMS en masse en quelques secondes.
        </p>

        {/* Solde */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 mb-8">
          <CreditCard className="w-5 h-5 text-electric-violet flex-shrink-0" />
          <span className="text-white/70">Votre solde actuel :</span>
          <span className="font-bold text-white text-lg ml-1">{credits} SMS</span>
        </div>

        {/* Zone d'import */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-electric-violet" />
            1. Importez votre liste de contacts
          </h2>

          <div
            className="border-2 border-dashed border-white/20 hover:border-electric-violet/60 transition-colors rounded-2xl p-10 text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <Upload className="w-10 h-10 text-white/30 mx-auto mb-3" />
            <p className="text-white/60 mb-1">
              {fileName ? (
                <span className="text-white font-medium">{fileName}</span>
              ) : (
                "Glissez-déposez un fichier CSV ou Excel ici"
              )}
            </p>
            <p className="text-white/30 text-sm">ou cliquez pour parcourir (.csv, .xlsx)</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }}
            />
          </div>

          {/* Sélecteur de colonne si détection ambiguë */}
          {allColumns.length > 1 && (
            <div className="mt-3 flex items-center gap-3">
              <label className="text-white/60 text-sm">Colonne téléphone :</label>
              <select
                value={phoneColumn ?? ""}
                onChange={(e) => handleColumnChange(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-electric-violet"
              >
                {allColumns.map((col) => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>
          )}

          {/* Résumé import */}
          {contacts.length > 0 && (
            <div className="mt-3 flex items-center gap-2 text-sm text-white/60">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>
                <strong className="text-white">{contacts.length}</strong> contact{contacts.length > 1 ? "s" : ""} détecté{contacts.length > 1 ? "s" : ""}
                {phoneColumn && <span className="text-white/40"> · colonne « {phoneColumn} »</span>}
              </span>
            </div>
          )}
        </section>

        {/* Zone de message */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-electric-violet" />
            2. Rédigez votre message
          </h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Bonjour, nous vous informons que…"
            rows={4}
            maxLength={160}
            className="w-full bg-white/5 border border-white/10 focus:border-electric-violet rounded-2xl px-5 py-4 text-white placeholder:text-white/30 resize-none outline-none transition-colors"
          />
          <p className="text-right text-white/30 text-xs mt-1">{message.length}/160 caractères</p>
        </section>

        {/* Récapitulatif & validation */}
        {contacts.length > 0 && message.trim().length > 0 && (
          <div className={`rounded-2xl px-6 py-4 mb-8 border ${hasEnoughCredits ? "bg-electric-violet/10 border-electric-violet/30" : "bg-red-500/10 border-red-500/40"}`}>
            <p className={`font-medium ${hasEnoughCredits ? "text-white" : "text-red-400"}`}>
              Vous allez envoyer{" "}
              <strong>{contacts.length}</strong> message{contacts.length > 1 ? "s" : ""}.{" "}
              Coût : <strong>{cost} crédit{cost > 1 ? "s" : ""}</strong>.
            </p>
            {!hasEnoughCredits && (
              <p className="flex items-center gap-2 text-red-400 text-sm mt-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                Crédits insuffisants — il vous manque {cost - credits} crédit{cost - credits > 1 ? "s" : ""}. Rechargez votre solde pour continuer.
              </p>
            )}
          </div>
        )}

        {/* Barre de progression */}
        {sendStatus === "sending" && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-white/60 mb-1">
              <span>Envoi en cours…</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-electric-violet h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {sendStatus === "done" && (
          <div className="flex items-center gap-2 text-green-400 mb-6">
            <CheckCircle2 className="w-5 h-5" />
            <span>Envoi terminé. Consultez vos logs pour le détail.</span>
          </div>
        )}

        {/* Bouton d'envoi */}
        <button
          onClick={handleSend}
          disabled={!canSend}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-lg transition-all
            disabled:opacity-40 disabled:cursor-not-allowed
            enabled:bg-electric-violet enabled:hover:bg-electric-violet/80 enabled:active:scale-[0.98]"
        >
          {sendStatus === "sending" ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours…</>
          ) : (
            <><Send className="w-5 h-5" /> Lancer l'envoi</>
          )}
        </button>

      </div>
    </div>
  )
}
