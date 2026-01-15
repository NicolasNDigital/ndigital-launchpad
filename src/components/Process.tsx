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
      title: "Premier contact",
      description: "Appel ou visio de 30 min pour comprendre votre activité, vos besoins et vos objectifs. Devis gratuit immédiat.",
    },
    {
      icon: Palette,
      day: "Jours 1-3",
      title: "Direction artistique",
      description: "Je définis votre identité visuelle, palette couleurs, style. Vous validez la maquette avant développement.",
    },
    {
      icon: Code,
      day: "Jours 4-10",
      title: "Développement",
      description: "Création du site avec technologies no-code/IA de pointe. Optimisation SEO locale intégrée dès le départ.",
    },
    {
      icon: CheckCircle,
      day: "Jours 11-13",
      title: "Validation",
      description: "Vous testez le site, je corrige les détails. 2 aller-retours de modifications inclus.",
    },
    {
      icon: Rocket,
      day: "Jour 14",
      title: "Mise en ligne",
      description: "Votre site est en ligne, visible sur Google. Formation prise en main + support 30 jours.",
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-pill mb-6">Processus</span>
          <h2 className="section-title">
            Comment <span className="italic">ça marche</span> ?
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative flex items-start gap-6 mb-8 last:mb-0"
            >
              {/* Timeline line */}
              {index < steps.length - 1 && (
                <div className="absolute left-7 top-16 w-px h-[calc(100%-2rem)] bg-foreground/10" />
              )}
              
              {/* Step icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                index === steps.length - 1 ? "bg-foreground text-background" : "bg-muted"
              }`}>
                <step.icon className="w-6 h-6" />
              </div>
              
              {/* Content */}
              <div className="flex-1 card-outline hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                  <span className="badge-pill text-xs w-fit">
                    {step.day}
                  </span>
                  <h3 className="text-xl font-heading">{step.title}</h3>
                </div>
                <p className="text-muted-foreground font-light">{step.description}</p>
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
          <div className="rounded-2xl bg-muted/50 p-6 text-center">
            <p className="text-lg font-light">
              🎯 <strong className="font-medium">Besoin du Pack Google Ads ?</strong>
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
