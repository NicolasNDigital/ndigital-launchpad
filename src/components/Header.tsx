import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#tarifs", label: "Tarifs" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl font-heading font-bold gradient-text">
              NDIGITAL
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-primary font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA & Badge */}
          <div className="hidden md:flex items-center gap-4">
            <div className="badge-pulse bg-warning/10 text-warning text-xs">
              ⚡ Mise en ligne en 2 semaines
            </div>
            <a href="#contact" className="btn-primary text-sm">
              <Phone className="w-4 h-4" />
              Devis Gratuit
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground/80 hover:text-primary font-medium py-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary text-center mt-4"
              >
                <Phone className="w-4 h-4" />
                Devis Gratuit
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <a href="tel:0689129955" className="btn-orange w-full justify-center text-lg py-4 rounded-2xl shadow-xl">
          <Phone className="w-5 h-5" />
          Appeler maintenant
        </a>
      </div>
    </header>
  );
};

export default Header;
