import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, Check } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Demande envoyée ! Je vous réponds sous 24h.");
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section ref={ref} id="contact" className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-background/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-background/3 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 text-background text-xs font-medium mb-6">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light mb-6">
            Lancez votre <span className="italic">projet</span>
          </h2>
          <p className="text-lg text-background/60 font-light">
            Devis gratuit sous 24h. Parlons de votre business.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-background/5 backdrop-blur-sm rounded-3xl p-8">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-background/50 text-sm mb-2 font-light">Nom Prénom *</label>
                  <input
                    type="text"
                    required
                    className="input-dark"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <label className="block text-background/50 text-sm mb-2 font-light">Email *</label>
                  <input
                    type="email"
                    required
                    className="input-dark"
                    placeholder="jean@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-background/50 text-sm mb-2 font-light">Téléphone *</label>
                  <input
                    type="tel"
                    required
                    className="input-dark"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <div>
                  <label className="block text-background/50 text-sm mb-2 font-light">Entreprise *</label>
                  <input
                    type="text"
                    required
                    className="input-dark"
                    placeholder="Plomberie Martin"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-background/50 text-sm mb-2 font-light">Projet</label>
                  <select className="input-dark">
                    <option value="">Choisir...</option>
                    <option value="site">Site vitrine simple</option>
                    <option value="pack">Pack Site + Google Ads</option>
                    <option value="ecommerce">Site multi-pages / E-commerce</option>
                    <option value="refonte">Refonte site existant</option>
                    <option value="autre">Autre besoin digital</option>
                  </select>
                </div>
                <div>
                  <label className="block text-background/50 text-sm mb-2 font-light">Ville *</label>
                  <input
                    type="text"
                    required
                    className="input-dark"
                    placeholder="Strasbourg"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-background/50 text-sm mb-2 font-light">Votre projet *</label>
                <textarea
                  required
                  rows={4}
                  className="input-dark resize-none"
                  placeholder="Décrivez votre activité et vos objectifs..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-background/50 text-sm mb-2 font-light">Délai souhaité</label>
                <select className="input-dark">
                  <option value="">Choisir...</option>
                  <option value="urgent">Urgent (moins de 1 semaine)</option>
                  <option value="month">Ce mois-ci</option>
                  <option value="later">Dans 1-2 mois</option>
                  <option value="estimate">Simple estimation</option>
                </select>
              </div>

              {/* RGPD Notice */}
              <div className="mb-6 text-xs text-background/40 font-light leading-relaxed">
                <p>
                  Vos données sont collectées par NDigital pour répondre à votre demande (mesures pré-contractuelles).
                  Elles sont conservées 3 ans après le dernier contact et ne sont partagées avec aucun tiers.
                  Vous disposez d'un droit d'accès, rectification, effacement et portabilité. Contact : contact@ndigital.fr
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 font-medium text-sm tracking-wider bg-background text-foreground rounded-full transition-all duration-300 hover:opacity-90 disabled:opacity-70"
              >
                {isSubmitting ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    Envoyer ma demande
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Reassurance */}
              <div className="mt-6 flex flex-wrap gap-4 justify-center text-background/50 text-sm font-light">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> Réponse 24h
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> Devis gratuit
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> Appel offert
                </span>
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-4">
              {/* Phone */}
              <a
                href="tel:0689129955"
                className="flex items-center gap-6 p-6 rounded-2xl bg-background/5 hover:bg-background/10 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-background/10 flex items-center justify-center group-hover:bg-background group-hover:text-foreground transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-background/50 text-sm font-light">Téléphone</p>
                  <p className="text-xl font-heading">06 89 12 99 55</p>
                  <p className="text-background/40 text-sm font-light">Lun-Ven 9h-19h</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:contact@ndigital.fr"
                className="flex items-center gap-6 p-6 rounded-2xl bg-background/5 hover:bg-background/10 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-background/10 flex items-center justify-center group-hover:bg-background group-hover:text-foreground transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-background/50 text-sm font-light">Email</p>
                  <p className="text-xl font-heading">contact@ndigital.fr</p>
                  <p className="text-background/40 text-sm font-light">Réponse sous 24h</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-center gap-6 p-6 rounded-2xl bg-background/5">
                <div className="w-14 h-14 rounded-2xl bg-background/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-background/50 text-sm font-light">Bureau</p>
                  <p className="text-lg font-heading">2 Quai Fustel-de-Coulanges</p>
                  <p className="text-background/60">67000 Strasbourg</p>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/33689129955"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 p-6 rounded-2xl bg-background/5 hover:bg-background/10 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-background/10 flex items-center justify-center group-hover:bg-background group-hover:text-foreground transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-background/50 text-sm font-light">WhatsApp</p>
                  <p className="text-xl font-heading">Message rapide</p>
                  <p className="text-background/40 text-sm font-light">Réponse encore plus rapide</p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
