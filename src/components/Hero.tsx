import { motion } from "framer-motion";
import { Zap, Wallet, TrendingUp, ArrowRight, Clock, MapPin, Euro } from "lucide-react";

const Hero = () => {
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
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-deep-black">
      {/* Subtle background with mesh gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-black via-deep-black to-vibrant-violet/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-electric-blue/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-vibrant-violet/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 text-electric-blue text-sm font-semibold border border-electric-blue/20">
              🚀 Création de sites vitrines pour artisans & business locaux
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight"
          >
            Votre Site Vitrine Pro{" "}
            <span className="gradient-text">En 2 Semaines</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
          >
            Artisans, commerçants, indépendants : obtenez un site moderne qui génère des clients.
            <br />
            <strong className="text-white">Mis en ligne en 14 jours maximum garanti.</strong>
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
                className="rounded-2xl p-4 bg-white/5 border border-white/10 hover:border-electric-blue/30 transition-all hover:bg-white/[0.08]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <usp.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">{usp.title}</p>
                    <p className="text-white/50 text-xs">{usp.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA - Single button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex justify-center"
          >
            <a href="#contact" className="btn-orange text-lg px-8 py-4 group">
              Demander mon devis gratuit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Stats - Redesigned as elegant cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 flex flex-wrap justify-center gap-6"
          >
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-electric-blue/20 to-vibrant-violet/20 border border-white/10">
              <Clock className="w-5 h-5 text-electric-blue" />
              <span className="text-white font-medium">14 jours max</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-electric-blue/20 to-vibrant-violet/20 border border-white/10">
              <Euro className="w-5 h-5 text-neon-cyan" />
              <span className="text-white font-medium">Dès 900€</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-electric-blue/20 to-vibrant-violet/20 border border-white/10">
              <MapPin className="w-5 h-5 text-vibrant-violet" />
              <span className="text-white font-medium">Expert Strasbourg</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Elegant wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" 
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;