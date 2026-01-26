import { useState, useEffect } from "react";
import { Menu, X, Phone, ChevronDown, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

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
    { href: "/test-visibilite-ia", label: "Test de visibilité IA", isRoute: true },
  ];

  const resourcesLinks = [
    { href: "/ressources/lexique-ia-seo", label: "Lexique IA & SEO", icon: BookOpen },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-lg" : "bg-deep-black/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-2">
            <img 
              src={logo}
              alt="NDIGITAL Logo" 
              className="h-10 w-auto"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-medium transition-colors ${
                    isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors ${
                    isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              )
            ))}

            {/* Dropdown Ressources */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`font-medium transition-colors flex items-center gap-1 outline-none ${
                  isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
                }`}
              >
                Ressources
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-card border-border shadow-xl min-w-[200px]"
              >
                {resourcesLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      to={link.href}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <link.icon className="w-4 h-4 text-primary" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Contact */}
            <a
              href="#contact"
              className={`font-medium transition-colors ${
                isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
              }`}
            >
              Contact
            </a>
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
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
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
                link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-foreground/80 hover:text-primary font-medium py-2 transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-foreground/80 hover:text-primary font-medium py-2 transition-colors"
                  >
                    {link.label}
                  </a>
                )
              ))}

              {/* Ressources section mobile */}
              <div className="border-t border-border pt-4 mt-2">
                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className="flex items-center justify-between w-full text-foreground/80 hover:text-primary font-medium py-2 transition-colors"
                >
                  <span>Ressources</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isResourcesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isResourcesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 flex flex-col gap-2"
                    >
                      {resourcesLinks.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsResourcesOpen(false);
                          }}
                          className="flex items-center gap-2 text-foreground/60 hover:text-primary py-2 transition-colors"
                        >
                          <link.icon className="w-4 h-4" />
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact */}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground/80 hover:text-primary font-medium py-2 transition-colors"
              >
                Contact
              </a>
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

    </header>
  );
};

export default Header;
