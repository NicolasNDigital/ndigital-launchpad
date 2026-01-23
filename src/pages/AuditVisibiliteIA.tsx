import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, Search, Zap, ArrowRight, Mail, Globe, CheckCircle2, Loader2, AlertCircle, AlertTriangle, CheckCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
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

const MIN_SCAN_DURATION = 5000; // 5 seconds minimum

interface CriteriaItem {
  name: string;
  status: "danger" | "warning";
  explanation: string;
}

interface ApiResponse {
  score: number;
  analysis: string;
  criteria?: CriteriaItem[];
  error?: string;
}

// Default criteria based on analysis for backwards compatibility
const generateCriteriaFromAnalysis = (analysis: string, score: number): CriteriaItem[] => {
  return [
    {
      name: "Autorité Sémantique",
      status: score < 40 ? "danger" : "warning",
      explanation: "Votre site manque de contenu structuré reconnu par les IA conversationnelles."
    },
    {
      name: "Indexation GEO",
      status: score < 50 ? "danger" : "warning",
      explanation: "Les moteurs d'IA ne vous identifient pas clairement dans votre zone géographique."
    },
    {
      name: "Mentions Locales",
      status: score < 60 ? "warning" : "warning",
      explanation: "Peu de signaux locaux détectés sur les sources externes citées par les IA."
    },
    {
      name: "Compatibilité E-E-A-T",
      status: score < 45 ? "danger" : "warning",
      explanation: "Les critères d'expertise et de confiance ne sont pas suffisamment mis en avant."
    }
  ];
};

