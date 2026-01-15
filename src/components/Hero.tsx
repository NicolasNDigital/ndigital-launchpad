import { motion } from "framer-motion";
import { ArrowRight, Clock, Euro, MapPin, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 bg-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        {/* Warm gradient orbs */}
        <div className="absolute top-20 right-1/4 w-[600px] h-[600px] rounded-full bg-tertiary/10 blur-[100px]" />
        <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] rounded-full bg-tertiary/5 blur-[80px]" />
        
        {/* Decorative lines */}
        <div className="absolute top-1/3 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-tertiary/20 to-transparent" />
        <div className="absolute top-2/3 right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-tertiary/20 to-transparent" />
        
        {/* Floating dots */}
        <motion.div 
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 left-[15%] w-2 h-2 rounded-full bg-tertiary/40"
        />
        <motion.div 
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/3 right-[20%] w-3 h-3 rounded-full bg-tertiary/30"
        />
        <motion.div 
          animate={{ y: [-5, 15, -5] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-1/3 left-[10%] w-2 h-2 rounded-full bg-tertiary/50"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tag with icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="badge-pill">
              <Sparkles className="w-3 h-3 text-tertiary" />
              Création de sites pour artisans & commerces
            </span>
          </motion.div>

          {/* Main heading with accent */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-light leading-[1.1] mb-8"
          >
            Votre site web
            <br />
            <span className="italic text-tertiary">professionnel</span>
            <br />
            en 2 semaines
          </motion.h1>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-px bg-tertiary mx-auto mb-8"
          />

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

          {/* Stats with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 md:gap-10"
          >
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-background border border-border hover:border-tertiary/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-tertiary" />
              </div>
              <div className="text-left">
                <p className="font-heading text-2xl">14 jours</p>
                <p className="text-xs text-muted-foreground">Délai maximum</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-background border border-border hover:border-tertiary/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center">
                <Euro className="w-5 h-5 text-tertiary" />
              </div>
              <div className="text-left">
                <p className="font-heading text-2xl">Dès 900€</p>
                <p className="text-xs text-muted-foreground">Tarif transparent</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-background border border-border hover:border-tertiary/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-tertiary" />
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
        <div className="w-6 h-10 rounded-full border-2 border-tertiary/30 flex items-start justify-center p-2">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 rounded-full bg-tertiary"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;