import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X, ArrowRight, Palette, Camera, FileText, Video, Calendar } from "lucide-react";

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { name: "Design moderne responsive", site: true, pack: true },
    { name: "Optimisation SEO local", site: true, pack: true },
    { name: "Hébergement + Domaine 1 an", site: true, pack: true },
    { name: "SSL + Sécurité", site: true, pack: true },
    { name: "Formulaire contact", site: true, pack: true },
    { name: "Google My Business", site: true, pack: true },
    { name: "Formation prise en main", site: true, pack: true },
    { name: "Support 30 jours", site: true, pack: true },
    { name: "Livraison ≤14 jours", site: true, pack: true },
    { name: "Campagne Google Ads", site: false, pack: true },
    { name: "Gestion Ads 2 mois", site: false, pack: true },
    { name: "Tracking conversions", site: false, pack: true },
    { name: "Rapports mensuels", site: false, pack: true },
    { name: "Optimisations continues", site: false, pack: true },
  ];

  const addons = [
    { icon: Palette, name: "Logo professionnel", price: "+200€", color: "text-vibrant-violet" },
    { icon: Camera, name: "Shooting photo", price: "+400€", color: "text-electric-blue" },
    { icon: FileText, name: "Rédaction contenu avancé", price: "+150€", color: "text-neon-cyan" },
    { icon: Video, name: "Vidéo présentation", price: "+600€", color: "text-warning" },
    { icon: Calendar, name: "Intégration réservation", price: "+100€", color: "text-success" },
  ];

  return (
    <section ref={ref} id="tarifs" className="py-20 md:py-32 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Tarifs Transparents — <span className="gradient-text">Sans Surprises</span>
          </h2>
        </motion.div>

        {/* Pricing Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-3xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-gradient-primary text-white">
              <div className="p-6 font-heading font-bold">Ce qui est inclus</div>
              <div className="p-6 text-center border-l border-white/20">
                <p className="font-heading font-bold text-lg">Site Vitrine</p>
                <p className="text-3xl font-bold mt-1">900€</p>
              </div>
              <div className="p-6 text-center border-l border-white/20 bg-white/10">
                <p className="font-heading font-bold text-lg">Pack Acquisition</p>
                <p className="text-3xl font-bold mt-1">1 500€</p>
              </div>
            </div>

            {/* Features */}
            <div className="divide-y divide-border">
              {features.map((feature, index) => (
                <div key={index} className="grid grid-cols-3">
                  <div className="p-4 text-sm">{feature.name}</div>
                  <div className="p-4 flex justify-center items-center border-l border-border">
                    {feature.site ? (
                      <Check className="w-5 h-5 text-success" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="p-4 flex justify-center items-center border-l border-border bg-primary/5">
                    <Check className="w-5 h-5 text-success" />
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-3 border-t-2 border-border">
              <div className="p-6"></div>
              <div className="p-6 border-l border-border">
                <a href="#contact" className="btn-primary w-full justify-center text-sm">
                  Choisir
                </a>
              </div>
              <div className="p-6 border-l border-border bg-primary/5">
                <a href="#contact" className="btn-orange w-full justify-center text-sm">
                  Choisir
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Add-ons - Redesigned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <h3 className="text-xl font-heading font-bold mb-8 text-center">
            Personnalisez votre projet
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {addons.map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="group bg-card rounded-2xl p-5 border border-border hover:border-primary/30 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-background to-muted flex items-center justify-center mb-3 ${addon.color}`}>
                  <addon.icon className="w-5 h-5" />
                </div>
                <p className="font-medium text-sm mb-2">{addon.name}</p>
                <p className="text-lg font-bold gradient-text">{addon.price}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a href="#contact" className="btn-primary text-lg group">
            Demander mon devis personnalisé
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;