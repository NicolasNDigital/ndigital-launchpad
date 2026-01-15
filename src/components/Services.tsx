import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight } from "lucide-react";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const mainServices = [
    {
      number: "01",
      title: "Site Vitrine Complet",
      price: "900€",
      badge: "POPULAIRE",
      features: [
        "Design moderne responsive",
        "Optimisation SEO local Strasbourg",
        "Formulaire de contact + intégrations",
        "Hébergement & nom de domaine",
        "Google My Business optimisé",
        "Livraison sous 14 jours max",
        "Formation prise en main",
        "Support 30 jours inclus",
      ],
      cta: "Choisir cette offre",
      featured: false,
    },
    {
      number: "02",
      title: "Pack Site + Google Ads",
      price: "1 500€",
      originalPrice: "1 600€",
      badge: "MEILLEURE VALEUR",
      features: [
        "Tout du Site Vitrine Pro",
        "Campagne Google Ads configurée",
        "Ciblage géographique Strasbourg",
        "Mots-clés optimisés métier",
        "Tracking conversions installé",
        "2 mois de gestion Ads incluse",
        "Rapports de performance",
        "Optimisations continues",
      ],
      cta: "Booster mon business",
      featured: true,
    },
    {
      number: "03",
      title: "Site Multi-Pages ou E-commerce",
      price: "Sur devis",
      badge: "AVANCÉ",
      features: [
        "Site multi-pages illimité",
        "Boutique en ligne complète",
        "Tunnels de vente optimisés",
        "Formulaires interactifs avancés",
        "Intégration paiement (Stripe, PayPal)",
        "Gestion catalogue produits",
        "Espace client / membre",
        "Automatisations sur-mesure",
      ],
      cta: "Discutons de votre projet",
      featured: false,
    },
  ];

  const additionalServices = [
    "Identité visuelle & branding",
    "Rédaction contenu SEO",
    "Audit site existant",
    "Refonte/migration site",
    "Application mobile no-code",
    "Automatisations IA",
    "Consulting stratégie digitale",
  ];

  return (
    <section ref={ref} id="services" className="py-24 md:py-32 bg-muted relative">
      {/* Decorative pattern */}
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
            <span className="font-heading text-sm tracking-[0.3em] uppercase">Offres</span>
            <div className="w-16 h-[2px] bg-foreground" />
          </div>
          <h2 className="section-title">
            MES SERVICES
          </h2>
          <p className="section-subtitle mt-6">
            Des solutions claires et transparentes pour propulser votre business local
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-0 max-w-6xl mx-auto border-2 border-foreground">
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`p-8 relative ${
                index !== 2 ? "border-b-2 md:border-b-0 md:border-r-2 border-foreground" : ""
              } ${service.featured ? "bg-foreground text-background" : "bg-background"}`}
            >
              {/* Badge */}
              {service.badge && (
                <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-heading tracking-wider ${
                  service.featured ? "bg-background text-foreground" : "bg-foreground text-background"
                }`}>
                  {service.badge}
                </div>
              )}

              {/* Number */}
              <p className={`font-heading text-6xl mb-6 ${service.featured ? "text-background/20" : "text-foreground/10"}`}>
                {service.number}
              </p>

              {/* Title */}
              <h3 className="text-2xl font-heading tracking-wider mb-4">{service.title}</h3>

              {/* Price */}
              <div className="mb-8">
                <span className="text-4xl font-heading tracking-wide">
                  {service.price}
                </span>
                {service.originalPrice && (
                  <span className={`ml-3 line-through ${service.featured ? "text-background/50" : "text-muted-foreground"}`}>
                    {service.originalPrice}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${service.featured ? "text-background" : ""}`} />
                    <span className={service.featured ? "text-background/80" : ""}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a 
                href="#contact" 
                className={`w-full justify-center group ${service.featured ? "btn-secondary" : "btn-primary"}`}
              >
                {service.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 max-w-4xl mx-auto text-center"
        >
          <h3 className="font-heading text-2xl tracking-wider mb-8">
            SERVICES ADDITIONNELS
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {additionalServices.map((service, index) => (
              <span
                key={index}
                className="px-6 py-3 border-2 border-foreground font-heading text-sm tracking-wider hover:bg-foreground hover:text-background transition-colors cursor-default"
              >
                {service}
              </span>
            ))}
          </div>
          <a href="#contact" className="inline-block mt-8 font-heading text-sm tracking-wider underline underline-offset-4 hover:no-underline">
            DISCUTONS DE VOS BESOINS →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;