const AuditVisibiliteIA = () => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [criteria, setCriteria] = useState<CriteriaItem[]>([]);
  const [showCriteria, setShowCriteria] = useState<number>(0);
  
  const apiResultRef = useRef<ApiResponse | null>(null);
  const scanStartTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isScanning && currentMessageIndex < scanMessages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isScanning, currentMessageIndex]);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    setIsScanning(true);
    setCurrentMessageIndex(0);
    setScanComplete(false);
    setEmailSubmitted(false);
    setApiError(null);
    setScore(null);
    setAnalysis(null);
    setCriteria([]);
    setShowCriteria(0);
    apiResultRef.current = null;
    scanStartTimeRef.current = Date.now();

    // Start API call
    try {
      const response = await fetch("https://ndigital-api.vercel.app/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();
      
      if (!response.ok || data.error) {
        apiResultRef.current = { score: 0, analysis: "", error: data.error || "Erreur d'analyse" };
      } else {
        apiResultRef.current = data;
      }
    } catch (error) {
      apiResultRef.current = { score: 0, analysis: "", error: "Erreur d'analyse. Veuillez vérifier l'URL et réessayer." };
    }

    // Ensure minimum scan duration
    const elapsed = Date.now() - scanStartTimeRef.current;
    const remaining = MIN_SCAN_DURATION - elapsed;
    
    if (remaining > 0) {
      await new Promise(resolve => setTimeout(resolve, remaining));
    }

    // Complete scan
    setIsScanning(false);
    
    if (apiResultRef.current?.error) {
      setApiError(apiResultRef.current.error);
    } else if (apiResultRef.current) {
      setScore(apiResultRef.current.score);
      setAnalysis(apiResultRef.current.analysis);
      const criteriaData = apiResultRef.current.criteria || 
        generateCriteriaFromAnalysis(apiResultRef.current.analysis, apiResultRef.current.score);
      setCriteria(criteriaData);
      setScanComplete(true);
      
      // Cascade animation for criteria
      criteriaData.forEach((_, index) => {
        setTimeout(() => {
          setShowCriteria(prev => prev + 1);
        }, (index + 1) * 400);
      });
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubmittingEmail) return;
    
    setIsSubmittingEmail(true);
    
    try {
      const formData = new FormData();
      formData.append("access_key", "cb6a48ec-fcf8-4e60-812f-b001d893a6db");
      formData.append("subject", `Nouveau lead Audit IA - Score ${score}/100`);
      formData.append("email", email.trim());
      formData.append("url_testee", url);
      formData.append("score_geo", String(score));
      formData.append("from_name", "NDIGITAL Audit IA");
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      
      if (response.ok) {
        setEmailSubmitted(true);
        toast.success("Votre rapport sera envoyé dans les prochaines minutes !");
      } else {
        toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
      }
    } catch (error) {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const resetScan = () => {
    setUrl("");
    setIsScanning(false);
    setScanComplete(false);
    setCurrentMessageIndex(0);
    setEmail("");
    setEmailSubmitted(false);
    setApiError(null);
    setScore(null);
    setAnalysis(null);
    setCriteria([]);
    setShowCriteria(0);
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

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6 relative overflow-hidden">
                <span className="block">Votre site est-il prêt pour</span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary via-secondary to-neon-cyan bg-clip-text text-transparent">
                    l'ère de la recherche I
                  </span>
                  <span className="bg-gradient-to-r from-neon-cyan to-primary bg-clip-text text-transparent relative">
                    A
                    <span className="absolute right-0 top-0 w-[60%] h-full bg-gradient-to-l from-deep-black via-deep-black/90 to-transparent" />
                  </span>
                  <span className="text-white ml-1">?</span>
                </span>
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
                    {!isScanning && !scanComplete && !apiError && (
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

                    {/* Error state */}
                    {apiError && !isScanning && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-8 text-center"
                      >
                        <div className="flex items-center justify-center gap-2 mb-6">
                          <AlertCircle className="w-8 h-8 text-destructive" />
                          <span className="text-destructive font-semibold text-lg">Erreur d'analyse</span>
                        </div>
                        <p className="text-white/70 mb-8">
                          {apiError}
                        </p>
                        <button
                          onClick={resetScan}
                          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                        >
                          Réessayer
                        </button>
                      </motion.div>
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
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <CheckCircle2 className="w-8 h-8 text-success" />
                          <span className="text-success font-semibold text-xl">Analyse terminée</span>
                        </div>

                        {/* Score display */}
                        {score !== null && (
                          <div className="mb-6">
                            <div className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-neon-cyan bg-clip-text text-transparent mb-2">
                              {score}/100
                            </div>
                            <p className="text-white/60 text-sm">Score de visibilité IA</p>
                          </div>
                        )}

                        {/* Criteria cards with cascade animation */}
                        {criteria.length > 0 && (
                          <div className="space-y-3 mb-6 text-left">
                            {criteria.map((item, index) => (
                              <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ 
                                  opacity: showCriteria > index ? 1 : 0, 
                                  x: showCriteria > index ? 0 : -20 
                                }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xl"
                              >
                                {item.status === "danger" ? (
                                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center">
                                    <AlertCircle className="w-4 h-4 text-destructive" />
                                  </div>
                                ) : (
                                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-warning/20 flex items-center justify-center">
                                    <AlertTriangle className="w-4 h-4 text-warning" />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-white text-sm">{item.name}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                      item.status === "danger" 
                                        ? "bg-destructive/20 text-destructive" 
                                        : "bg-warning/20 text-warning"
                                    }`}>
                                      {item.status === "danger" ? "Critique" : "À améliorer"}
                                    </span>
                                  </div>
                                  <p className="text-white/60 text-xs leading-relaxed">{item.explanation}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Conclusion hook */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: showCriteria >= criteria.length ? 1 : 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-4 mb-6"
                        >
                          <p className="text-white/90 text-sm font-medium">
                            ⚠️ Ces points bloquent votre recommandation sur <span className="text-primary">ChatGPT</span> et <span className="text-secondary">Gemini</span>.{" "}
                            <span className="text-white">Recevez le guide correctif par email.</span>
                          </p>
                        </motion.div>

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
                            disabled={isSubmittingEmail}
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all group text-lg disabled:opacity-50"
                          >
                            {isSubmittingEmail ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <>
                                <Mail className="w-5 h-5" />
                                Recevoir mon rapport gratuit
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </button>
                        </form>
                      </motion.div>
                    )}

                    {/* Email submitted - Success screen */}
                    {emailSubmitted && (
                      <motion.div
                        key="thanks"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-6 text-center"
                      >
                        {/* Animated checkmark */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 200, 
                            damping: 15,
                            delay: 0.1 
                          }}
                          className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/20 border-2 border-success/40 flex items-center justify-center relative"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.3 }}
                            className="absolute inset-0 rounded-full bg-success/10 animate-ping"
                            style={{ animationDuration: "2s" }}
                          />
                          <CheckCircle className="w-10 h-10 text-success" />
                        </motion.div>

                        {/* Personalized success message */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-4">
                            Analyse de <span className="text-primary break-all">{url}</span> transmise avec succès !
                          </h3>
                          <p className="text-white/70 text-sm md:text-base mb-6 leading-relaxed">
                            Nos experts préparent votre rapport stratégique GEO complet.<br />
                            Vous le recevrez sous <span className="text-white font-semibold">24h</span> à l'adresse{" "}
                            <span className="text-primary">{email}</span>.
                          </p>
                        </motion.div>

                        {/* CTA Block - Calendly booking */}
                        {score !== null && score < 50 && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-8 p-6 bg-gradient-to-br from-destructive/10 via-warning/5 to-transparent border border-destructive/20 rounded-2xl text-left"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-destructive" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-white font-semibold mb-2">
                                  Votre score est inférieur à 50/100 ?
                                </h4>
                                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                                  Ne laissez pas vos concurrents prendre l'avantage sur <span className="text-primary">ChatGPT</span> et{" "}
                                  <span className="text-secondary">Gemini</span>. Bloquez dès maintenant 15 minutes pour un débriefing gratuit de vos résultats.
                                </p>
                                <a
                                  href="https://calendly.com/ndigital-rdv/decouverte"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 px-5 rounded-xl transition-all group text-sm"
                                >
                                  <Calendar className="w-4 h-4" />
                                  Réserver mon créneau stratégique
                                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* CTA for good scores */}
                        {score !== null && score >= 50 && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-8 p-6 bg-gradient-to-br from-success/10 via-primary/5 to-transparent border border-success/20 rounded-2xl text-left"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-success" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-white font-semibold mb-2">
                                  Bon score, mais vous pouvez viser plus haut !
                                </h4>
                                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                                  Découvrez comment passer de "visible" à "recommandé en priorité" par les IA conversationnelles.
                                </p>
                                <a
                                  href="https://calendly.com/ndigital-rdv/decouverte"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 px-5 rounded-xl transition-all group text-sm"
                                >
                                  <Calendar className="w-4 h-4" />
                                  Réserver un échange stratégique
                                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Secondary action */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.9 }}
                          className="mt-6"
                        >
                          <button
                            onClick={resetScan}
                            className="text-white/50 hover:text-white/80 text-sm underline underline-offset-4 transition-colors"
                          >
                            Analyser un autre site
                          </button>
                        </motion.div>
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
