import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check, ArrowRight } from "lucide-react";

const ProblemSolution = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    "Pas de site web = invisible en ligne en 2026",
    "Site vieillot qui fait fuir les clients",
    "Projet web qui traîne depuis des mois",
    "Agences qui facturent 5000€+ pour un site basique",
    "Pas de visibilité sur Google Maps",
    "Téléphone qui ne sonne plus",
  ];

  const solutions = [
    "Site vitrine moderne en 14 jours maximum",
    "Design professionnel qui inspire confiance",
    "Livraison express garantie ou -20% de réduction",
    "Tarif fixe 900€, transparent, sans surprise",
    "SEO local (référencement Google) pour Strasbourg ou votre ville",
    "Campagnes Google Ads qui génèrent des appels",
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
          <span className="badge-pill mb-6">Le constat</span>
          <h2 className="section-title">
            Votre entreprise mérite
            <br />
            <span className="italic text-muted-foreground">mieux qu'un site amateur</span>
          </h2>
        </motion.div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Problem Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-dark"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center">
                <X className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-heading">Le problème</h3>
            </div>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-3 text-background/70"
                >
                  <X className="w-4 h-4 mt-1 flex-shrink-0 opacity-50" />
                  <span className="font-light">{problem}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solution Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-outline"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-heading">La solution</h3>
            </div>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <Check className="w-4 h-4 mt-1 flex-shrink-0 text-success" />
                  <span className="font-light">{solution}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a href="#contact" className="btn-primary group">
            Je veux ma solution
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;
