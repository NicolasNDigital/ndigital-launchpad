import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-deep-black text-white">
      <div className="container mx-auto px-4 py-16">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-electric-violet hover:text-electric-violet/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8 gradient-text">
          Mentions Légales
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">1. Éditeur du site</h2>
            <p className="text-white/70">
              Le site <strong className="text-white">ndigital.fr</strong> est édité par :
            </p>
            <ul className="text-white/70 list-none space-y-2 mt-4">
              <li><strong className="text-white">Nom :</strong> NDIGITAL</li>
              <li><strong className="text-white">Statut :</strong> Micro-entreprise</li>
              <li><strong className="text-white">Adresse :</strong> 2 Quai Fustel-De-Coulanges, 67000 Strasbourg</li>
              <li><strong className="text-white">Téléphone :</strong> 06 89 12 99 55</li>
              <li><strong className="text-white">Email :</strong> contact@ndigital.fr</li>
              <li><strong className="text-white">SIRET :</strong> 830 915 344 00022</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">2. Directeur de la publication</h2>
            <p className="text-white/70">
              Le directeur de la publication est <strong className="text-white">Nicolas SCHUBLIN</strong>, en qualité de gérant de NDIGITAL.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">3. Hébergement</h2>
            <p className="text-white/70">
              Ce site est hébergé par :
            </p>
            <ul className="text-white/70 list-none space-y-2 mt-4">
              <li><strong className="text-white">Hébergeur :</strong> OVH SAS</li>
              <li><strong className="text-white">Adresse :</strong> 2 rue Kellermann, 59100 Roubaix, France</li>
              <li><strong className="text-white">Téléphone :</strong> 1007</li>
              <li><strong className="text-white">Site web :</strong> <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer" className="text-electric-violet hover:underline">www.ovhcloud.com</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">4. Propriété intellectuelle</h2>
            <p className="text-white/70">
              L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, etc.) est la propriété exclusive de NDIGITAL ou de ses partenaires, sauf mention contraire. Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces éléments est strictement interdite sans l'accord écrit préalable de NDIGITAL.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">5. Limitation de responsabilité</h2>
            <p className="text-white/70">
              NDIGITAL s'efforce de fournir des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes ou des carences dans la mise à jour de ces informations, qu'elles soient de son fait ou du fait des tiers partenaires.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">6. Liens hypertextes</h2>
            <p className="text-white/70">
              Le site peut contenir des liens hypertextes vers d'autres sites. NDIGITAL décline toute responsabilité quant au contenu de ces sites externes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">7. Droit applicable</h2>
            <p className="text-white/70">
              Les présentes mentions légales sont régies par le droit français. En cas de litige, et après échec de toute tentative de recherche d'une solution amiable, les tribunaux français seront seuls compétents pour connaître de ce litige.
            </p>
          </section>
        </div>

        <p className="text-white/40 text-sm mt-12">
          Dernière mise à jour : Janvier 2026
        </p>
      </div>
    </div>
  );
};

export default MentionsLegales;
