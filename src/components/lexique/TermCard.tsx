import { Lightbulb, Quote, ListChecks } from "lucide-react";
import type { LexiqueTerm } from "@/data/lexiqueData";

interface TermCardProps {
  term: LexiqueTerm;
}

const TermCard = ({ term }: TermCardProps) => {
  // Helper pour mettre en gras les concepts clés dans la définition
  const formatDefinition = (text: string) => {
    // Mots clés à mettre en évidence
    const keywords = [
      "SEO",
      "GEO",
      "AEO",
      "ChatGPT",
      "Perplexity",
      "Gemini",
      "Google",
      "Schema.org",
      "E-E-A-T",
      "IA",
      "backlinks",
      "HTTPS",
      "robots.txt",
      "sitemap",
      "JSON-LD",
      "RAG",
      "FAQ",
    ];

    let formattedText = text;
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b(${keyword})\\b`, "gi");
      formattedText = formattedText.replace(regex, "<strong>$1</strong>");
    });

    return formattedText;
  };

  return (
    <article
      id={`terme-${term.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      className="group p-6 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all scroll-mt-32"
    >
      {/* Nom du terme (H3) */}
      <h3 className="text-xl md:text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">
        {term.term}
      </h3>

      {/* Description principale */}
      <p
        className="text-muted-foreground leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: formatDefinition(term.definition) }}
      />

      {/* Points clés si présents */}
      {term.keyPoints && term.keyPoints.length > 0 && (
        <div className="mb-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <ListChecks className="w-4 h-4" />
            <span className="text-sm font-medium">Concrètement :</span>
          </div>
          <ul className="space-y-2">
            {term.keyPoints.map((point, index) => (
              <li
                key={index}
                className="text-sm text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-primary"
                dangerouslySetInnerHTML={{ __html: formatDefinition(point) }}
              />
            ))}
          </ul>
        </div>
      )}

      {/* Bloc Exemple si présent */}
      {term.example && (
        <div className="mb-4 p-4 rounded-lg bg-accent/10 border-l-4 border-accent">
          <div className="flex items-center gap-2 mb-2">
            <Quote className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              Exemple concret
            </span>
          </div>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {term.example}
          </p>
        </div>
      )}

      {/* Bloc À savoir si présent */}
      {term.tip && (
        <div className="p-4 rounded-lg bg-secondary/10 border-l-4 border-secondary">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-secondary" />
            <span className="text-sm font-semibold text-secondary">
              Le truc à savoir
            </span>
          </div>
          <p
            className="text-sm text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: formatDefinition(term.tip) }}
          />
        </div>
      )}
    </article>
  );
};

export default TermCard;
