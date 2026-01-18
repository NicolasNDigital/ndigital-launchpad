import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PolitiqueConfidentialite = () => {
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
          Politique de Protection des Données
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">1. Introduction</h2>
            <p className="text-white/70">
              NDIGITAL s'engage à protéger la vie privée des utilisateurs de son site. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">2. Responsable du traitement</h2>
            <p className="text-white/70">
              Le responsable du traitement des données personnelles est :
            </p>
            <ul className="text-white/70 list-none space-y-2 mt-4">
              <li><strong className="text-white">NDIGITAL</strong></li>
              <li>Strasbourg, France</li>
              <li>Email : contact@ndigital.fr</li>
              <li>Téléphone : 06 89 12 99 55</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">3. Données collectées</h2>
            <p className="text-white/70">
              Nous pouvons collecter les données suivantes :
            </p>
            <ul className="text-white/70 list-disc list-inside space-y-2 mt-4">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Nom de l'entreprise</li>
              <li>Données de navigation (cookies, adresse IP)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">4. Finalités du traitement</h2>
            <p className="text-white/70">
              Vos données personnelles sont collectées pour :
            </p>
            <ul className="text-white/70 list-disc list-inside space-y-2 mt-4">
              <li>Répondre à vos demandes de contact</li>
              <li>Vous fournir des devis personnalisés</li>
              <li>Améliorer notre site et nos services</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">5. Base légale</h2>
            <p className="text-white/70">
              Le traitement de vos données repose sur :
            </p>
            <ul className="text-white/70 list-disc list-inside space-y-2 mt-4">
              <li>Votre consentement explicite</li>
              <li>L'exécution d'un contrat</li>
              <li>Nos intérêts légitimes (amélioration des services)</li>
              <li>Le respect d'obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">6. Durée de conservation</h2>
            <p className="text-white/70">
              Vos données personnelles sont conservées pendant une durée de 3 ans à compter de votre dernier contact avec nous, sauf obligation légale de conservation plus longue.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">7. Vos droits</h2>
            <p className="text-white/70">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="text-white/70 list-disc list-inside space-y-2 mt-4">
              <li><strong className="text-white">Droit d'accès :</strong> obtenir la confirmation du traitement de vos données</li>
              <li><strong className="text-white">Droit de rectification :</strong> corriger vos données inexactes</li>
              <li><strong className="text-white">Droit à l'effacement :</strong> demander la suppression de vos données</li>
              <li><strong className="text-white">Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong className="text-white">Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong className="text-white">Droit de limitation :</strong> limiter le traitement de vos données</li>
            </ul>
            <p className="text-white/70 mt-4">
              Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@ndigital.fr" className="text-electric-violet hover:underline">contact@ndigital.fr</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">8. Cookies</h2>
            <p className="text-white/70">
              Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez gérer vos préférences de cookies à tout moment via les paramètres de votre navigateur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">9. Sécurité</h2>
            <p className="text-white/70">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">10. Réclamation</h2>
            <p className="text-white/70">
              Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD, vous avez le droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-electric-violet hover:underline">www.cnil.fr</a>
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

export default PolitiqueConfidentialite;
