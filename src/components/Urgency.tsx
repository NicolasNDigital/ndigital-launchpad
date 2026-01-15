import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, ArrowRight } from "lucide-react";

const Urgency = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const slots = [
    { id: 1, status: "available", label: "DISPONIBLE" },
    { id: 2, status: "available", label: "DISPONIBLE" },
    { id: 3, status: "reserved", label: "RÉSERVÉ" },
    { id: 4, status: "available", label: "DISPONIBLE" },
    { id: 5, status: "complete", label: "COMPLET" },
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 bg-warning relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deep-black text-white text-sm font-bold mb-6">
            <Clock className="w-4 h-4" />
            OFFRE LIMITÉE
          </span>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-deep-black mb-4">
            4 Créneaux Disponibles Ce Mois-Ci
          </h2>

          {/* Description */}
          <p className="text-lg text-deep-black/80 max-w-2xl mx-auto mb-10">
            Pour garantir la qualité et le respect des délais, je ne prends que 4-5 projets par mois maximum.
            <br />
            Les créneaux de ce mois se remplissent vite. Réservez le vôtre avant qu'il ne soit trop tard.
          </p>

          {/* Slots */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${
                  slot.status === "available"
                    ? "bg-success-green text-white"
                    : slot.status === "reserved"
                    ? "bg-amber-400 text-deep-black"
                    : "bg-deep-black/20 text-deep-black/60"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${
                  slot.status === "available"
                    ? "bg-white"
                    : slot.status === "reserved"
                    ? "bg-deep-black"
                    : "bg-deep-black/40"
                }`} />
                Créneau {slot.id} : {slot.label}
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-deep-black text-white hover:bg-deep-black/90 transition-all group shadow-xl"
          >
            Réserver mon créneau maintenant
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Urgency;
