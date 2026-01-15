import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight, Star, Zap, Layers } from "lucide-react";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const mainServices = [
    {
      icon: Zap,
      title: "Site Vitrine Complet",
      price: "900€",
      badge: "Populaire",
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
      icon: Star,
      title: "Pack Site + Google Ads",
      price: "1 500€",
      originalPrice: "1 600€",
      badge: "Meilleure valeur",
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
      icon: Layers,
      title: "Site Multi-Pages ou E-commerce",
      price: "Sur devis",
      badge: "Avancé",
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
    <section ref={ref} id="services" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-pill mb-6">Offres</span>
          <h2 className="section-title">
            Mes <span className="italic">services</span>
          </h2>
          <p className="section-subtitle mt-6">
            Des solutions claires et transparentes pour propulser votre business local
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                service.featured 
                  ? "bg-foreground text-background shadow-2xl scale-[1.02]" 
                  : "bg-background shadow-lg hover:shadow-xl"
              }`}
            >
              {/* Badge */}
              {service.badge && (
                <div className={`absolute -top-3 left-8 px-4 py-1.5 text-xs font-medium rounded-full ${
                  service.featured 
                    ? "bg-background text-foreground" 
                    : "bg-foreground text-background"
                }`}>
                  {service.badge}
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                service.featured ? "bg-background/10" : "bg-muted"
              }`}>
                <service.icon className="w-6 h-6" />
              </div>

              {/* Title & Price */}
              <h3 className="text-xl font-heading mb-2">{service.title}</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-heading">{service.price}</span>
                {service.originalPrice && (
                  <span className={`text-sm line-through ${service.featured ? "text-background/50" : "text-muted-foreground"}`}>
                    {service.originalPrice}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      service.featured ? "text-background/70" : "text-success"
                    }`} />
                    <span className={`text-sm font-light ${
                      service.featured ? "text-background/80" : "text-muted-foreground"
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  service.featured
                    ? "bg-background text-foreground hover:opacity-90"
                    : "bg-foreground text-background hover:opacity-90"
                }`}
              >
                {service.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h3 className="font-heading text-2xl mb-6">Services additionnels</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalServices.map((service, index) => (
              <span
                key={index}
                className="px-5 py-2.5 rounded-full bg-background border border-foreground/10 text-sm font-light hover:border-foreground/30 transition-colors cursor-default"
              >
                {service}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
