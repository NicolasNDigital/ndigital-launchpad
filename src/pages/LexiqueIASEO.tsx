import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import CategorySection from "@/components/lexique/CategorySection";
import {
  lexiqueTerms,
  categoryOrder,
  categoryDescriptions,
  getTermsByCategory,
} from "@/data/lexiqueData";

const LexiqueIASEO = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const termsByCategory = getTermsByCategory();

  // Générer le JSON-LD DefinedTermSet
  const generateDefinedTermSetSchema = () => {
    const terms = lexiqueTerms.map((term) => ({
      "@type": "DefinedTerm",
      name: term.term,
      description: term.definition,
      inDefinedTermSet: "https://www.ndigital-pro.fr/ressources/lexique-ia-seo",
    }));

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

  // Catégories avec du contenu
  const activeCategories = categoryOrder.filter(
    (cat) => termsByCategory[cat].length > 0
  );

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

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
                Toutes les définitions clés pour comprendre le futur de la recherche
                et dominer les résultats — sur Google comme sur ChatGPT.
              </p>

              <p className="text-base text-muted-foreground/80 max-w-xl mx-auto">
                {lexiqueTerms.length} termes expliqués simplement, comme si on prenait un café ensemble. ☕
              </p>
            </div>
          </div>
        </section>

        {/* Navigation par catégories (Sommaire) */}
        <nav className="sticky top-20 z-40 bg-background/95 backdrop-blur-sm border-y border-border py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {activeCategories.map((category) => {
                const categoryId = category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                return (
                  <a
                    key={category}
                    href={`#cat-${categoryId}`}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {category}
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
              {/* Intro contextuelle */}
              <div className="mb-12 p-6 rounded-2xl bg-card/50 border border-border">
                <p className="text-muted-foreground leading-relaxed">
                  Si t'es là, c'est que tu t'es probablement déjà pris la tête avec des termes barbares du type{" "}
                  <strong className="text-foreground">"GEO"</strong>,{" "}
                  <strong className="text-foreground">"Schema.org"</strong> ou{" "}
                  <strong className="text-foreground">"RAG"</strong>. Pas de panique, on va tout t'expliquer.
                </p>
              </div>

              {/* Sections par catégorie */}
              {activeCategories.map((category) => (
                <CategorySection
                  key={category}
                  category={category}
                  terms={termsByCategory[category]}
                />
              ))}

              {/* Message de conclusion */}
              <div className="mt-12 p-6 rounded-2xl bg-card/50 border border-border">
                <p className="text-muted-foreground leading-relaxed">
                  Voilà, t'es armé ! Si un terme te paraît encore flou, hésite pas à chercher des exemples concrets sur ton propre site ou celui de tes concurrents. C'est souvent là qu'on comprend le mieux.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Et surtout, retiens ça : <strong className="text-foreground">le GEO c'est pas de la magie noire</strong>. C'est juste créer du contenu utile, clair, et structuré pour qu'une machine puisse facilement le comprendre et le recommander. Simple, non ? 😉
                </p>
              </div>

              {/* CTA Final - Maillage inversé */}
              <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center">
                <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Prêt à passer du lexique à la pratique ?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Ne laissez pas l'IA ignorer votre savoir-faire alsacien. Testez gratuitement la visibilité de votre site sur les moteurs de recherche IA.
                </p>
                <Link
                  to="/test-visibilite-ia"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <span>Analyser ma visibilité IA</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default LexiqueIASEO;
