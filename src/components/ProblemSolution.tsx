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
    "Livraison express garantie ou remboursé -20%",
    "Tarif fixe 900€, transparent, sans surprise",
    "SEO local (référencement Google) optimisé pour Strasbourg ou votre ville",
    "Campagnes Google Ads qui génèrent des appels",
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-8 checkerboard opacity-5" />
      
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[2px] bg-foreground" />
            <span className="font-heading text-sm tracking-[0.3em] uppercase">Le constat</span>
            <div className="w-16 h-[2px] bg-foreground" />
          </div>
          <h2 className="section-title">
            VOTRE ENTREPRISE MÉRITE
            <br />
            <span className="text-muted-foreground">MIEUX QU'UN SITE AMATEUR</span>
          </h2>
        </motion.div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-0 max-w-5xl mx-auto border-2 border-foreground">
          {/* Problem Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 md:p-12 bg-foreground text-background"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 border-2 border-background flex items-center justify-center">
                <X className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-heading tracking-wider">
                LE PROBLÈME
              </h3>
            </div>
            <ul className="space-y-5">
              {problems.map((problem, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <X className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-60" />
                  <span className="text-background/80">{problem}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solution Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 md:p-12 bg-background border-t-2 md:border-t-0 md:border-l-2 border-foreground"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-heading tracking-wider">
                LA SOLUTION
              </h3>
            </div>
            <ul className="space-y-5">
              {solutions.map((solution, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">{solution}</span>
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
          className="text-center mt-16"
        >
          <a href="#contact" className="btn-primary group">
            Je veux ma solution
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;