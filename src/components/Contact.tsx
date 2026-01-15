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
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Demande envoyée ! Je vous réponds sous 24h.");
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section ref={ref} id="contact" className="py-20 md:py-32 bg-gradient-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Lancez Votre Projet Dès Aujourd'hui
          </h2>
          <p className="text-lg text-white/80">
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
            <form onSubmit={handleSubmit} className="glass-light rounded-3xl p-8 border border-white/10">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">👤 Nom Prénom *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">📧 Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
                    placeholder="jean@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">📞 Téléphone *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">🏢 Entreprise / Activité *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
                    placeholder="Plomberie Martin"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">🎯 Projet</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40 transition-colors"
                  >
                    <option value="" className="text-deep-black">Choisir...</option>
                    <option value="site" className="text-deep-black">Site vitrine simple</option>
                    <option value="pack" className="text-deep-black">Pack Site + Google Ads</option>
                    <option value="refonte" className="text-deep-black">Refonte site existant</option>
                    <option value="autre" className="text-deep-black">Autre besoin digital</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">📍 Ville *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
                    placeholder="Strasbourg"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-white/80 text-sm mb-2">💬 Parlez-moi de votre projet *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors resize-none"
                  placeholder="Décrivez votre activité et vos objectifs..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-white/80 text-sm mb-2">📅 Quand souhaitez-vous démarrer ?</label>
                <select
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40 transition-colors"
                >
                  <option value="" className="text-deep-black">Choisir...</option>
                  <option value="urgent" className="text-deep-black">Urgent (&lt; 1 semaine)</option>
                  <option value="month" className="text-deep-black">Ce mois-ci</option>
                  <option value="later" className="text-deep-black">Dans 1-2 mois</option>
                  <option value="estimate" className="text-deep-black">Simple estimation</option>
                </select>
              </div>

              {/* RGPD Notice */}
              <div className="mb-6 text-xs text-white/60">
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
                className="btn-orange w-full text-lg py-4 group disabled:opacity-70"
              >
                {isSubmitting ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    Envoyer ma demande
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Reassurance */}
              <div className="mt-6 flex flex-wrap gap-4 justify-center text-white/70 text-sm">
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-success-green" /> Réponse sous 24h
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-success-green" /> Devis gratuit
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-success-green" /> Appel 30 min offert
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
            <div className="space-y-8">
              {/* Phone */}
              <a
                href="tel:0689129955"
                className="flex items-start gap-4 p-6 rounded-2xl bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-warning group-hover:text-deep-black transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">TÉLÉPHONE</p>
                  <p className="text-white text-2xl font-bold">06 89 12 99 55</p>
                  <p className="text-white/60 text-sm mt-1">Disponible Lun-Ven 9h-19h</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:contact@ndigital.fr"
                className="flex items-start gap-4 p-6 rounded-2xl bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-warning group-hover:text-deep-black transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">EMAIL</p>
                  <p className="text-white text-xl font-bold">contact@ndigital.fr</p>
                  <p className="text-white/60 text-sm mt-1">Réponse sous 24h</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/10 border border-white/10">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">BUREAU</p>
                  <p className="text-white text-lg font-bold">2 Quai Fustel-de-Coulanges</p>
                  <p className="text-white/80">67000 Strasbourg</p>
                  <p className="text-white/60 text-sm mt-1">(Sur rendez-vous)</p>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/33689129955"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-6 rounded-2xl bg-success-green/20 border border-success-green/30 hover:border-success-green/50 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-success-green/20 flex items-center justify-center text-success-green group-hover:bg-success-green group-hover:text-white transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">WHATSAPP</p>
                  <p className="text-white text-lg font-bold">Message rapide</p>
                  <p className="text-white/60 text-sm mt-1">Réponse encore plus rapide !</p>
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
