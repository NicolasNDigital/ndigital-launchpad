import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Palette, Code, CheckCircle, Rocket } from "lucide-react";

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: Phone,
      day: "Jour 0",
      title: "Premier Contact",
      emoji: "📞",
      description: "Échange téléphonique ou visio de 30 minutes : je découvre votre activité, vos attentes et vos objectifs. Vous repartez avec un devis détaillé gratuit sous 24h.",
    },
    {
      icon: Palette,
      day: "Jours 1-3",
      title: "Direction Artistique",
      emoji: "🎨",
      description: "Je définis votre identité visuelle, palette couleurs, style. Vous validez la maquette avant développement.",
    },
    {
      icon: Code,
      day: "Jours 4-10",
      title: "Développement",
      emoji: "💻",
      description: "Création du site avec technologies no-code/IA de pointe. Optimisation SEO locale intégrée dès le départ.",
    },
    {
      icon: CheckCircle,
      day: "Jours 11-13",
      title: "Validation & Ajustements",
      emoji: "✅",
      description: "Vous testez le site, je corrige les détails. 2 aller-retours de modifications inclus.",
    },
    {
      icon: Rocket,
      day: "Jour 14",
      title: "Mise en Ligne",
      emoji: "🚀",
      description: "Votre site est en ligne, visible sur Google. Formation prise en main + support 30 jours.",
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Comment <span className="gradient-text">Ça Marche</span> ?
          </h2>
          <p className="section-subtitle">
            Un processus simple et transparent en 5 étapes
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="relative flex items-start gap-6 mb-8 last:mb-0"
            >
              {/* Timeline line */}
              {index < steps.length - 1 && (
                <div className="absolute left-7 top-16 w-0.5 h-full bg-gradient-primary opacity-30" />
              )}
              
              {/* Step number */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-2xl">{step.emoji}</span>
              </div>
              
              {/* Content */}
              <div className="flex-1 bg-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-border">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                    {step.day}
                  </span>
                  <h3 className="text-xl font-heading font-bold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Ads note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <div className="bg-accent/50 border border-accent rounded-2xl p-6 text-center">
            <p className="text-lg">
              🎯 <strong>Besoin du Pack Google Ads ?</strong>
              <br />
              <span className="text-muted-foreground">
                Configuration campagne et lancement : Jours 15-16
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
