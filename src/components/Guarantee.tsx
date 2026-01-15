import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, ArrowRight } from "lucide-react";

const Guarantee = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timeline = [
    { day: "J1-3", label: "Direction artistique" },
    { day: "J4-10", label: "Développement" },
    { day: "J11-13", label: "Validation" },
    { day: "J14", label: "Mise en ligne 🚀" },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-background/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning text-foreground text-xs font-medium">
            <Zap className="w-3 h-3" />
            Garantie unique
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-center mt-8 mb-8"
        >
          2 semaines ou <span className="italic text-warning">-20%</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-background/70 text-center max-w-3xl mx-auto mb-16 font-light leading-relaxed"
        >
          Je m'engage sur un délai maximum de <strong className="text-background">14 jours</strong> entre votre commande et la mise en ligne.
          Si je dépasse : <strong className="text-warning">réduction automatique de 20%</strong>. 
          Aucune excuse, juste un engagement ferme.
        </motion.p>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4">
            {timeline.map((step, index) => (
              <div key={index} className="flex flex-col items-center relative flex-1">
                {/* Line connector */}
                {index < timeline.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-1/2 w-full h-px bg-background/20" />
                )}
                
                {/* Circle */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                  index === timeline.length - 1 
                    ? "bg-warning text-foreground" 
                    : "bg-background/10 text-background"
                }`}>
                  <span className="text-sm font-medium">{index + 1}</span>
                </div>
                
                {/* Label */}
                <div className="mt-4 text-center">
                  <p className={`font-heading text-lg ${index === timeline.length - 1 ? "text-warning" : "text-background"}`}>
                    {step.day}
                  </p>
                  <p className="text-background/50 text-sm mt-1 font-light">{step.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a href="#contact" className="btn-secondary group">
            Tester ma rapidité
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Guarantee;
