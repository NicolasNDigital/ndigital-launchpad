import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, MapPin, Lightbulb, BarChart3 } from "lucide-react";

const WhyMe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    {
      icon: Rocket,
      title: "Technologies de pointe",
      description: "J'utilise les derniers outils no-code et IA pour créer des sites modernes à vitesse lumière, sans sacrifier la qualité.",
    },
    {
      icon: MapPin,
      title: "Expert local Strasbourg",
      description: "Basé à Strasbourg, je connais parfaitement le marché alsacien. Votre SEO local est entre de bonnes mains.",
    },
    {
      icon: Lightbulb,
      title: "Vision créative",
      description: "Designer dans l'âme, je ne livre pas des sites templates. Chaque projet a son identité visuelle unique.",
    },
    {
      icon: BarChart3,
      title: "Orienté résultats",
      description: "Un beau site c'est bien. Un site qui génère des clients c'est mieux. Je conçois pour la conversion.",
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-pill mb-6">Expertise</span>
          <h2 className="section-title">
            Pourquoi <span className="italic">NDigital</span> ?
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="card-elegant group"
            >
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:bg-foreground group-hover:text-background transition-colors">
                <reason.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed">
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
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed italic">
            "Je ne suis pas une agence avec 50 clients. Je prends{" "}
            <strong className="text-foreground font-medium">4-5 projets par mois</strong> pour garantir qualité et disponibilité. 
            Votre projet mérite mon attention à 100%."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyMe;
