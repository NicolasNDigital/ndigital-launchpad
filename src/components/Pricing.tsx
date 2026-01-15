import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X, ArrowRight } from "lucide-react";

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
    { name: "Logo professionnel", price: "+200€" },
    { name: "Shooting photo", price: "+400€" },
    { name: "Rédaction contenu avancé", price: "+150€" },
    { name: "Vidéo présentation", price: "+600€" },
    { name: "Intégration réservation", price: "+100€" },
  ];

  return (
    <section ref={ref} id="tarifs" className="py-24 md:py-32 bg-muted relative">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-foreground" />
      
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
            <span className="font-heading text-sm tracking-[0.3em] uppercase">Tarifs</span>
            <div className="w-16 h-[2px] bg-foreground" />
          </div>
          <h2 className="section-title">
            TARIFS TRANSPARENTS
          </h2>
        </motion.div>

        {/* Pricing Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="border-2 border-foreground bg-background overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3">
              <div className="p-6 font-heading tracking-wider border-r-2 border-foreground">
                CE QUI EST INCLUS
              </div>
              <div className="p-6 text-center border-r-2 border-foreground">
                <p className="font-heading tracking-wider">SITE VITRINE</p>
                <p className="font-heading text-4xl mt-2">900€</p>
              </div>
              <div className="p-6 text-center bg-foreground text-background">
                <p className="font-heading tracking-wider">PACK ACQUISITION</p>
                <p className="font-heading text-4xl mt-2">1 500€</p>
              </div>
            </div>

            {/* Features */}
            <div>
              {features.map((feature, index) => (
                <div key={index} className="grid grid-cols-3 border-t-2 border-foreground">
                  <div className="p-4 text-sm border-r-2 border-foreground">{feature.name}</div>
                  <div className="p-4 flex justify-center items-center border-r-2 border-foreground">
                    {feature.site ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="p-4 flex justify-center items-center bg-foreground/5">
                    <Check className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-3 border-t-2 border-foreground">
              <div className="p-6 border-r-2 border-foreground"></div>
              <div className="p-6 border-r-2 border-foreground">
                <a href="#contact" className="btn-outline w-full justify-center text-sm py-3">
                  CHOISIR
                </a>
              </div>
              <div className="p-6 bg-foreground">
                <a href="#contact" className="btn-secondary w-full justify-center text-sm py-3">
                  CHOISIR
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <h3 className="font-heading text-2xl tracking-wider text-center mb-8">
            OPTIONS SUPPLÉMENTAIRES
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-0 border-2 border-foreground">
            {addons.map((addon, index) => (
              <div
                key={index}
                className={`p-6 text-center ${
                  index !== addons.length - 1 ? "border-r-2 border-foreground" : ""
                } hover:bg-foreground hover:text-background transition-colors`}
              >
                <p className="text-sm mb-2">{addon.name}</p>
                <p className="font-heading text-xl tracking-wider">{addon.price}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a href="#contact" className="btn-primary group">
            Demander un devis personnalisé
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;