import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, ArrowRight } from "lucide-react";

const Urgency = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const slots = [
    { id: 1, status: "available", label: "Disponible" },
    { id: 2, status: "available", label: "Disponible" },
    { id: 3, status: "reserved", label: "Réservé" },
    { id: 4, status: "available", label: "Disponible" },
    { id: 5, status: "complete", label: "Complet" },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-warning relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
          backgroundSize: "32px 32px"
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-xs font-medium mb-6">
            <Clock className="w-3 h-3" />
            Offre limitée
          </span>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-foreground mb-4">
            4 créneaux disponibles ce mois-ci
          </h2>

          {/* Description */}
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-10 font-light">
            Pour garantir la qualité et le respect des délais, je ne prends que 4-5 projets par mois.
            <br />
            Les créneaux se remplissent vite. Réservez le vôtre.
          </p>

          {/* Slots */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm transition-all ${
                  slot.status === "available"
                    ? "bg-success text-background"
                    : slot.status === "reserved"
                    ? "bg-foreground/20 text-foreground"
                    : "bg-foreground/10 text-foreground/50"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${
                  slot.status === "available"
                    ? "bg-background"
                    : slot.status === "reserved"
                    ? "bg-foreground"
                    : "bg-foreground/30"
                }`} />
                Créneau {slot.id} : {slot.label}
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="btn-primary group"
          >
            Réserver mon créneau
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Urgency;
