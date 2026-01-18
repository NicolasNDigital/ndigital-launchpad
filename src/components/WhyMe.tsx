import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PenLine, Camera, FileStack, MapPin } from "lucide-react";
import nicolasPhoto from "@/assets/nicolas-photo.png";

const WhyMe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const arguments_ = [
    {
      icon: PenLine,
      problem: "Votre site web ne convertit pas ?",
      title: "5 ans de Copywriting",
      description: "Le copywriting, c'est l'art d'écrire pour vendre. Chaque mot de votre site est pensé pour convaincre, rassurer et transformer vos visiteurs en clients.",
      align: "left" as const,
    },
    {
      icon: Camera,
      problem: "Marre des photos vues 1000 fois ?",
      title: "Visuels sur-mesure",
      description: "Fini les images Shutterstock que tout le monde utilise. Je crée des photos et visuels uniques qui reflètent vraiment votre activité et vous démarquent.",
      align: "right" as const,
    },
    {
      icon: FileStack,
      problem: "Un simple site vitrine ne suffit plus ?",
      title: "Sites multi-pages stratégiques",
      description: "Au-delà de la vitrine classique, je crée des pages qui démontrent votre expertise. Vos futurs clients comprendront exactement pourquoi vous êtes LE bon choix.",
      align: "left" as const,
    },
    {
      icon: MapPin,
      problem: "Invisible sur Google à Strasbourg ?",
      title: "Expert SEO Local",
      description: "Basé à Strasbourg, je connais le marché alsacien sur le bout des doigts. Votre site sera optimisé pour apparaître quand vos clients locaux vous cherchent.",
      align: "right" as const,
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 bg-deep-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-px h-1/2 bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent" />
        <div className="absolute top-1/4 right-0 w-px h-1/2 bg-gradient-to-b from-transparent via-electric-violet/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title with Photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex flex-col items-center gap-6 mb-6">
            <div className="relative">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-neon-cyan/30 shadow-2xl">
                <img 
                  src={nicolasPhoto} 
                  alt="Nicolas - Créateur de sites vitrines à Strasbourg" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-neon-cyan rounded-full flex items-center justify-center border-2 border-deep-black">
                <span className="text-sm">👋</span>
              </div>
            </div>
            <div>
              <p className="text-white/50 text-sm uppercase tracking-widest mb-3">Ce que j'apporte à votre projet</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white">
                Bien plus qu'un <span className="gradient-text">simple site web</span>
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Staggered Grid */}
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-0">
          {arguments_.map((arg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: arg.align === "left" ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.15 }}
              className={`flex ${arg.align === "right" ? "md:justify-end" : "md:justify-start"} ${index > 0 ? "md:-mt-12" : ""}`}
            >
              <div className={`w-full md:w-[65%] p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-neon-cyan/30 transition-all duration-300 group`}>
                {/* Problem Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric-violet/10 border border-electric-violet/20 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-violet animate-pulse" />
                  <span className="text-electric-violet text-sm font-medium">{arg.problem}</span>
                </div>

                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-electric-violet/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <arg.icon className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-2">
                      {arg.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {arg.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-neon-cyan/5 to-electric-violet/5 border border-white/10">
            <span className="text-2xl">🎯</span>
            <p className="text-base md:text-lg text-white/90">
              Je prends <strong className="text-white">4-5 projets par mois max</strong> pour garantir qualité et disponibilité.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyMe;
