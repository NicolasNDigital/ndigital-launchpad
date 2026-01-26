import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

// Alphabet pour la navigation par ancres
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const LexiqueIASEO = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  // Structure pour les termes - À REMPLIR avec le contenu réel
  // Chaque lettre contient un tableau de termes avec name et description
  const lexiqueData: Record<string, Array<{ name: string; description: string }>> = {
    // === EXEMPLE DE STRUCTURE - REMPLACER PAR LE CONTENU RÉEL ===
    // "A": [
    //   { name: "Algorithm", description: "Définition de Algorithm..." },
    //   { name: "API", description: "Définition de API..." },
    // ],
    // "B": [
    //   { name: "Backlink", description: "Définition de Backlink..." },
    // ],
    // === FIN DE L'EXEMPLE ===
  };

  // Générer le JSON-LD DefinedTermSet
  const generateDefinedTermSetSchema = () => {
    const terms: Array<{
      "@type": string;
      name: string;
      description: string;
      inDefinedTermSet: string;
    }> = [];

    Object.entries(lexiqueData).forEach(([, termList]) => {
      termList.forEach((term) => {
        terms.push({
          "@type": "DefinedTerm",
          name: term.name,
          description: term.description,
          inDefinedTermSet: "https://www.ndigital-pro.fr/ressources/lexique-ia-seo",
        });
      });
    });

    return {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      "@id": "https://www.ndigital-pro.fr/ressources/lexique-ia-seo#glossary",
      name: "Lexique IA & SEO - NDigital",
      description:
        "Glossaire complet des termes essentiels en Intelligence Artificielle, SEO et GEO (Generative Engine Optimization) pour comprendre le futur du web.",
      url: "https://www.ndigital-pro.fr/ressources/lexique-ia-seo",
      hasDefinedTerm: terms,
    };
  };

  // Lettres qui ont du contenu
  const activeLettres = Object.keys(lexiqueData);

  return (
    <>
      <SEO
        title="Lexique IA & SEO : Comprendre le futur du Web | NDigital"
        description="GEO, SEO local, Indexation sémantique... Retrouvez toutes les définitions clés pour dominer les résultats de recherche et les IA en 2026."
        canonical="https://www.ndigital-pro.fr/ressources/lexique-ia-seo"
        ogType="article"
      />

      {/* Schema.org DefinedTermSet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateDefinedTermSetSchema()),
        }}
      />

      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Background gradient mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-deep-black via-background to-deep-black">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Ressources</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Lexique{" "}
                <span className="gradient-text">IA & SEO</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Toutes les définitions clés pour comprendre le futur de la recherche
                et dominer les résultats — sur Google comme sur ChatGPT.
              </p>

              {/* Barre de recherche future (optionnel) */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher un terme..."
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-card/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  disabled
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  Bientôt disponible
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation alphabétique (Sommaire) */}
        <nav className="sticky top-20 z-40 bg-background/95 backdrop-blur-sm border-y border-border py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {alphabet.map((letter) => {
                const hasContent = activeLettres.includes(letter);
                return (
                  <a
                    key={letter}
                    href={hasContent ? `#lettre-${letter}` : undefined}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                      hasContent
                        ? "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                        : "bg-muted/30 text-muted-foreground/40 cursor-not-allowed"
                    }`}
                    aria-disabled={!hasContent}
                  >
                    {letter}
                  </a>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Contenu du Lexique */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Message si aucun contenu */}
              {Object.keys(lexiqueData).length === 0 && (
                <div className="text-center py-16 px-8 rounded-2xl bg-card/50 border border-border">
                  <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/50 mb-6" />
                  <h2 className="text-2xl font-bold mb-4">
                    Contenu en cours de rédaction
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Les définitions arrivent très bientôt. En attendant, testez
                    gratuitement la visibilité de votre site face aux IA.
                  </p>
                  <Link
                    to="/test-visibilite-ia"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Tester mon site
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {/* Boucle sur les lettres avec contenu */}
              {Object.entries(lexiqueData).map(([letter, terms]) => (
                <div key={letter} id={`lettre-${letter}`} className="mb-16 scroll-mt-32">
                  {/* Titre de la lettre (H2) */}
                  <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 pb-4 border-b border-border">
                    {letter}
                  </h2>

                  {/* Liste des termes */}
                  <div className="space-y-8">
                    {terms.map((term, index) => (
                      <article
                        key={index}
                        id={`terme-${term.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="group p-6 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all scroll-mt-32"
                      >
                        {/* Nom du terme (H3) */}
                        <h3 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                          {term.name}
                        </h3>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed">
                          {term.description}
                        </p>

                        {/* === ESPACE POUR CTA EN BAS DE CHAQUE DÉFINITION (OPTIONNEL) === */}
                        {/* Décommenter si vous voulez un CTA sous chaque terme */}
                        {/* 
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <Link
                            to="/test-visibilite-ia"
                            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                          >
                            Appliquer ce concept à votre business
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                        */}
                      </article>
                    ))}
                  </div>
                </div>
              ))}

              {/* CTA Final */}
              {Object.keys(lexiqueData).length > 0 && (
                <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Besoin d'appliquer ces concepts à votre business ?
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    Testez gratuitement la visibilité de votre site sur les moteurs
                    de recherche IA et obtenez des recommandations personnalisées.
                  </p>
                  <Link
                    to="/test-visibilite-ia"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <span>Lancer mon audit IA gratuit</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default LexiqueIASEO;
