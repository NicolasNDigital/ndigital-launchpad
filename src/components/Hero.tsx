import { motion } from "framer-motion";
import { ArrowRight, Clock, Euro, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 bg-background overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent" />
      
      {/* Decorative circles */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-muted/50 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-muted/30 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="badge-pill">
              Création de sites pour artisans & commerces
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-light leading-[1.1] mb-8"
          >
            Votre site web
            <br />
            <span className="italic">professionnel</span>
            <br />
            en 2 semaines
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            Sites vitrines élégants pour artisans, commerçants et indépendants.
            <br />
            Design moderne, optimisé pour Google, livré en 14 jours.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <a href="#contact" className="btn-primary group">
              Demander un devis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            className="flex flex-wrap justify-center gap-8 md:gap-16"
          >
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-muted/50">
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-heading text-2xl">14 jours</p>
                <p className="text-xs text-muted-foreground">Délai maximum</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-muted/50">
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center">
                <Euro className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-heading text-2xl">Dès 900€</p>
                <p className="text-xs text-muted-foreground">Tarif transparent</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-muted/50">
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-heading text-2xl">Strasbourg</p>
                <p className="text-xs text-muted-foreground">Expert local</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-2">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 rounded-full bg-foreground/40"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
