import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Clock, ArrowRight } from "lucide-react";

const Guarantee = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timeline = [
    { day: "J1-3", label: "Direction artistique", status: "complete" },
    { day: "J4-10", label: "Développement", status: "complete" },
    { day: "J11-13", label: "Validation", status: "complete" },
    { day: "J14", label: "Mise en ligne 🚀", status: "current" },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 bg-deep-black text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="badge-pulse bg-warning text-deep-black text-sm">
            <Zap className="w-4 h-4" />
            GARANTIE UNIQUE
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mt-8 mb-8"
        >
          2 Semaines ou{" "}
          <span className="text-warning">-20% de Réduction</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/80 text-center max-w-3xl mx-auto mb-16"
        >
          Je m'engage sur un délai maximum de <strong className="text-white">14 jours</strong> entre votre commande et la mise en ligne de votre site.
          <br />
          Si je dépasse ce délai : <strong className="text-warning">-20% de réduction automatique</strong> sur votre facture.
          <br />
          Aucune excuse, aucun blabla. Juste un engagement ferme sur la rapidité.
        </motion.p>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
            {timeline.map((step, index) => (
              <div key={index} className="flex flex-col items-center relative flex-1">
                {/* Line connector */}
                {index < timeline.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-1/2 w-full h-1 bg-gradient-primary" />
                )}
                
                {/* Circle */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                  step.status === "current" 
                    ? "bg-warning text-deep-black" 
                    : "bg-gradient-primary text-white"
                }`}>
                  {step.status === "current" ? "🚀" : <Clock className="w-5 h-5" />}
                </div>
                
                {/* Label */}
                <div className="mt-4 text-center">
                  <p className={`font-bold ${step.status === "current" ? "text-warning" : "text-white"}`}>
                    {step.day}
                  </p>
                  <p className="text-white/60 text-sm mt-1">{step.label}</p>
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
          <a href="#contact" className="btn-outline border-white text-white hover:bg-warning hover:text-deep-black hover:border-warning text-lg group">
            Tester ma rapidité
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Guarantee;
