import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, Search, Zap, ArrowRight, Mail, Globe, CheckCircle2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const scanMessages = [
  "Connexion aux moteurs d'IA...",
  "Analyse des données structurées...",
  "Vérification de l'indexation sémantique...",
  "Scan des mentions locales...",
  "Test de recommandation conversationnelle...",
  "Évaluation du score E-E-A-T...",
  "Analyse de la cohérence NAP...",
  "Vérification de la compatibilité GEO...",
  "Compilation des résultats...",
];

const AuditVisibiliteIA = () => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    if (isScanning && currentMessageIndex < scanMessages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else if (isScanning && currentMessageIndex >= scanMessages.length) {
      setTimeout(() => {
        setIsScanning(false);
        setScanComplete(true);
      }, 500);
    }
  }, [isScanning, currentMessageIndex]);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setIsScanning(true);
    setCurrentMessageIndex(0);
    setScanComplete(false);
    setEmailSubmitted(false);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailSubmitted(true);
  };

  const resetScan = () => {
    setUrl("");
    setIsScanning(false);
    setScanComplete(false);
    setCurrentMessageIndex(0);
    setEmail("");
    setEmailSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-deep-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-black via-deep-black to-primary/10" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-cyan/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Header */}
      <header className="relative z-10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="NDIGITAL Logo" className="h-10 w-auto" />
            </Link>
            <Link to="/" className="text-white/70 hover:text-white text-sm transition-colors">
              ← Retour au site
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm mb-8">
                <Sparkles className="w-4 h-4" />
                Outil de diagnostic GEO gratuit
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
                Votre entreprise est-elle prête pour{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-neon-cyan bg-clip-text text-transparent">
                  l'ère de l'IA
                </span>{" "}
                ?
              </h1>

              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12">
                Analysez en 10 secondes si ChatGPT, Gemini et Perplexity recommandent vos services à Strasbourg.
              </p>
            </motion.div>

            {/* AI Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center gap-4 mb-12"
            >
              {[
                { icon: Bot, label: "ChatGPT" },
                { icon: Sparkles, label: "Gemini" },
                { icon: Search, label: "Perplexity" },
              ].map((ai, index) => (
                <div
                  key={ai.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <ai.icon className="w-4 h-4 text-primary" />
                  <span className="text-white/80 text-sm">{ai.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Scanner Interface */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="p-[2px] rounded-3xl bg-gradient-to-r from-primary via-secondary to-neon-cyan">
                <div className="bg-deep-black rounded-[22px] p-8 md:p-10">
                  
                  <AnimatePresence mode="wait">
                    {/* Initial state - URL input */}
                    {!isScanning && !scanComplete && (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleScan}
                        className="space-y-6"
                      >
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://votre-site.fr"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-lg"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all group text-lg"
                        >
                          <Zap className="w-5 h-5" />
                          Lancer le diagnostic GEO
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.form>
                    )}

                    {/* Scanning state */}
                    {isScanning && (
                      <motion.div
                        key="scanning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-8"
                      >
                        <div className="flex items-center justify-center gap-3 mb-8">
                          <Loader2 className="w-6 h-6 text-primary animate-spin" />
                          <span className="text-white font-semibold text-lg">Scan en cours...</span>
                        </div>

                        {/* Progress bar */}
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-8">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                            initial={{ width: "0%" }}
                            animate={{ width: `${((currentMessageIndex + 1) / scanMessages.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>

                        {/* Scrolling messages */}
                        <div className="h-32 overflow-hidden relative">
                          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-deep-black to-transparent z-10" />
                          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-deep-black to-transparent z-10" />
                          <motion.div
                            className="space-y-3"
                            animate={{ y: -currentMessageIndex * 36 }}
                            transition={{ duration: 0.3 }}
                          >
                            {scanMessages.map((message, index) => (
                              <div
                                key={index}
                                className={`flex items-center gap-3 justify-center transition-all duration-300 ${
                                  index === currentMessageIndex
                                    ? "text-primary text-base"
                                    : index < currentMessageIndex
                                    ? "text-white/30 text-sm"
                                    : "text-white/20 text-sm"
                                }`}
                              >
                                {index < currentMessageIndex && (
                                  <CheckCircle2 className="w-4 h-4 text-success" />
                                )}
                                {index === currentMessageIndex && (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                )}
                                <span>{message}</span>
                              </div>
                            ))}
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {/* Complete state - Email capture */}
                    {scanComplete && !emailSubmitted && (
                      <motion.div
                        key="complete"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-4"
                      >
                        <div className="flex items-center justify-center gap-2 mb-6">
                          <CheckCircle2 className="w-8 h-8 text-success" />
                          <span className="text-success font-semibold text-xl">Analyse terminée</span>
                        </div>

                        <p className="text-white/80 mb-8 text-lg">
                          Pour recevoir votre <span className="text-primary font-semibold">score de visibilité IA détaillé</span> et nos conseils d'optimisation, entrez votre adresse email.
                        </p>

                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="votre@email.fr"
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-lg"
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all group text-lg"
                          >
                            <Mail className="w-5 h-5" />
                            Recevoir mon rapport gratuit
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </form>
                      </motion.div>
                    )}

                    {/* Email submitted - Thank you */}
                    {emailSubmitted && (
                      <motion.div
                        key="thanks"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-8 text-center"
                      >
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center">
                          <CheckCircle2 className="w-10 h-10 text-success" />
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-white mb-3">
                          Merci !
                        </h3>
                        <p className="text-white/70 mb-8">
                          Votre rapport de visibilité IA sera envoyé à <span className="text-primary">{email}</span> dans les prochaines minutes.
                        </p>
                        <button
                          onClick={resetScan}
                          className="text-primary hover:text-primary/80 text-sm underline underline-offset-4 transition-colors"
                        >
                          Analyser un autre site
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex flex-wrap justify-center gap-6 text-white/50 text-sm"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                100% gratuit
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                Sans engagement
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                Résultats en 24h
              </span>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuditVisibiliteIA;
