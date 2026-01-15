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
  ];

  const addons = [
    { icon: Palette, name: "Logo professionnel", price: "+200€" },
    { icon: Camera, name: "Shooting photo", price: "+400€" },
    { icon: FileText, name: "Rédaction avancée", price: "+150€" },
    { icon: Video, name: "Vidéo présentation", price: "+600€" },
    { icon: Calendar, name: "Intégration réservation", price: "+100€" },
  ];

  return (
    <section ref={ref} id="tarifs" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-pill mb-6">Tarifs</span>
          <h2 className="section-title">
            Tarifs <span className="italic">transparents</span>
          </h2>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16"
        >
          {/* Site Vitrine */}
          <div className="card-outline">
            <h3 className="font-heading text-2xl mb-2">Site Vitrine</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-heading text-5xl">900€</span>
            </div>
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  {feature.site ? (
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-muted-foreground/30 flex-shrink-0" />
                  )}
                  <span className={`text-sm font-light ${!feature.site && "text-muted-foreground/50"}`}>
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn-outline w-full justify-center">
              Choisir
            </a>
          </div>

          {/* Pack Acquisition */}
          <div className="card-dark relative">
            <div className="absolute -top-3 right-8 badge-pill bg-warning text-foreground">
              Recommandé
            </div>
            <h3 className="font-heading text-2xl mb-2">Pack Acquisition</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-heading text-5xl">1 500€</span>
              <span className="text-background/50 line-through">1 600€</span>
            </div>
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-background/70 flex-shrink-0" />
                  <span className="text-sm font-light text-background/80">
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn-secondary w-full justify-center">
              Choisir
            </a>
          </div>
        </motion.div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="font-heading text-2xl text-center mb-8">
            Options supplémentaires
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {addons.map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                className="card-elegant text-center group cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4 group-hover:bg-foreground group-hover:text-background transition-colors">
                  <addon.icon className="w-5 h-5" />
                </div>
                <p className="text-sm font-light mb-2">{addon.name}</p>
                <p className="font-heading text-xl">{addon.price}</p>
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
          <a href="#contact" className="btn-primary group">
            Demander un devis personnalisé
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
