import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PenLine, Camera, FileStack, MapPin, ArrowRight } from "lucide-react";
import nicolasPhoto from "@/assets/nicolas-photo.png";

const WhyMe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const arguments_ = [
    {
      icon: PenLine,
      number: "01",
      problem: "Votre site ne convertit pas ?",
      title: "Copywriting Expert",
      subtitle: "5 ans d'expérience",
      description: "Le copywriting, c'est l'art d'écrire pour vendre. Chaque mot est pensé pour convaincre et transformer vos visiteurs en clients.",
    },
    {
      icon: Camera,
      number: "02",
      problem: "Photos vues 1000 fois ?",
      title: "Visuels Uniques",
      subtitle: "Création sur-mesure",
      description: "Fini les images Shutterstock. Je crée des visuels uniques qui reflètent vraiment votre activité et vous démarquent.",
    },
    {
      icon: FileStack,
      number: "03",
      problem: "Une simple vitrine ne suffit plus ?",
      title: "Sites Stratégiques",
      subtitle: "Multi-pages expertes",
      description: "Au-delà de la vitrine, je crée des pages qui démontrent votre expertise et touchent vos clients en plein cœur.",
    },
    {
      icon: MapPin,
      number: "04",
      problem: "Invisible sur Google ?",
      title: "SEO Local",
      subtitle: "Expert Strasbourg",
      description: "Basé à Strasbourg, je connais le marché alsacien. Votre site apparaîtra quand vos clients locaux vous cherchent.",
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-36 bg-deep-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-electric-violet/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with Photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-20"
        >
          {/* Photo */}
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-neon-cyan/30 shadow-[0_0_40px_rgba(0,212,255,0.15)]">
              <img 
                src={nicolasPhoto} 
                alt="Nicolas - Créateur de sites vitrines à Strasbourg" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 px-3 py-1.5 bg-gradient-to-r from-neon-cyan to-electric-violet rounded-lg text-xs font-bold text-deep-black">
              NDIGITAL
            </div>
          </div>

          {/* Title */}
          <div className="text-center md:text-left">
            <p className="text-neon-cyan text-sm uppercase tracking-[0.2em] mb-3 font-medium">Pourquoi me faire confiance</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
              Ce que j'apporte à<br />
              <span className="gradient-text">votre projet</span>
            </h2>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {arguments_.map((arg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * index }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-neon-cyan/40 transition-all duration-500 overflow-hidden">
                {/* Number Background */}
                <div className="absolute top-4 right-4 text-7xl font-heading font-bold text-white/[0.03] select-none">
                  {arg.number}
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-electric-violet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Problem Tag */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric-violet/20 border border-electric-violet/40 mb-5">
                    <span className="w-2 h-2 rounded-full bg-electric-violet" />
                    <span className="text-white/90 text-sm font-medium">{arg.problem}</span>
                  </div>

                  {/* Icon + Title Row */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-cyan/5 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all duration-500">
                      <arg.icon className="w-7 h-7 text-neon-cyan" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-white mb-1">
                        {arg.title}
                      </h3>
                      <p className="text-neon-cyan/80 text-sm font-medium">{arg.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 leading-relaxed pl-[72px]">
                    {arg.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    <ArrowRight className="w-5 h-5 text-neon-cyan" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-gradient-to-r from-neon-cyan/10 via-electric-violet/10 to-neon-cyan/10 border border-white/10">
            <span className="text-3xl">🎯</span>
            <div className="text-left">
              <p className="text-white font-semibold text-lg">4-5 projets par mois maximum</p>
              <p className="text-white/50 text-sm">Pour garantir qualité et disponibilité</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyMe;
