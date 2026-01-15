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
      {/* Decorative pattern */}
      <div className="absolute inset-0 checkerboard-large opacity-[0.02]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[2px] bg-background" />
            <span className="font-heading text-sm tracking-[0.3em] uppercase">Contact</span>
            <div className="w-16 h-[2px] bg-background" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading tracking-wider mb-6">
            LANCEZ VOTRE PROJET
          </h2>
          <p className="text-lg text-background/70">
            Un site pro qui génère des clients ? Parlons-en. Devis gratuit sous 24h.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="border-2 border-background p-8">
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-background/70 text-sm mb-2 font-heading tracking-wider">NOM PRÉNOM *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-transparent border-2 border-background/30 text-background placeholder-background/40 focus:outline-none focus:border-background transition-colors"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <label className="block text-background/70 text-sm mb-2 font-heading tracking-wider">EMAIL *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-transparent border-2 border-background/30 text-background placeholder-background/40 focus:outline-none focus:border-background transition-colors"
                    placeholder="jean@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-background/70 text-sm mb-2 font-heading tracking-wider">TÉLÉPHONE *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 bg-transparent border-2 border-background/30 text-background placeholder-background/40 focus:outline-none focus:border-background transition-colors"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <div>
                  <label className="block text-background/70 text-sm mb-2 font-heading tracking-wider">ENTREPRISE *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-transparent border-2 border-background/30 text-background placeholder-background/40 focus:outline-none focus:border-background transition-colors"
                    placeholder="Plomberie Martin"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-background/70 text-sm mb-2 font-heading tracking-wider">PROJET</label>
                  <select
                    className="w-full px-4 py-3 bg-foreground border-2 border-background/30 text-background focus:outline-none focus:border-background transition-colors"
                  >
                    <option value="">Choisir...</option>
                    <option value="site">Site vitrine simple</option>
                    <option value="pack">Pack Site + Google Ads</option>
                    <option value="ecommerce">Site multi-pages / E-commerce</option>
                    <option value="refonte">Refonte site existant</option>
                    <option value="autre">Autre besoin digital</option>
                  </select>
                </div>
                <div>
                  <label className="block text-background/70 text-sm mb-2 font-heading tracking-wider">VILLE *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-transparent border-2 border-background/30 text-background placeholder-background/40 focus:outline-none focus:border-background transition-colors"
                    placeholder="Strasbourg"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-background/70 text-sm mb-2 font-heading tracking-wider">VOTRE PROJET *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-transparent border-2 border-background/30 text-background placeholder-background/40 focus:outline-none focus:border-background transition-colors resize-none"
                  placeholder="Décrivez votre activité et vos objectifs..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-background/70 text-sm mb-2 font-heading tracking-wider">DÉLAI SOUHAITÉ</label>
                <select
                  className="w-full px-4 py-3 bg-foreground border-2 border-background/30 text-background focus:outline-none focus:border-background transition-colors"
                >
                  <option value="">Choisir...</option>
                  <option value="urgent">Urgent (moins de 1 semaine)</option>
                  <option value="month">Ce mois-ci</option>
                  <option value="later">Dans 1-2 mois</option>
                  <option value="estimate">Simple estimation</option>
                </select>
              </div>

              {/* RGPD Notice */}
              <div className="mb-6 text-xs text-background/50">
                <p>
                  Vos données sont collectées par NDigital pour répondre à votre demande (mesures pré-contractuelles).
                  Elles sont conservées 3 ans après le dernier contact et ne sont partagées avec aucun tiers.
                  Vous disposez d'un droit d'accès, rectification, effacement et portabilité sur vos données.
                  Contact : contact@ndigital.fr
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-secondary w-full group disabled:opacity-70"
              >
                {isSubmitting ? (
                  "ENVOI EN COURS..."
                ) : (
                  <>
                    ENVOYER MA DEMANDE
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Reassurance */}
              <div className="mt-6 flex flex-wrap gap-4 justify-center text-background/60 text-sm">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> Réponse sous 24h
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> Devis gratuit
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> Appel 30 min offert
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
            <div className="space-y-6">
              {/* Phone */}
              <a
                href="tel:0689129955"
                className="flex items-start gap-6 p-6 border-2 border-background/20 hover:border-background transition-colors group"
              >
                <div className="w-14 h-14 border-2 border-background/20 flex items-center justify-center group-hover:bg-background group-hover:text-foreground transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-background/50 text-sm font-heading tracking-wider">TÉLÉPHONE</p>
                  <p className="text-2xl font-heading tracking-wider">06 89 12 99 55</p>
                  <p className="text-background/50 text-sm mt-1">Disponible Lun-Ven 9h-19h</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:contact@ndigital.fr"
                className="flex items-start gap-6 p-6 border-2 border-background/20 hover:border-background transition-colors group"
              >
                <div className="w-14 h-14 border-2 border-background/20 flex items-center justify-center group-hover:bg-background group-hover:text-foreground transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-background/50 text-sm font-heading tracking-wider">EMAIL</p>
                  <p className="text-xl font-heading tracking-wider">CONTACT@NDIGITAL.FR</p>
                  <p className="text-background/50 text-sm mt-1">Réponse sous 24h</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-6 p-6 border-2 border-background/20">
                <div className="w-14 h-14 border-2 border-background/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-background/50 text-sm font-heading tracking-wider">BUREAU</p>
                  <p className="text-lg font-heading tracking-wider">2 QUAI FUSTEL-DE-COULANGES</p>
                  <p className="text-background/80">67000 Strasbourg</p>
                  <p className="text-background/50 text-sm mt-1">(Sur rendez-vous)</p>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/33689129955"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-6 p-6 border-2 border-background/20 hover:border-background transition-colors group"
              >
                <div className="w-14 h-14 border-2 border-background/20 flex items-center justify-center group-hover:bg-background group-hover:text-foreground transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-background/50 text-sm font-heading tracking-wider">WHATSAPP</p>
                  <p className="text-lg font-heading tracking-wider">MESSAGE RAPIDE</p>
                  <p className="text-background/50 text-sm mt-1">Réponse encore plus rapide !</p>
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