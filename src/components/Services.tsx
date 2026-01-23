import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, TrendingUp, Layers, Check, ArrowRight, ShoppingCart, FileText, FormInput, Circle } from "lucide-react";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const mainServices = [
    {
      icon: Globe,
      title: "Site Pro Complet",
      price: "600€",
      badge: "🔥 Populaire",
      badgeColor: "bg-warning text-warning-foreground",
      features: [
        { text: "Design moderne responsive", checked: true },
        { text: "Optimisation SEO local Strasbourg", checked: true },
        { text: "Formulaire de contact + intégrations", checked: true },
        { text: "Hébergement & nom de domaine", checked: true },
        { text: "Google My Business optimisé", checked: true },
        { text: "Livraison sous 14 jours ou -20%", checked: true },
        { text: "30 jours de modifications offerts après la mise en ligne.", checked: true },
        { text: "Forfait fixe de 150€/an par la suite pour des évolutions illimitées", checked: false },
      ],
      cta: "Choisir cette offre",
      ctaStyle: "btn-primary",
    },
    {
      icon: TrendingUp,
      title: "Pack Site + Google Ads",
      price: "1 200€",
      badge: "⭐ Meilleure valeur",
      badgeColor: "bg-secondary text-secondary-foreground",
      features: [
        { text: "Tout du Site Vitrine Complet", checked: true },
        { text: "+ Campagne Google Ads configurée", checked: true },
        { text: "+ Ciblage géographique Strasbourg", checked: true },
        { text: "+ Mots-clés optimisés métier", checked: true },
        { text: "+ Tracking conversions installé", checked: true },
        { text: "+ 2 mois de gestion Ads incluse", checked: true },
        { text: "+ Rapports de performance", checked: true },
        { text: "+ Optimisations continues", checked: true },
      ],
      cta: "Booster mon business",
      ctaStyle: "btn-orange",
      featured: true,
    },
    {
      icon: Layers,
      title: "Site Multi-Pages ou E-commerce",
      price: "Sur devis",
      badge: "🛒 Avancé",
      badgeColor: "bg-neon-cyan/20 text-neon-cyan",
      features: [
        { text: "Site multi-pages illimité", checked: true },
        { text: "Boutique en ligne complète", checked: true },
        { text: "Tunnels de vente optimisés", checked: true },
        { text: "Formulaires interactifs avancés", checked: true },
        { text: "Intégration paiement (Stripe, PayPal)", checked: true },
        { text: "Gestion catalogue produits", checked: true },
        { text: "Espace client / membre", checked: true },
        { text: "Automatisations sur-mesure", checked: true },
      ],
      cta: "Discutons de votre projet",
      ctaStyle: "btn-primary",
    },
  ];

  const additionalServices = [
    { icon: "🎨", name: "Identité visuelle & branding" },
    { icon: "📝", name: "Rédaction contenu SEO" },
    { icon: "📊", name: "Audit site existant" },
    { icon: "🔧", name: "Refonte/migration site" },
    { icon: "📱", name: "Application mobile no-code" },
    { icon: "🤖", name: "Automatisations IA" },
    { icon: "📞", name: "Consulting stratégie digitale" },
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
            Un investissement maîtrisé, <span className="gradient-text">sans surprises</span>
          </h2>
          <p className="section-subtitle">Pas de frais cachés, pas d'abonnement surprise. Choisissez la formule adaptée à vos besoins pour être visible, inspirer confiance et transformer votre présence en ligne en une machine à trouver des clients.</p>
        </motion.div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                service.featured ? "bg-gradient-primary p-[2px]" : "bg-card shadow-lg hover:shadow-xl border border-border"
              }`}
            >
              {/* Featured wrapper */}
              <div className={service.featured ? "bg-card rounded-[22px] p-8 h-full" : ""}>
                {/* Badge */}
                {service.badge && (
                  <div
                    className={`absolute -top-3 left-6 px-4 py-1.5 rounded-full text-sm font-semibold ${service.badgeColor}`}
                  >
                    {service.badge}
                  </div>
                )}

                {/* Icon - Circle with gradient border */}
                <div className="w-16 h-16 rounded-full bg-gradient-primary p-[2px] mb-6">
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-heading font-bold mb-2">{service.title}</h3>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-heading font-bold gradient-text">{service.price}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2 text-sm">
                      {feature.checked ? (
                        <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      )}
                      <span>{feature.text.replace(/^[+]\s*/, "")}</span>
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

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-heading font-bold text-center mb-8">Services Additionnels</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border hover:border-primary/30 transition-colors"
              >
                <span>{service.icon}</span>
                <span className="text-sm font-medium">{service.name}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#contact" className="text-primary hover:underline font-medium">
              Discutons de vos besoins spécifiques →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
