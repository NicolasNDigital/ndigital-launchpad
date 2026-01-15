import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, TrendingUp } from "lucide-react";

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      name: "Eric Plomberie Sanitaire",
      sector: "Plomberie",
      result: "+40% d'appels en 2 mois",
      tags: ["SEO local", "Site vitrine", "Strasbourg"],
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      name: "ZEUS Coiffeur",
      sector: "Coiffure barbier",
      result: "Réservations Planity x3",
      tags: ["Branding", "Site vitrine", "Note 4,8★"],
      gradient: "from-amber-500 to-yellow-400",
    },
    {
      name: "Auto-École Simon",
      sector: "Formation",
      result: "+60% inscriptions web",
      tags: ["SEO local", "Conversion", "Note 4,8★"],
      gradient: "from-green-500 to-emerald-400",
    },
    {
      name: "RMAB Plomberie",
      sector: "Plomberie urgence",
      result: "1er page Google en 3 semaines",
      tags: ["SEO agressif", "Urgence", "Strasbourg"],
      gradient: "from-red-500 to-orange-400",
    },
    {
      name: "Garage de Belfort",
      sector: "Mécanique auto",
      result: "+50% demandes devis",
      tags: ["Site vitrine", "Google Ads", "Note 4,9★"],
      gradient: "from-purple-500 to-pink-400",
    },
    {
      name: "David Kodat",
      sector: "Barbier premium",
      result: "Note parfaite 5,0★ maintenue",
      tags: ["Branding", "Design", "Élégance"],
      gradient: "from-gray-700 to-gray-500",
    },
  ];

  return (
    <section ref={ref} id="realisations" className="py-20 md:py-32 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Mes Dernières <span className="gradient-text">Créations</span>
          </h2>
          <p className="section-subtitle">
            Des projets concrets avec des résultats mesurables
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image placeholder with gradient */}
              <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-6xl font-heading font-bold opacity-20">
                    {project.name.charAt(0)}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <ExternalLink className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-heading font-bold">{project.name}</h3>
                  <span className="text-xs text-muted-foreground">{project.sector}</span>
                </div>

                {/* Result */}
                <div className="flex items-center gap-2 text-success mb-4">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">{project.result}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tIndex) => (
                    <span
                      key={tIndex}
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a href="#contact" className="btn-primary text-lg">
            Discuter de votre projet
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
