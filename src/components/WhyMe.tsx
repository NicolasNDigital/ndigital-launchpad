import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, MapPin, Lightbulb, BarChart3 } from "lucide-react";
import nicolasPhoto from "@/assets/nicolas-photo.png";

const WhyMe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    {
      icon: Rocket,
      title: "Technologies de Pointe",
      description: "J'utilise les derniers outils no-code (Lovable, Cursor) et IA pour créer des sites modernes à vitesse lumière, sans sacrifier la qualité.",
    },
    {
      icon: MapPin,
      title: "Expert Local Strasbourg",
      description: "Basé à Strasbourg, je connais parfaitement le marché alsacien, les quartiers, les recherches locales. Votre SEO local est entre de bonnes mains.",
    },
    {
      icon: Lightbulb,
      title: "Vision Créative",
      description: "Designer dans l'âme, je ne livre pas des sites templates. Chaque projet a son identité visuelle unique et impactante.",
    },
    {
      icon: BarChart3,
      title: "Orienté Résultats",
      description: "Un beau site c'est bien. Un site qui génère des clients c'est mieux. Je conçois pour la conversion et le ROI.",
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 bg-gradient-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title with Photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex flex-col items-center gap-6 mb-6">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <img 
                  src={nicolasPhoto} 
                  alt="Nicolas - Créateur de sites vitrines à Strasbourg" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-neon-cyan rounded-full flex items-center justify-center border-4 border-deep-black">
                <span className="text-lg">👋</span>
              </div>
            </div>
            <div>
              <p className="text-white/70 text-sm uppercase tracking-wider mb-2">Votre interlocuteur unique</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white">
                Pourquoi NDIGITAL ?
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="glass-light rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <reason.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">
                {reason.title}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16 max-w-3xl mx-auto"
        >
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            "Je ne suis pas une agence avec 50 clients. Je prends{" "}
            <strong className="text-white">4-5 projets par mois max</strong> pour
            garantir qualité et disponibilité. Votre projet mérite mon attention à
            100%."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyMe;
