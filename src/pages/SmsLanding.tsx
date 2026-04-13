import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Upload, CreditCard, ShieldCheck, Zap, FileSpreadsheet,
  MessageSquare, BarChart3, ArrowRight, Check, Users, Star
} from "lucide-react"
import Header from "@/components/Header"

// ── Helpers ────────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Data ───────────────────────────────────────────────────────────────────

const WHY_CARDS = [
  {
    icon: Star,
    title: "Plus d'avis, plus de clients",
    body: "Un SMS avec votre lien Google reçu juste après la prestation = taux de conversion jusqu'à 5× supérieur à un simple email.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    icon: Zap,
    title: "Campagne lancée en 3 clics",
    body: "Importez votre liste, personnalisez le message avec votre lien d'avis et envoyez. Aucune compétence technique requise.",
    color: "text-neon-cyan",
    bg: "bg-neon-cyan/10",
  },
  {
    icon: BarChart3,
    title: "Suivi complet de chaque envoi",
    body: "Consultez l'historique en temps réel : qui a reçu le lien, quand, avec quel statut. Zéro angle mort.",
    color: "text-electric-violet",
    bg: "bg-electric-violet/10",
  },
]

const IMPORT_FEATURES = [
  "Colonnes de numéros détectées automatiquement (phone, mobile, téléphone…)",
  "Glisser-déposer ou sélection de fichier — CSV ou Excel",
  "Aperçu du nombre de destinataires avant envoi",
  "Personnalisez le message avec votre lien Google Reviews intégré",
]

const PRICING_POINTS = [
  "Aucun abonnement mensuel, aucun engagement",
  "1 crédit = 1 SMS envoyé",
  "Rechargez uniquement ce dont vous avez besoin",
  "Le solde est vérifié avant chaque envoi — zéro surprise",
]

const CTA_HREF = "https://avis-pro.eu"
const CTA_LABEL = "Commencer maintenant"

// ── Component ──────────────────────────────────────────────────────────────

