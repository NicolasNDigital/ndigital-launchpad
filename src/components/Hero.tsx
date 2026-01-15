import { motion } from "framer-motion";
import { Zap, Wallet, TrendingUp, ArrowRight, Eye } from "lucide-react";

const Hero = () => {
  const stats = [
    { value: "14", label: "jours", sublabel: "Délai moyen livraison" },
    { value: "900€", label: "", sublabel: "Site vitrine complet" },
    { value: "Strasbourg", label: "", sublabel: "Expert local" },
  ];

  const usps = [
    {
      icon: Zap,
      title: "Livraison express",
      desc: "2 semaines ou -20% de réduction",
    },
    {
      icon: Wallet,
      title: "Tarifs transparents",
      desc: "Dès 900€, sans surprises",
    },
    {
      icon: TrendingUp,
      title: "Résultats mesurables",
      desc: "Sites optimisés SEO + Ads qui convertissent",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center animated-gradient mesh-gradient overflow-hidden pt-20">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-cyan/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-vibrant-violet/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/20 text-neon-cyan text-sm font-semibold backdrop-blur-sm border border-neon-cyan/30">
              🚀 Expert sites web & Google Ads à Strasbourg
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight"
          >
            Propulsez Votre Business Local{" "}
            <span className="text-neon-cyan">En 2 Semaines Chrono</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            Sites vitrines modernes + Campagnes Google Ads qui génèrent des clients.
            <br />
            De l'idée à la mise en ligne : <strong className="text-white">14 jours maximum garanti.</strong>
          </motion.p>

          {/* USPs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {usps.map((usp, index) => (
              <div
                key={index}
                className="glass-light rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <usp.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">{usp.title}</p>
                    <p className="text-white/60 text-xs">{usp.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#contact" className="btn-orange text-lg px-8 py-4 group">
              Demander mon devis gratuit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#realisations" className="btn-outline text-lg px-8 py-4">
              <Eye className="w-5 h-5" />
              Voir mes réalisations
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-heading font-bold text-white">
                  {stat.value}
                  {stat.label && <span className="text-lg ml-1">{stat.label}</span>}
                </p>
                <p className="text-white/60 text-sm mt-1">{stat.sublabel}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-white/50" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
