import { CreditCard, Settings2, Zap, Info, Link2, AlertTriangle, CheckCircle2 } from "lucide-react"

interface CampaignSidebarProps {
  campaignName: string
  onCampaignNameChange: (v: string) => void
  googleLink: string
  onGoogleLinkChange: (v: string) => void
  contactCount: number
  credits: number
  currentStep: number
}

export default function CampaignSidebar({
  campaignName,
  onCampaignNameChange,
  googleLink,
  onGoogleLinkChange,
  contactCount,
  credits,
  currentStep,
}: CampaignSidebarProps) {
  const cost = contactCount
  const hasEnough = credits >= cost
  const linkOk = googleLink.trim().length > 0

  const stepHints = [
    "Importez un fichier CSV ou Excel contenant les numéros de vos clients.",
    "Vérifiez vos contacts et acceptez les conditions RGPD avant de continuer.",
    "Choisissez un modèle et renseignez votre lien d'avis Google ci-dessous.",
    "Relisez le résumé avant de lancer l'envoi. L'opération est irréversible.",
  ]

  return (
    <aside className="w-72 flex-shrink-0 flex flex-col gap-4">

      {/* Réglages */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Settings2 className="w-4 h-4 text-electric-violet" />
          <span className="text-sm font-medium text-white/80">Réglages</span>
        </div>

        <label className="block text-white/50 text-xs mb-1.5">Nom de la campagne</label>
        <input
          type="text"
          value={campaignName}
          onChange={(e) => onCampaignNameChange(e.target.value)}
          placeholder="Ex : Avis clients juin 2026"
          className="w-full bg-white/5 border border-white/10 focus:border-electric-violet rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors mb-4"
        />

        {/* Lien Google */}
        <label className="block text-white/50 text-xs mb-1.5 flex items-center gap-1.5">
          <Link2 className="w-3.5 h-3.5" />
          Votre lien d'avis Google
        </label>
        <input
          type="url"
          value={googleLink}
          onChange={(e) => onGoogleLinkChange(e.target.value)}
          placeholder="https://g.page/r/…"
          className={`w-full bg-white/5 border rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors ${
            linkOk ? "border-green-500/40 focus:border-green-400" : "border-warning/40 focus:border-warning"
          }`}
        />

        {!linkOk ? (
          <p className="flex items-center gap-1.5 text-warning text-xs mt-2">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            Requis pour insérer le lien dans le message
          </p>
        ) : (
          <p className="flex items-center gap-1.5 text-green-400 text-xs mt-2">
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
            Lien inséré automatiquement dans le modèle
          </p>
        )}

        <div className="mt-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white/40 text-xs">Twilio · Prêt</span>
        </div>
      </div>

      {/* Coût estimé */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-4 h-4 text-electric-violet" />
          <span className="text-sm font-medium text-white/80">Coût estimé</span>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Contacts</span>
            <span className="text-white font-medium">{contactCount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Crédits requis</span>
            <span className={`font-medium ${hasEnough || cost === 0 ? "text-white" : "text-red-400"}`}>{cost}</span>
          </div>
          <div className="h-px bg-white/10" />
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Votre solde</span>
            <span className={`font-semibold ${hasEnough || cost === 0 ? "text-electric-violet" : "text-red-400"}`}>
              {credits} SMS
            </span>
          </div>
        </div>
        {cost > 0 && (
          <div className="mt-3">
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${hasEnough ? "bg-electric-violet" : "bg-red-500"}`}
                style={{ width: `${Math.min((credits / Math.max(cost, 1)) * 100, 100)}%` }}
              />
            </div>
            {!hasEnough && (
              <p className="text-red-400 text-xs mt-2">Il manque {cost - credits} crédit{cost - credits > 1 ? "s" : ""}.</p>
            )}
          </div>
        )}
      </div>

      {/* Aide contextuelle */}
      <div className="bg-electric-violet/8 border border-electric-violet/20 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-electric-violet flex-shrink-0" />
          <span className="text-sm font-medium text-electric-violet">Étape {currentStep + 1}/4</span>
        </div>
        <p className="text-white/55 text-xs leading-relaxed">{stepHints[currentStep]}</p>
      </div>

      {/* Indicateur vitesse */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-warning" />
        </div>
        <div>
          <p className="text-xs font-medium text-white/70">Livraison instantanée</p>
          <p className="text-xs text-white/35">~2 secondes par SMS</p>
        </div>
      </div>

    </aside>
  )
}