export default function SmsLanding() {
  return (
    <div className="min-h-screen bg-deep-black text-white overflow-x-hidden">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-28 px-4">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-electric-violet/[0.06] rounded-full blur-[160px]" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-cyan/[0.04] rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-dynamic-orange/[0.04] rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto max-w-4xl text-center relative">
          {/* Logo with creative frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-center mb-10"
          >
            <div className="relative group">
              {/* Animated glow ring behind */}
              <div className="absolute -inset-3 bg-gradient-to-r from-electric-violet via-neon-cyan to-dynamic-orange rounded-2xl opacity-60 blur-lg group-hover:opacity-80 transition-opacity duration-500 animate-pulse-glow" />
              {/* Gradient border wrapper */}
              <div className="relative p-[2px] rounded-2xl bg-gradient-to-br from-electric-violet via-neon-cyan/50 to-dynamic-orange">
                <div className="bg-white rounded-[14px] px-5 py-3 flex items-center gap-3">
                  <img src="/assets/avis-pro-logo.png" alt="Avis-Pro" className="h-10 md:h-12 object-contain" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="text-4xl md:text-6xl font-heading font-bold leading-tight mb-3"
          >
            Découvrez{" "}
            <span className="gradient-text">Avis-Pro</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="text-lg md:text-xl text-white/40 font-medium mb-8"
          >
            par NDigital
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
          >
            Envoyez un SMS avec votre lien d'avis Google à toute votre base clients en quelques secondes.
            Paiement à l'usage, sans abonnement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
          >
            <a
              href={CTA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-3.5 inline-flex items-center gap-2"
            >
              {CTA_LABEL}
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-14 text-white/40 text-sm"
          >
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> Artisans & commerçants</span>
            <span className="w-px h-4 bg-white/10" />
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Hébergement 🇫🇷</span>
            <span className="w-px h-4 bg-white/10" />
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4" /> Conçu pour les avis Google</span>
          </motion.div>
        </div>
      </section>

      {/* ── Pourquoi choisir Avis-Pro ? ──────────────────────────────────── */}
      <section className="py-24 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto max-w-5xl">
          <FadeIn className="text-center mb-14">
            <h2 className="section-title mb-4">
              Pourquoi les pros choisissent{" "}
              <span className="gradient-text">Avis-Pro ?</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              La réputation locale se joue sur Google. Un SMS au bon moment transforme un client satisfait en ambassadeur.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {WHY_CARDS.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.1}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300 h-full">
                  <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mb-4`}>
                    <card.icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                  <p className="text-white/55 leading-relaxed">{card.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Import facile Excel / CSV ────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Text */}
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-xs font-medium mb-5">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                Import Excel &amp; CSV
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-5 leading-tight">
                Vos clients reçoivent votre lien Google{" "}
                <span className="gradient-text">en 10 secondes</span>
              </h2>
              <p className="text-white/55 mb-8 leading-relaxed">
                Exportez votre base clients depuis votre logiciel de caisse, votre CRM ou un tableur.
                Glissez le fichier : les numéros sont détectés automatiquement et votre lien d'avis Google est intégré dans le message.
              </p>
              <ul className="space-y-3">
                {IMPORT_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-white/70">
                    <Check className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </FadeIn>

            {/* Visual mockup */}
            <FadeIn delay={0.15}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                {/* Fake file drop zone */}
                <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center mb-4">
                  <Upload className="w-8 h-8 text-white/25 mx-auto mb-2" />
                  <p className="text-white/40 text-sm">clients_avis_juillet.xlsx</p>
                  <p className="text-white/25 text-xs mt-1">Déposez votre fichier ici</p>
                </div>
                {/* Fake result */}
                <div className="flex items-center gap-2 bg-neon-cyan/10 border border-neon-cyan/20 rounded-lg px-4 py-3 text-sm">
                  <Check className="w-4 h-4 text-neon-cyan" />
                  <span className="text-white/70">
                    <strong className="text-white">247 contacts</strong> détectés · colonne &laquo;&nbsp;mobile&nbsp;&raquo;
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Paiement à l'usage ───────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Visual */}
            <FadeIn className="order-2 md:order-1">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Votre solde</span>
                  <span className="text-2xl font-bold">500 SMS</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-electric-violet h-2 rounded-full w-[62%]" />
                </div>
                <div className="flex items-center justify-between text-sm text-white/40">
                  <span>0</span>
                  <span>800 crédits achetés</span>
                </div>
                <div className="border-t border-white/10 pt-4 flex items-center gap-3 text-sm">
                  <CreditCard className="w-4 h-4 text-electric-violet" />
                  <span className="text-white/60">Prochain envoi : <strong className="text-white">247 crédits</strong></span>
                </div>
              </div>
            </FadeIn>

            {/* Text */}
            <FadeIn delay={0.15} className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-violet/10 border border-electric-violet/20 text-electric-violet text-xs font-medium mb-5">
                <CreditCard className="w-3.5 h-3.5" />
                Pay-as-you-go
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-5 leading-tight">
                Payez uniquement{" "}
                <span className="gradient-text">ce que vous envoyez</span>
              </h2>
              <p className="text-white/55 mb-8 leading-relaxed">
                Pas d'abonnement qui tourne en fond de tiroir. Achetez des crédits quand vous en avez besoin,
                utilisez-les à votre rythme. Votre solde ne expire pas.
              </p>
              <ul className="space-y-3">
                {PRICING_POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-white/70">
                    <Check className="w-5 h-5 text-electric-violet flex-shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <FadeIn>
            <img src="/assets/avis-pro-icon.png" alt="Avis-Pro" className="h-14 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-5">
              Prêt à décrocher vos{" "}
              <span className="gradient-text">prochains avis Google ?</span>
            </h2>
            <p className="text-white/55 mb-10 text-lg">
              Vos clients reçoivent un SMS avec votre lien Google. Ils laissent un avis en 15 secondes.
            </p>
            <a
              href={CTA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange text-base px-8 py-3.5 inline-flex items-center gap-2"
            >
              {CTA_LABEL}
              <ArrowRight className="w-5 h-5" />
            </a>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}
