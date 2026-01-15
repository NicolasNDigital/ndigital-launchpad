import { motion } from "framer-motion";
import { ArrowRight, Clock, Euro, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 bg-background overflow-hidden">
      {/* Decorative checkerboard strip at top */}
      <div className="absolute top-0 left-0 right-0 h-16 checkerboard opacity-10" />
      
      {/* Large decorative number */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[40vw] font-heading text-foreground/[0.03] leading-none pointer-events-none select-none hidden lg:block">
        14
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[2px] bg-foreground" />
            <span className="font-heading text-sm tracking-[0.3em] uppercase">
              Création de sites vitrines
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading leading-[0.9] tracking-wide mb-8"
          >
            VOTRE SITE
            <br />
            <span className="relative inline-block">
              PRO EN
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-foreground" />
            </span>
            <br />
            <span className="text-muted-foreground">2 SEMAINES</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-12 leading-relaxed"
          >
            Artisans, commerçants, indépendants : un site moderne 
            qui génère des clients. Livraison garantie en 14 jours.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a href="#contact" className="btn-primary group">
              Demander un devis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services" className="btn-outline">
              Découvrir les offres
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-8 md:gap-16"
          >
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5" />
              <div>
                <p className="font-heading text-2xl tracking-wide">14 JOURS</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Délai max</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Euro className="w-5 h-5" />
              <div>
                <p className="font-heading text-2xl tracking-wide">DÈS 900€</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Tarif fixe</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <div>
                <p className="font-heading text-2xl tracking-wide">STRASBOURG</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Expert local</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-[2px] bg-foreground/10" />
        <div className="h-8 diamond-border opacity-20" />
      </div>
    </section>
  );
};

export default Hero;