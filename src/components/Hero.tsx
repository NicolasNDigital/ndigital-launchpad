import { motion } from "framer-motion";
import { Zap, Wallet, TrendingUp, ArrowRight, Clock, MapPin, Euro } from "lucide-react";
const Hero = () => {
  const usps = [{
    icon: Zap,
    title: "Livraison express",
    desc: "2 semaines ou -20% de réduction"
  }, {
    icon: Wallet,
    title: "Tarifs transparents",
    desc: "Dès 900€, sans surprises"
  }, {
    icon: TrendingUp,
    title: "Résultats mesurables",
    desc: "Sites optimisés SEO + Ads qui convertissent"
  }];
  return <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-32 bg-gradient-to-b from-deep-black via-deep-black/95 to-electric-blue/20">
      {/* Lighter background with softer mesh gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-electric-blue/15 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-vibrant-violet/15 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 text-electric-blue text-sm font-semibold border border-electric-blue/20">
              🚀 Création de sites vitrines pour artisans & business locaux
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight">
            Votre Site Vitrine Pro{" "}
            <span className="gradient-text">En 2 Semaines</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">Artisans, commerçants, indépendants : obtenez un site moderne qui améliore votre visibilité, votre image et qui génère des clients.
Mis en ligne en 14 jours maximum garanti.<br />
            <strong className="text-white">Mis en ligne en 14 jours maximum garanti.</strong>
          </motion.p>

          {/* USPs */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {usps.map((usp, index) => <div key={index} className="rounded-2xl p-4 bg-white/5 border border-white/10 hover:border-electric-blue/30 transition-all hover:bg-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <usp.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">{usp.title}</p>
                    <p className="text-white/50 text-xs">{usp.desc}</p>
                  </div>
                </div>
              </div>)}
          </motion.div>

          {/* CTA - Single button */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }} className="mt-10 flex justify-center">
            <a href="#contact" className="btn-orange text-lg px-8 py-4 group">
              Demander mon devis gratuit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Stats - Redesigned as elegant inline badges */}
          <motion.div initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.5
        }} className="mt-12 inline-flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
              <Clock className="w-4 h-4 text-electric-blue" />
              <span className="text-white/90 font-medium text-sm">14 jours max</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
              <Euro className="w-4 h-4 text-neon-cyan" />
              <span className="text-white/90 font-medium text-sm">Dès 900€</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
              <MapPin className="w-4 h-4 text-vibrant-violet" />
              <span className="text-white/90 font-medium text-sm">Expert Strasbourg</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Hero;