import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, Check } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const WEB3FORMS_ACCESS_KEY = "cb6a48ec-fcf8-4e60-812f-b001d893a6db";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Demande envoyée ! Je vous réponds sous 24h.");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
      }
    } catch (error) {
      toast.error("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="py-20 md:py-32 bg-deep-black relative overflow-hidden">
      {/* Background with mesh gradient - same as Hero */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-electric-blue/15 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-vibrant-violet/15 rounded-full blur-[120px]" />
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
            className="relative group"
          >
            {/* Gradient border effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-electric-blue via-vibrant-violet to-electric-blue rounded-3xl opacity-50 group-hover:opacity-100 blur-sm transition-opacity" />
            <form onSubmit={handleSubmit} className="relative bg-deep-black/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              {/* Champs cachés Web3Forms */}
              <input type="hidden" name="subject" value="Nouvelle demande de devis - NDigital" />
              <input type="hidden" name="from_name" value="NDigital - Formulaire Contact" />
              <input type="checkbox" name="botcheck" className="hidden" />
              
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2 font-medium">👤 Nom Prénom *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    maxLength={100}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-electric-blue/20 text-white placeholder-white/40 focus:outline-none focus:border-electric-blue/60 focus:bg-white/[0.08] transition-all"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2 font-medium">📧 Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    maxLength={255}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-electric-blue/20 text-white placeholder-white/40 focus:outline-none focus:border-electric-blue/60 focus:bg-white/[0.08] transition-all"
                    placeholder="jean@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2 font-medium">📞 Téléphone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    maxLength={20}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-electric-blue/20 text-white placeholder-white/40 focus:outline-none focus:border-electric-blue/60 focus:bg-white/[0.08] transition-all"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2 font-medium">🏢 Entreprise / Activité *</label>
                  <input
                    type="text"
                    name="company"
                    required
                    maxLength={100}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-electric-blue/20 text-white placeholder-white/40 focus:outline-none focus:border-electric-blue/60 focus:bg-white/[0.08] transition-all"
                    placeholder="Plomberie Martin"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2 font-medium">🎯 Projet</label>
                  <select
                    name="project_type"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-electric-blue/20 text-white focus:outline-none focus:border-electric-blue/60 focus:bg-white/[0.08] transition-all"
                  >
                    <option value="" className="text-deep-black">Choisir...</option>
                    <option value="Site vitrine simple" className="text-deep-black">Site vitrine simple</option>
                    <option value="Pack Site + Google Ads" className="text-deep-black">Pack Site + Google Ads</option>
                    <option value="Refonte site existant" className="text-deep-black">Refonte site existant</option>
                    <option value="Autre besoin digital" className="text-deep-black">Autre besoin digital</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2 font-medium">📍 Ville *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    maxLength={100}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-electric-blue/20 text-white placeholder-white/40 focus:outline-none focus:border-electric-blue/60 focus:bg-white/[0.08] transition-all"
                    placeholder="Strasbourg"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-white/80 text-sm mb-2 font-medium">💬 Parlez-moi de votre projet *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  maxLength={2000}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-electric-blue/20 text-white placeholder-white/40 focus:outline-none focus:border-electric-blue/60 focus:bg-white/[0.08] transition-all resize-none"
                  placeholder="Décrivez votre activité et vos objectifs..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-white/80 text-sm mb-2 font-medium">📅 Quand souhaitez-vous démarrer ?</label>
                <select
                  name="timeline"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-electric-blue/20 text-white focus:outline-none focus:border-electric-blue/60 focus:bg-white/[0.08] transition-all"
                >
                  <option value="" className="text-deep-black">Choisir...</option>
                  <option value="Urgent (< 1 semaine)" className="text-deep-black">Urgent (&lt; 1 semaine)</option>
                  <option value="Ce mois-ci" className="text-deep-black">Ce mois-ci</option>
                  <option value="Dans 1-2 mois" className="text-deep-black">Dans 1-2 mois</option>
                  <option value="Simple estimation" className="text-deep-black">Simple estimation</option>
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
            <div className="space-y-6">
              {/* Phone */}
              <a
                href="tel:0689129955"
                className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-electric-blue/20 hover:border-electric-blue/40 hover:bg-white/[0.08] transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center text-white group-hover:shadow-glow transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-electric-blue text-sm font-medium">TÉLÉPHONE</p>
                  <p className="text-white text-2xl font-bold">06 89 12 99 55</p>
                  <p className="text-white/60 text-sm mt-1">Disponible Lun-Ven 9h-19h</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:contact@ndigital.fr"
                className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-electric-blue/20 hover:border-electric-blue/40 hover:bg-white/[0.08] transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center text-white group-hover:shadow-glow transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-electric-blue text-sm font-medium">EMAIL</p>
                  <p className="text-white text-xl font-bold">contact@ndigital.fr</p>
                  <p className="text-white/60 text-sm mt-1">Réponse sous 24h</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-vibrant-violet/20">
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center text-white">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-vibrant-violet text-sm font-medium">BUREAU</p>
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
                className="flex items-start gap-4 p-6 rounded-2xl bg-success-green/10 border border-success-green/30 hover:border-success-green/50 hover:bg-success-green/15 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-success-green flex items-center justify-center text-white group-hover:shadow-[0_0_30px_rgba(0,200,117,0.4)] transition-all">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-success-green text-sm font-medium">WHATSAPP</p>
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
