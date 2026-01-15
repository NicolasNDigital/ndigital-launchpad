import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <span className="text-2xl font-heading font-bold gradient-text">
              NDIGITAL
            </span>
            <p className="text-white/60 mt-4 max-w-xs">
              Expert en création de sites vitrines et campagnes Google Ads pour les business locaux à Strasbourg.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-white/60 hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#realisations" className="text-white/60 hover:text-white transition-colors">
                  Réalisations
                </a>
              </li>
              <li>
                <a href="#tarifs" className="text-white/60 hover:text-white transition-colors">
                  Tarifs
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/60 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/60">
                <Phone className="w-4 h-4" />
                <a href="tel:0689129955" className="hover:text-white transition-colors">
                  06 89 12 99 55
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@ndigital.fr" className="hover:text-white transition-colors">
                  contact@ndigital.fr
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <MapPin className="w-4 h-4" />
                <span>Strasbourg, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} NDIGITAL. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
