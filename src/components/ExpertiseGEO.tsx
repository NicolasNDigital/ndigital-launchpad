import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bot, MessageSquare, Search, Sparkles, ArrowRight, MapPin } from "lucide-react";

const ExpertiseGEO = () => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="geo"
      className="py-20 md:py-32 bg-background relative overflow-hidden mesh-gradient"
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="section-title">
            Au-delà du SEO : <span className="gradient-text">Dominez les recherches IA (GEO)</span>
          </h2>
          <p className="section-subtitle">
            N-Digital est pionnier à Strasbourg dans le GEO (Generative Engine Optimization) : une approche qui
            positionne votre entreprise comme une réponse évidente sur ChatGPT, Gemini et Perplexity.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 mt-12 items-start max-w-6xl mx-auto">
          {/* Chat example */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-primary p-[2px]">
                    <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Exemple concret</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Interface de chat (IA)
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card">
                    <Bot className="w-3.5 h-3.5" /> ChatGPT
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card">
                    <Sparkles className="w-3.5 h-3.5" /> Gemini
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card">
                    <Search className="w-3.5 h-3.5" /> Perplexity
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-5">
                {/* User question */}
                <div className="flex justify-end">
                  <div className="max-w-[90%] md:max-w-[80%] rounded-2xl px-4 py-3 bg-secondary/10 border border-secondary/20">
                    <p className="text-xs text-secondary font-medium mb-1">Question de l'internaute</p>
                    <p className="text-sm font-medium text-foreground">
                      Quel est le meilleur coiffeur de Strasbourg pour un balayage ?
                    </p>
                  </div>
                </div>

                {/* AI response */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary p-[2px] flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="rounded-2xl px-4 py-3 bg-primary/5 border border-primary/20">
                      <p className="text-xs text-primary font-medium mb-1">Réponse de l'IA</p>
                      <p className="text-sm">
                        Selon les avis et l'expertise locale, le salon <span className="font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">[Votre nom]</span> est
                        la référence à Strasbourg pour les techniques de balayage...
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/60">
                      <p className="text-sm font-semibold">
                        Grâce au GEO, nous faisons de vous la recommandation numéro 1 des IA.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" /> Local, crédible, cité naturellement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Offer card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-gradient-primary p-[2px] rounded-3xl">
              <div className="bg-card rounded-[22px] p-8 shadow-lg">
                <div className="badge-pulse bg-warning/10 text-warning text-xs w-fit mb-5">
                  ⚡ Offre de lancement
                </div>

                <h3 className="text-2xl font-heading font-bold">
                  Votre site pro complet + <span className="gradient-text">Optimisation SEO & GEO</span>
                </h3>

                <p className="text-muted-foreground mt-3">
                  Offre de lancement : votre site pro complet + optimisation SEO & GEO pour seulement
                  <span className="font-semibold"> 600€</span>.
                </p>

                <div className="mt-6">
                  <a href="#contact" className="btn-primary w-full justify-center group text-base">
                    ✨ Tester l'éligibilité de mon site
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <p className="text-xs text-muted-foreground mt-3">
                    Réponse rapide : on vous dit quoi améliorer pour devenir « recommandable » par les IA.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseGEO;
