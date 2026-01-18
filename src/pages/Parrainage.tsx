import { Link } from "react-router-dom";
import { ArrowLeft, Gift, Users, Euro, CheckCircle2 } from "lucide-react";

const Parrainage = () => {
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

        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 gradient-text">
          Modalités de Parrainage
        </h1>
        
        <p className="text-xl text-white/70 mb-12 max-w-2xl">
          Recommandez NDIGITAL à vos contacts et bénéficiez d'avantages exclusifs pour chaque nouveau client que vous nous apportez.
        </p>

        {/* Avantages */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-electric-violet/20 flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-electric-violet" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-2">100€ offerts</h3>
            <p className="text-white/60">
              Pour vous, pour chaque nouveau client signé grâce à votre recommandation
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-electric-violet/20 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-electric-violet" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-2">-10% pour votre filleul</h3>
            <p className="text-white/60">
              Votre filleul bénéficie d'une réduction de 10% sur sa première commande
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-electric-violet/20 flex items-center justify-center mx-auto mb-4">
              <Euro className="w-8 h-8 text-electric-violet" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-2">Sans limite</h3>
            <p className="text-white/60">
              Parrainez autant de personnes que vous le souhaitez, cumulez vos récompenses
            </p>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">1. Principe du parrainage</h2>
            <p className="text-white/70">
              Le programme de parrainage NDIGITAL permet à tout client existant (le "Parrain") de recommander nos services à un tiers (le "Filleul"). En cas de signature d'un contrat par le Filleul, le Parrain et le Filleul bénéficient chacun d'avantages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">2. Conditions d'éligibilité</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Pour le Parrain :</h3>
                <ul className="text-white/70 space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-electric-violet mt-0.5 flex-shrink-0" />
                    <span>Être un client actuel ou passé de NDIGITAL</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-electric-violet mt-0.5 flex-shrink-0" />
                    <span>Avoir réglé l'intégralité de ses factures</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Pour le Filleul :</h3>
                <ul className="text-white/70 space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-electric-violet mt-0.5 flex-shrink-0" />
                    <span>Ne jamais avoir été client de NDIGITAL</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-electric-violet mt-0.5 flex-shrink-0" />
                    <span>Commander une prestation d'un montant minimum de 900€ HT</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">3. Comment parrainer ?</h2>
            <ol className="text-white/70 list-decimal list-inside space-y-3">
              <li>Communiquez les coordonnées de votre filleul à NDIGITAL par email ou téléphone</li>
              <li>Votre filleul doit mentionner votre nom lors de sa prise de contact</li>
              <li>Le parrainage doit être déclaré avant la signature du devis par le filleul</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">4. Récompenses</h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-electric-violet/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-electric-violet font-bold">P</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">Parrain</h4>
                  <p className="text-white/70">100€ offerts en avoir, utilisable sur une prochaine prestation ou remboursable sous forme de virement</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-electric-violet/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-electric-violet font-bold">F</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">Filleul</h4>
                  <p className="text-white/70">-10% de réduction sur le montant total de sa première commande</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">5. Versement des récompenses</h2>
            <p className="text-white/70">
              La récompense du Parrain est versée sous 30 jours suivant le règlement complet de la première facture du Filleul. La réduction du Filleul est appliquée directement sur son devis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">6. Limitations</h2>
            <ul className="text-white/70 list-disc list-inside space-y-2">
              <li>Un Filleul ne peut être parrainé qu'une seule fois</li>
              <li>Le parrainage n'est pas applicable aux prestations promotionnelles</li>
              <li>NDIGITAL se réserve le droit de modifier ou d'interrompre ce programme à tout moment</li>
              <li>En cas de litige, la décision de NDIGITAL sera définitive</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">7. Contact</h2>
            <p className="text-white/70">
              Pour toute question concernant le programme de parrainage, contactez-nous :
            </p>
            <ul className="text-white/70 list-none space-y-2 mt-4">
              <li>Email : <a href="mailto:contact@ndigital.fr" className="text-electric-violet hover:underline">contact@ndigital.fr</a></li>
              <li>Téléphone : <a href="tel:0689129955" className="text-electric-violet hover:underline">06 89 12 99 55</a></li>
            </ul>
          </section>
        </div>

        <p className="text-white/40 text-sm mt-12">
          Dernière mise à jour : Janvier 2026
        </p>
      </div>
    </div>
  );
};

export default Parrainage;
