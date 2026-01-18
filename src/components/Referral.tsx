import { Gift, Users, Euro } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Referral = () => {
  const benefits = [
    {
      icon: Gift,
      title: "100€ offerts",
      description: "Pour vous, pour chaque nouveau client signé grâce à votre recommandation"
    },
    {
      icon: Users,
      title: "-10% pour votre filleul",
      description: "Votre filleul bénéficie d'une réduction de 10% sur sa première commande"
    },
    {
      icon: Euro,
      title: "Sans limite",
      description: "Parrainez autant de personnes que vous le souhaitez, cumulez vos récompenses"
    }
  ];

  return (
    <section className="py-20 bg-deep-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-electric-violet/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-full bg-electric-violet/20 flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-electric-violet" />
          </div>
          <span className="inline-block px-4 py-2 rounded-full bg-electric-violet/20 text-electric-violet text-sm font-medium mb-4">
            Programme de parrainage
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Recommandez <span className="gradient-text">NDIGITAL</span> et gagnons ensemble
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Vous êtes satisfait de nos services ? Partagez-les avec vos contacts et profitez d'avantages exclusifs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-electric-violet/50 transition-all duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-electric-violet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-electric-violet/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-electric-violet" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/60 text-sm">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/parrainage"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-electric-violet hover:bg-electric-violet/90 text-white font-semibold transition-all duration-300 hover:scale-105"
          >
            ✨ Découvrir le programme
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Referral;
