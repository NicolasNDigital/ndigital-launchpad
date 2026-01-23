import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, Check, ArrowRight } from "lucide-react";

const ProblemSolution = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const rotatingData = [
    { metier: "Plombier", action: "trouver" },
    { metier: "Coiffeur", action: "choisir" },
    { metier: "Avocat", action: "contacter" },
    { metier: "Électricien", action: "appeler" },
    { metier: "Agent immo", action: "faire confiance" },
    { metier: "Garagiste", action: "engager" },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingData.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const problems = [
    "Pas de site web = invisible en ligne en 2026",
    "Site vieillot qui fait fuir les clients",
    "Projet web qui traîne depuis des mois",
    "Agences qui facturent 2000€+ pour un site basique",
    "Pas de visibilité sur Google Maps",
    "Téléphone qui ne sonne plus",
  ];

  const solutions = [
    "Site vitrine moderne en 14 jours maximum",
    "Design professionnel qui inspire confiance",
    "Livraison express garantie ou remboursé -20%",
    "Tarif fixe 600€, transparent, sans surprise",
    "SEO local (référencement Google) optimisé pour Strasbourg ou votre ville",
    "Campagnes Google Ads qui génèrent des appels",
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold leading-tight max-w-4xl mx-auto">
            Quand les internautes cherchent un{" "}
            <span className="gradient-text inline-block min-w-[130px] sm:min-w-[150px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`metier-${currentIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="inline-block font-bold"
                >
                  {rotatingData[currentIndex].metier}
                </motion.span>
              </AnimatePresence>
            </span>
            ,
            <br className="block" />
            ils doivent vous{" "}
            <span className="gradient-text inline-block min-w-[100px] sm:min-w-[140px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`action-${currentIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                  className="inline-block font-bold"
                >
                  {rotatingData[currentIndex].action}
                </motion.span>
              </AnimatePresence>
            </span>
            .
            <br className="hidden md:block" />
            <span className="text-muted-foreground font-normal text-xl md:text-2xl block mt-6">
              On vous crée un site clair et élégant, optimisé pour Google et qui travaille pour vous 24h/24 avec{" "}
              <span className="gradient-text font-semibold">30 jours de modifications offertes</span>.
            </span>
          </h2>
        </motion.div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Problem Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                <X className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-destructive">Le problème</h3>
            </div>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{problem}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solution Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-primary p-[2px] rounded-2xl"
          >
            <div className="bg-background rounded-2xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-bold gradient-text">La solution</h3>
              </div>
              <ul className="space-y-4">
                {solutions.map((solution, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{solution}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a href="#contact" className="btn-primary text-lg group">
            Je veux ma solution
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;
