import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const faqs = [
    {
      question: "Que se passe-t-il si vous dépassez les 2 semaines ?",
      answer: "-20% de réduction automatique sur votre facture. Aucune négociation, c'est ma garantie. Ça ne m'est arrivé qu'une seule fois en 18 mois (imprévu technique majeur).",
    },
    {
      question: "Qu'est-ce qui est inclus exactement dans les 900€ ?",
      answer: "Design complet, développement, hébergement 1 an, nom de domaine, SSL, SEO on-page, Google My Business, formulaires de contact, intégrations (Planity, réseaux sociaux...), formation, support 30 jours.",
    },
    {
      question: "Les campagnes Google Ads, c'est quoi exactement ?",
      answer: "Je configure votre campagne publicitaire sur Google (mots-clés, ciblage géographique, annonces, tracking). Vous apparaissez en haut des résultats Google quand quelqu'un cherche votre service à Strasbourg. Budget pub : à définir (min 300€/mois recommandé).",
    },
    {
      question: "Dois-je avoir du contenu prêt (textes, photos) ?",
      answer: "Non. Je rédige les textes optimisés SEO. Pour les photos, si vous n'en avez pas, j'utilise des banques d'images premium ou IA. Idéalement : quelques photos authentiques de vous/votre activité font toujours la différence.",
    },
    {
      question: "Mon secteur est très concurrentiel, puis-je vraiment me positionner ?",
      answer: "Oui, avec la bonne stratégie. SEO local + Google Ads = combinaison gagnante. Je vous positionne sur des mots-clés de longue traîne moins concurrentiels mais qualifiés (\"plombier urgence Neudorf\" plutôt que juste \"plombier Strasbourg\").",
    },
    {
      question: "Faites-vous aussi des sites e-commerce ?",
      answer: "Oui ! Je propose des sites multi-pages et e-commerce complets avec tunnels de vente, paiements intégrés et automatisations. Demandez un devis personnalisé.",
    },
    {
      question: "Proposez-vous un support après les 30 jours inclus ?",
      answer: "Oui, le support est inclus pendant 1 an. Vous pouvez me contacter pour toute question ou modification mineure de votre site.",
    },
    {
      question: "Travaillez-vous uniquement sur Strasbourg ?",
      answer: "Je suis basé à Strasbourg et expert en SEO local alsacien, mais je travaille partout en France. Pour le SEO local hors Strasbourg, je m'adapte à votre zone géographique.",
    },
    {
      question: "Puis-je payer en plusieurs fois ?",
      answer: "Oui : 50% à la commande, 50% à la livraison. Pour le Pack Ads (1500€) : 3x 500€ possible.",
    },
    {
      question: "Que se passe-t-il si je ne suis pas satisfait ?",
      answer: "2 aller-retours de modifications inclus pendant la phase de validation. Si vraiment aucun terrain d'entente, je rembourse 50% (ça ne m'est jamais arrivé, mes clients sont toujours ravis).",
    },
  ];

  return (
    <section ref={ref} id="faq" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-pill mb-6">FAQ</span>
          <h2 className="section-title">
            Questions <span className="italic">fréquentes</span>
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-muted/30 rounded-2xl px-6 border-0 data-[state=open]:bg-muted/50 transition-colors"
              >
                <AccordionTrigger className="text-left font-heading text-lg hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
