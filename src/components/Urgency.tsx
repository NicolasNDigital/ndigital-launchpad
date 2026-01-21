import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, ArrowRight, Check } from "lucide-react";

const Urgency = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const availableSlots = 3;
  const totalSlots = 5;
  const takenSlots = totalSlots - availableSlots;

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-br from-deep-black via-deep-black to-deep-black/95 relative overflow-hidden">
      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-hero opacity-20 blur-[100px] rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-bold mb-6 border border-white/20">
            <Clock className="w-4 h-4" />
            PLACES LIMITÉES
          </span>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Plus que <span className="gradient-text">{availableSlots} places</span> ce mois-ci
          </h2>

          {/* Description */}
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Pour garantir la qualité et le respect des délais, je limite mes projets à {totalSlots} par mois.
          </p>

          {/* Visual slots indicator */}
          <div className="flex justify-center items-center gap-3 mb-10">
            {Array.from({ length: totalSlots }).map((_, index) => {
              const isTaken = index < takenSlots;
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
                    isTaken
                      ? "bg-white/20 text-white/40 border border-white/10"
                      : "bg-gradient-primary text-white shadow-lg shadow-pink-500/30"
                  }`}
                >
                  {isTaken ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">Libre</span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mb-10 text-sm">
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-4 h-4 rounded bg-white/20 flex items-center justify-center">
                <Check className="w-3 h-3" />
              </div>
              <span>Réservé</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-4 h-4 rounded bg-gradient-primary" />
              <span>Disponible</span>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-gradient-primary text-white hover:opacity-90 transition-all group shadow-xl shadow-pink-500/20"
          >
            Réserver ma place
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Urgency;
