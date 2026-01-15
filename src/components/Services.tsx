import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Globe, 
  TrendingUp, 
  Palette, 
  Check,
  Flame,
  Star,
  ArrowRight
} from "lucide-react";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Globe,
      title: "Site Vitrine Complet",
      price: "900€",
      badge: "🔥 Populaire",
      badgeColor: "bg-warning text-warning-foreground",
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
      ctaStyle: "btn-primary",
    },
    {
      icon: TrendingUp,
      title: "Pack Site + Google Ads",
      price: "1 500€",
      originalPrice: "1 600€",
      badge: "⭐ Meilleure valeur",
      badgeColor: "bg-secondary text-secondary-foreground",
      features: [
        "Tout du Site Vitrine Pro",
        "+ Campagne Google Ads configurée",
        "+ Ciblage géographique Strasbourg",
        "+ Mots-clés optimisés métier",
        "+ Tracking conversions installé",
        "+ 2 mois de gestion Ads incluse",
        "+ Rapports de performance",
        "+ Optimisations continues",
      ],
      cta: "Booster mon business",
      ctaStyle: "btn-orange",
      featured: true,
    },
    {
      icon: Palette,
      title: "Services Additionnels",
      price: "Sur devis",
      badge: null,
      features: [
        "🎨 Identité visuelle & branding",
        "📝 Rédaction contenu SEO",
        "📊 Audit site existant",
        "🔧 Refonte/migration site",
        "📱 Application mobile no-code",
        "🤖 Automatisations IA",
        "📞 Consulting stratégie digitale",
      ],
      cta: "Discutons de votre projet",
      ctaStyle: "btn-outline border-foreground text-foreground hover:bg-foreground hover:text-background",
    },
  ];

  return (
    <section ref={ref} id="services" className="py-20 md:py-32 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Mes Services — <span className="gradient-text">Votre Succès Digital</span>
          </h2>
          <p className="section-subtitle">
            Des solutions claires et transparentes pour propulser votre business local
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                service.featured
                  ? "bg-gradient-primary p-[3px]"
                  : "bg-card shadow-lg hover:shadow-xl"
              }`}
            >
              {/* Featured wrapper */}
              <div className={service.featured ? "bg-card rounded-[21px] p-8 h-full" : ""}>
                {/* Badge */}
                {service.badge && (
                  <div className={`absolute -top-3 left-6 px-4 py-1.5 rounded-full text-sm font-semibold ${service.badgeColor}`}>
                    {service.badge}
                  </div>
                )}

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-heading font-bold mb-2">{service.title}</h3>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-heading font-bold gradient-text">
                    {service.price}
                  </span>
                  {service.originalPrice && (
                    <span className="ml-2 text-muted-foreground line-through">
                      {service.originalPrice}
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2 text-sm">
                      {feature.startsWith("✅") || feature.startsWith("+") ? (
                        <>
                          <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span>{feature.replace(/^[✅+]\s*/, "")}</span>
                        </>
                      ) : feature.match(/^[🎨📝📊🔧📱🤖📞]/) ? (
                        <span>{feature}</span>
                      ) : (
                        <>
                          <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a href="#contact" className={`${service.ctaStyle} w-full justify-center group`}>
                  {service.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
