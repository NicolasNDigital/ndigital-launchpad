import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus, CreditCard, LogOut, MessageSquare,
  CheckCircle2, XCircle, Clock, Inbox
} from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import Header from "@/components/Header"
import CampaignWizard from "@/components/campaign/CampaignWizard"

interface SmsLog {
  id: string
  recipient: string
  message: string
  status: string
  cost: number
  created_at: string
}

function StatusBadge({ status }: { status: string }) {
  if (status === "sent") return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/15 text-green-400 text-xs font-medium">
      <CheckCircle2 className="w-3 h-3" /> Envoyé
    </span>
  )
  if (status === "failed") return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/15 text-red-400 text-xs font-medium">
      <XCircle className="w-3 h-3" /> Échec
    </span>
  )
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-white/50 text-xs font-medium">
      <Clock className="w-3 h-3" /> {status}
    </span>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  })
}

export default function Dashboard() {
  const { user, profile, signOut } = useAuth()
  const [wizardOpen, setWizardOpen] = useState(false)
  const [logs, setLogs] = useState<SmsLog[]>([])
  const [logsLoading, setLogsLoading] = useState(true)

  const credits = profile?.sms_credits ?? 0

  async function loadLogs() {
    if (!user) return
    setLogsLoading(true)
    const { data, error } = await supabase
      .from("sms_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50)

    if (error) {
      toast.error("Impossible de charger l'historique.")
    } else {
      setLogs(data ?? [])
    }
    setLogsLoading(false)
  }

  useEffect(() => { loadLogs() }, [user])

  async function handleSignOut() {
    await signOut()
    toast.success("Déconnecté.")
  }

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Header />

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric-violet/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-neon-cyan/4 rounded-full blur-[100px]" />
      </div>

      <div className="relative container mx-auto px-4 pt-28 pb-16 max-w-6xl">

        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">
              Bonjour{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""} 👋
            </h1>
            <p className="text-white/40 text-sm mt-0.5">{user?.email}</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Solde */}
            <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
              <CreditCard className="w-4 h-4 text-electric-violet" />
              <span className="text-white/60 text-sm">Solde :</span>
              <span className="text-white font-semibold">{credits} SMS</span>
            </div>

            {/* Nouvelle campagne */}
            {!wizardOpen && (
              <button
                onClick={() => setWizardOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-electric-violet hover:bg-electric-violet/80 transition-all font-semibold text-sm text-white"
              >
                <Plus className="w-4 h-4" />
                Nouvelle Campagne
              </button>
            )}

            {/* Déconnexion */}
            <button
              onClick={handleSignOut}
              className="p-2.5 rounded-xl text-white/30 hover:text-white hover:bg-white/8 transition-all"
              title="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Wizard */}
        <AnimatePresence>
          {wizardOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}
              className="mb-10 bg-white/[0.025] border border-white/10 rounded-3xl p-8 shadow-2xl"
              style={{ boxShadow: "0 0 60px rgba(139, 92, 246, 0.08)" }}
            >
              <CampaignWizard
                onClose={() => setWizardOpen(false)}
                onSent={() => { setWizardOpen(false); loadLogs() }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Historique */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <MessageSquare className="w-4 h-4 text-electric-violet" />
            <h2 className="font-semibold text-white/80">Historique des envois</h2>
            {logs.length > 0 && (
              <span className="ml-auto text-white/30 text-sm">{logs.length} entrée{logs.length > 1 ? "s" : ""}</span>
            )}
          </div>

          {logsLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-7 h-7 rounded-full border-2 border-electric-violet border-t-transparent animate-spin" />
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.02] border border-white/8 rounded-2xl">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Inbox className="w-7 h-7 text-white/20" />
              </div>
              <p className="text-white/40 font-medium mb-1">Aucun envoi pour l'instant</p>
              <p className="text-white/25 text-sm">Créez votre première campagne pour commencer.</p>
            </div>
          ) : (
            <div className="bg-white/[0.02] border border-white/8 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left px-5 py-3.5 text-white/40 font-medium text-xs uppercase tracking-wide">Destinataire</th>
                    <th className="text-left px-5 py-3.5 text-white/40 font-medium text-xs uppercase tracking-wide hidden md:table-cell">Message</th>
                    <th className="text-left px-5 py-3.5 text-white/40 font-medium text-xs uppercase tracking-wide">Statut</th>
                    <th className="text-right px-5 py-3.5 text-white/40 font-medium text-xs uppercase tracking-wide hidden sm:table-cell">Coût</th>
                    <th className="text-right px-5 py-3.5 text-white/40 font-medium text-xs uppercase tracking-wide hidden lg:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, i) => (
                    <tr
                      key={log.id}
                      className={`border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors ${
                        i % 2 === 0 ? "" : "bg-white/[0.015]"
                      }`}
                    >
                      <td className="px-5 py-4 font-mono text-white/70">{log.recipient}</td>
                      <td className="px-5 py-4 text-white/50 hidden md:table-cell max-w-xs">
                        <span className="truncate block">{log.message}</span>
                      </td>
                      <td className="px-5 py-4"><StatusBadge status={log.status} /></td>
                      <td className="px-5 py-4 text-right text-white/50 hidden sm:table-cell">{log.cost} cr.</td>
                      <td className="px-5 py-4 text-right text-white/35 text-xs hidden lg:table-cell">{formatDate(log.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
