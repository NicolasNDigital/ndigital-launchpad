import type { LexiqueTerm, LexiqueCategory } from "@/data/lexiqueData";
import { categoryDescriptions } from "@/data/lexiqueData";
import TermCard from "./TermCard";

interface CategorySectionProps {
  category: LexiqueCategory;
  terms: LexiqueTerm[];
}

const CategorySection = ({ category, terms }: CategorySectionProps) => {
  const categoryId = category.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <section id={`cat-${categoryId}`} className="mb-16 scroll-mt-32">
      {/* Titre de la catégorie (H2) */}
      <div className="mb-8 pb-4 border-b border-border">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          {categoryDescriptions[category]}
        </h2>
        <p className="text-sm text-muted-foreground uppercase tracking-wider">
          {terms.length} terme{terms.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Liste des termes */}
      <div className="space-y-6">
        {terms.map((term, index) => (
          <TermCard key={index} term={term} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
