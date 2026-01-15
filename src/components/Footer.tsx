import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16 border-t border-background/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span className="text-3xl font-heading font-light">
              NDigital
            </span>
            <p className="text-background/50 mt-4 max-w-xs font-light leading-relaxed">
              Expert en création de sites vitrines et campagnes Google Ads pour les business locaux à Strasbourg.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-background/50 hover:text-background transition-colors font-light">
                  Services
                </a>
              </li>
              <li>
                <a href="#tarifs" className="text-background/50 hover:text-background transition-colors font-light">
                  Tarifs
                </a>
              </li>
              <li>
                <a href="#faq" className="text-background/50 hover:text-background transition-colors font-light">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="text-background/50 hover:text-background transition-colors font-light">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xl mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-background/50">
                <Phone className="w-4 h-4" />
                <a href="tel:0689129955" className="hover:text-background transition-colors font-light">
                  06 89 12 99 55
                </a>
              </li>
              <li className="flex items-center gap-3 text-background/50">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@ndigital.fr" className="hover:text-background transition-colors font-light">
                  contact@ndigital.fr
                </a>
              </li>
              <li className="flex items-center gap-3 text-background/50">
                <MapPin className="w-4 h-4" />
                <span className="font-light">Strasbourg, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/30 text-sm font-light">
            © {currentYear} NDigital. Tous droits réservés.
          </p>
          <div className="flex gap-8 text-sm">
            <a href="#" className="text-background/30 hover:text-background/60 transition-colors font-light">
              Mentions légales
            </a>
            <a href="#" className="text-background/30 hover:text-background/60 transition-colors font-light">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
