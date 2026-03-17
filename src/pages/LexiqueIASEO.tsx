import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles, TrendingUp, Target, Users, CheckCircle2, AlertTriangle } from "lucide-react";
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
      inDefinedTermSet: "https://ndigital-pro.fr/ressources/lexique-ia-seo",
    }));

    return {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      "@id": "https://ndigital-pro.fr/ressources/lexique-ia-seo#glossary",
      name: "Lexique IA & SEO - NDigital",
      description:
        "Glossaire complet des termes essentiels en Intelligence Artificielle, SEO et GEO (Generative Engine Optimization) pour comprendre le futur du web.",
      url: "https://ndigital-pro.fr/ressources/lexique-ia-seo",
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
          title="Lexique IA & SEO 2026 : 27 définitions clés pour comprendre le GEO, le SEO et l'IA | NDigital"
          description="GEO, AEO, Schema.org, RAG, E-E-A-T… Découvrez 27 termes essentiels du référencement IA et SEO expliqués simplement. Guide complet par NDigital, expert en visibilité web à Strasbourg."
          canonical="https://ndigital-pro.fr/ressources/lexique-ia-seo"
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

        {/* Introduction éditoriale riche */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <article className="prose prose-invert max-w-none">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Pourquoi ce lexique IA & SEO existe (et pourquoi vous en avez besoin en 2026)
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  En 2026, <strong className="text-foreground">46 % des recherches en ligne passent désormais par une IA conversationnelle</strong> — ChatGPT, Perplexity, Gemini — plutôt que par une recherche Google classique. Ce chiffre était à peine de 12 % en 2024. 
                  Pour les entrepreneurs, artisans et PME en Alsace et partout en France, cette bascule change tout : si votre site n'est pas optimisé pour ces nouveaux moteurs de réponse, <strong className="text-foreground">vous devenez invisible pour près de la moitié de vos clients potentiels</strong>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Le problème ? Le vocabulaire du référencement évolue aussi vite que la technologie. Entre <strong className="text-foreground">GEO</strong> (Generative Engine Optimization), <strong className="text-foreground">AEO</strong> (Answer Engine Optimization), <strong className="text-foreground">RAG</strong> (Retrieval-Augmented Generation) et <strong className="text-foreground">E-E-A-T</strong>, même les professionnels du marketing digital s'y perdent. 
                  Ce lexique a été conçu par <strong className="text-foreground">NDigital</strong> pour vous donner une longueur d'avance : des définitions claires, des exemples concrets, et des conseils immédiatement applicables à votre activité.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Que vous soyez restaurateur à Strasbourg, artisan dans le Bas-Rhin, consultant indépendant ou dirigeant de PME, comprendre ces termes n'est plus optionnel — c'est la clé pour <strong className="text-foreground">être recommandé par les IA quand un prospect cherche exactement ce que vous proposez</strong>.
                </p>

                {/* Encadré : À qui s'adresse ce lexique */}
                <div className="p-6 rounded-2xl bg-card/50 border border-border mb-12">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    À qui s'adresse ce lexique ?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Entrepreneurs et indépendants</strong> qui veulent comprendre pourquoi leur site n'apparaît plus dans les résultats, même s'il était bien positionné avant.</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Dirigeants de PME</strong> qui envisagent de refondre leur site web et veulent s'assurer qu'il sera visible sur Google ET sur les IA en 2026.</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Professionnels du marketing</strong> qui doivent mettre à jour leurs connaissances face à l'arrivée massive de l'IA dans la recherche.</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Commerçants et artisans alsaciens</strong> qui veulent que leur savoir-faire soit recommandé par ChatGPT quand un client cherche « meilleur [métier] à Strasbourg ».</span>
                    </li>
                  </ul>
                </div>

                {/* Section : Le changement de paradigme */}
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Du SEO au GEO : le changement de paradigme que vous ne pouvez plus ignorer
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Pendant 20 ans, le référencement se résumait à une équation simple : <strong className="text-foreground">choisir les bons mots-clés, obtenir des liens entrants, et attendre que Google vous positionne</strong>. Cette époque est révolue. Aujourd'hui, quand un utilisateur demande à Perplexity « quel avocat spécialisé en droit des affaires à Strasbourg recommandez-vous ? », l'IA ne se contente pas de lister 10 liens bleus. Elle lit, analyse et synthétise des dizaines de sources pour formuler <strong className="text-foreground">une seule recommandation argumentée</strong>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Concrètement, cela signifie que votre contenu web doit désormais répondre à un double standard : être suffisamment structuré pour que Google le comprenne (SEO classique), ET suffisamment riche, factuel et autoritaire pour qu'une IA le choisisse comme source de sa réponse (GEO). 
                  C'est exactement ce que ce lexique vous aide à comprendre, terme par terme.
                </p>

                {/* Cas d'usage concrets */}
                <div className="my-12 space-y-6">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    3 cas concrets où le GEO fait la différence
                  </h3>
                  
                  <div className="p-5 rounded-xl bg-card/50 border border-border">
                    <h4 className="font-bold text-foreground mb-2">🍽️ Cas n°1 — Restaurant gastronomique à Strasbourg</h4>
                    <p className="text-muted-foreground leading-relaxed mb-2">
                      Un restaurateur avait un bon référencement local sur Google Maps, mais zéro visibilité sur les IA. Résultat : quand les touristes demandaient à ChatGPT « meilleur restaurant alsacien à Strasbourg pour un dîner d'affaires », il n'apparaissait jamais.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">La solution :</strong> restructurer son site avec des données Schema.org (Restaurant, Menu, Review), ajouter une FAQ riche avec des questions que les clients posent réellement, et renforcer ses signaux E-E-A-T avec des avis vérifiés et des mentions presse. En 3 mois, son établissement est devenu la première recommandation de Perplexity pour cette requête.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-card/50 border border-border">
                    <h4 className="font-bold text-foreground mb-2">🔧 Cas n°2 — Artisan plombier dans le Bas-Rhin</h4>
                    <p className="text-muted-foreground leading-relaxed mb-2">
                      Un plombier investissait 500€/mois en Google Ads mais voyait ses leads baisser. La raison : de plus en plus de ses prospects posaient leurs questions directement à une IA plutôt que de chercher sur Google.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">La solution :</strong> créer des pages de contenu structuré répondant aux questions fréquentes (« Comment déboucher un évier sans produit chimique ? », « Quel est le prix moyen d'un remplacement de chauffe-eau à Strasbourg ? »). Ce contenu factuel et expert est exactement ce que les IA extraient et citent.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-card/50 border border-border">
                    <h4 className="font-bold text-foreground mb-2">💼 Cas n°3 — Cabinet de conseil en gestion</h4>
                    <p className="text-muted-foreground leading-relaxed mb-2">
                      Un cabinet de conseil avait un site vitrine classique avec 5 pages (Accueil, Services, À propos, Blog, Contact). Malgré un design soigné, le site générait moins de 3 demandes de contact par mois.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">La solution :</strong> transformer le site en hub de contenu expert avec des guides pratiques, un lexique sectoriel, des études de cas chiffrées et une FAQ enrichie. Le site est passé de 200 à 2 800 visites mensuelles, et les demandes de devis ont été multipliées par 5. Pourquoi ? Parce que Google ET les IA le considèrent désormais comme une source d'autorité.
                    </p>
                  </div>
                </div>

                {/* Conseil expert NDigital */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 mb-12">
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Le conseil NDigital : par où commencer ?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Si vous découvrez ce lexique, commencez par ces 5 termes dans cet ordre : <strong className="text-foreground">GEO</strong> → <strong className="text-foreground">E-E-A-T</strong> → <strong className="text-foreground">Schema.org</strong> → <strong className="text-foreground">RAG</strong> → <strong className="text-foreground">Contenu factuel</strong>. 
                    Ces 5 concepts forment le socle de toute stratégie de visibilité moderne. Une fois maîtrisés, vous comprendrez pourquoi 80 % des sites web actuels sont mal préparés pour l'ère de la recherche par IA.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Chez NDigital, nous accompagnons les entreprises alsaciennes dans cette transition depuis 2024. Notre approche combine <strong className="text-foreground">création de sites web optimisés SEO + GEO</strong>, <strong className="text-foreground">copywriting stratégique</strong> et <strong className="text-foreground">structuration technique</strong> pour que votre expertise soit visible là où vos clients cherchent — que ce soit sur Google, ChatGPT ou Perplexity.
                  </p>
                </div>

                {/* Avertissement erreurs courantes */}
                <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20 mb-12">
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    Les 3 erreurs qui rendent votre site invisible pour les IA
                  </h3>
                  <ol className="space-y-3 list-decimal list-inside">
                    <li className="text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Bloquer les crawlers IA sans le savoir.</strong> Beaucoup de sites ont un fichier robots.txt qui bloque GPTBot ou CCBot. Résultat : ChatGPT et les IA ne peuvent même pas lire votre contenu. Vérifiez votre fichier robots.txt dès maintenant.
                    </li>
                    <li className="text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Publier du contenu générique généré par IA.</strong> Paradoxalement, les IA reconnaissent le contenu qu'elles ont elles-mêmes généré. Si votre blog est rempli d'articles ChatGPT copiés-collés sans valeur ajoutée, vous serez ignoré au profit de sources originales.
                    </li>
                    <li className="text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Négliger les données structurées.</strong> Sans balisage Schema.org, votre contenu est un texte brut pour les machines. Avec, c'est un document étiqueté, catégorisé, et facile à extraire. La différence est énorme pour le GEO.
                    </li>
                  </ol>
                </div>
              </article>

              {/* Transition vers le glossaire */}
              <div className="mb-12 p-6 rounded-2xl bg-card/50 border border-border">
                <p className="text-muted-foreground leading-relaxed">
                  Maintenant que vous comprenez les enjeux, plongeons dans les {lexiqueTerms.length} définitions qui composent ce lexique. 
                  Chaque terme est expliqué avec des mots simples, des exemples concrets et des conseils pratiques que vous pouvez appliquer immédiatement à votre site web.
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

              {/* Section de conclusion enrichie */}
              <div className="mt-12 space-y-8">
                <div className="p-6 rounded-2xl bg-card/50 border border-border">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    En résumé : ce qu'il faut retenir de ce lexique
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Le référencement en 2026 repose sur <strong className="text-foreground">trois piliers</strong> : la technique (Schema.org, crawlabilité, vitesse), le contenu (factuel, structuré en Q&R, avec des données vérifiables) et l'autorité (E-E-A-T, backlinks, citations). 
                    Le GEO n'est pas une révolution qui remplace le SEO — c'est <strong className="text-foreground">une couche supplémentaire</strong> qui récompense les sites qui font déjà bien leur travail et les rend visibles sur un canal de recherche en pleine explosion.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Si vous ne deviez retenir qu'une seule chose : <strong className="text-foreground">créez du contenu que vous seriez fier de montrer à un expert de votre domaine</strong>. Si un humain expert le trouve utile et crédible, une IA le recommandera. C'est aussi simple que ça.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Et si vous avez besoin d'aide pour mettre tout ça en pratique — que ce soit pour <strong className="text-foreground">créer un site web optimisé</strong>, <strong className="text-foreground">rédiger du contenu stratégique</strong> ou <strong className="text-foreground">auditer votre visibilité IA</strong> — NDigital accompagne les entreprises en Alsace et partout en France dans cette transition vers le référencement de demain.
                  </p>
                </div>

                {/* Checklist actionnable */}
                <div className="p-6 rounded-2xl bg-card/50 border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    ✅ Votre checklist GEO en 7 points
                  </h3>
                  <ol className="space-y-3 list-decimal list-inside">
                    <li className="text-muted-foreground leading-relaxed">Vérifiez que votre robots.txt ne bloque pas GPTBot et CCBot.</li>
                    <li className="text-muted-foreground leading-relaxed">Ajoutez des données structurées Schema.org sur chaque page clé (FAQPage, Article, LocalBusiness).</li>
                    <li className="text-muted-foreground leading-relaxed">Créez une FAQ de 10+ questions formulées comme les gens les posent à une IA.</li>
                    <li className="text-muted-foreground leading-relaxed">Incluez des chiffres, des dates et des sources dans tous vos contenus.</li>
                    <li className="text-muted-foreground leading-relaxed">Renforcez votre E-E-A-T : bio d'auteur, certifications, témoignages, mentions presse.</li>
                    <li className="text-muted-foreground leading-relaxed">Testez votre vitesse sur PageSpeed Insights — visez un score de 90+.</li>
                    <li className="text-muted-foreground leading-relaxed">Vérifiez régulièrement si votre site est cité par Perplexity, ChatGPT et Gemini.</li>
                  </ol>
                </div>
              </div>

              {/* CTA Final - Maillage inversé */}
              <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center">
                <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Prêt à passer du lexique à la pratique ?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Ne laissez pas l'IA ignorer votre savoir-faire. Testez gratuitement la visibilité de votre site sur les moteurs de recherche IA — l'audit prend 30 secondes et les résultats sont immédiats.
                </p>
                <Link
                  to="/test-visibilite-ia"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <span>Analyser ma visibilité IA gratuitement</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-sm text-muted-foreground/60 mt-4">
                  Pas besoin de compte. Résultats instantanés. 100 % gratuit.
                </p>
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
