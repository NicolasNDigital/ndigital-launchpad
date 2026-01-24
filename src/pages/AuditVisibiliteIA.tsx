import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, Search, Zap, ArrowRight, Mail, Globe, CheckCircle2, Loader2, AlertCircle, AlertTriangle, CheckCircle, Calendar, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const scanMessages = [
  "Connexion aux moteurs IA (ChatGPT, Gemini, Perplexity)...",
  "Scan des données structurées (Schema.org)...",
  "Analyse de la citabilité sur Perplexity & Gemini...",
  "Vérification de l'autorité sémantique...",
  "Évaluation de l'indexation GEO en cours...",
  "Analyse de l'E-E-A-T (Expertise, Expérience, Autorité, Confiance)...",
  "Test de recommandation conversationnelle...",
  "Analyse des mentions locales et cohérence NAP...",
  "Vérification de la compatibilité mobile & Core Web Vitals...",
  "Évaluation du maillage interne sémantique...",
  "Génération des recommandations stratégiques...",
  "Compilation du rapport final...",
];

const MIN_SCAN_DURATION = 15000; // 15 seconds minimum for realistic analysis feel

// Structure for displaying pilier results
interface PilierDisplay {
  name: string;
  key: string;
  score?: number;
  status: 'critique' | 'ameliorer' | 'ok';
  analyse_detaillee?: string;
  points_forts: string[];
  points_faibles: string[];
  actions_preview: string[];
  actions_full: string[]; // Full list of actions for expert email
  actions_cachees_count: number;
}

// API pilier structure (can be in array or object format)
interface ApiPilierItem {
  name?: string;
  label?: string; // API uses "label" for pillar titles
  key?: string;
  score?: number;
  status?: string;
  analyse_detaillee?: string;
  points_forts?: string[];
  points_faibles?: string[];
  actions_preview?: string[];
  actions_full?: string[]; // Full list of actions from API
  actions_cachees_count?: number;
  recommandation?: string;
}

// API response structure with piliers (supports both array and object formats)
interface ApiResponse {
  score: number;
  analysis?: string;
  piliers?: ApiPilierItem[] | {
    citabilite?: ApiPilierItem;
    autorite?: ApiPilierItem;
    geo?: ApiPilierItem;
    eeat?: ApiPilierItem;
  };
  conclusion_strategique?: string;
  error?: string;
}

// Pilier labels mapping
const pilierLabels: Record<string, string> = {
  citabilite: "Citabilité IA",
  autorite: "Autorité Sémantique",
  geo: "Indexation GEO",
  eeat: "Compatibilité E-E-A-T"
};

// Default actions fallback
const defaultActionsPreview: Record<string, string[]> = {
  citabilite: ["Ajouter des FAQ structurées avec balisage Schema.org", "Créer des réponses directes en début de paragraphe"],
  autorite: ["Créer des contenus piliers approfondis (guides, études de cas)", "Développer le maillage interne thématique"],
  geo: ["Implémenter les données structurées LocalBusiness", "Optimiser les pages pour les requêtes géolocalisées"],
  eeat: ["Ajouter une page équipe avec biographies détaillées", "Intégrer des témoignages clients vérifiables"]
};

// Determine status from string or score
const getStatusFromData = (status?: string, score?: number): 'critique' | 'ameliorer' | 'ok' => {
  // First try to parse from status string
  if (status) {
    const s = status.toLowerCase();
    if (s.includes('critique') || s.includes('critical') || s.includes('rouge')) return 'critique';
    if (s.includes('ok') || s.includes('bon') || s.includes('vert') || s.includes('good')) return 'ok';
    return 'ameliorer';
  }
  // Fallback to score-based determination
  if (score === undefined) return 'ameliorer';
  if (score < 40) return 'critique';
  if (score < 70) return 'ameliorer';
  return 'ok';
};

// Generate piliers display from API response (handles both array and object formats)
const generatePiliersFromApi = (piliers: ApiResponse['piliers'], globalScore: number): PilierDisplay[] => {
  if (!piliers) {
    console.log("generatePiliersFromApi: piliers is null/undefined");
    return [];
  }
  
  console.log("generatePiliersFromApi input:", JSON.stringify(piliers, null, 2));
  
  // Handle ARRAY format (new API structure)
  if (Array.isArray(piliers)) {
    console.log("generatePiliersFromApi: detected ARRAY format with", piliers.length, "items");
    return piliers.map((pilier, index) => {
      const key = pilier.key || pilier.name?.toLowerCase().replace(/\s+/g, '_') || `pilier_${index}`;
      // PRIORITY: item.label from API is the main title source
      const name = pilier.label || pilier.name || pilierLabels[key] || `Pilier ${index + 1}`;
      const status = getStatusFromData(pilier.status, pilier.score);
      // Display ALL actions from actions_preview (no limit)
      const actionsPreview = pilier.actions_preview && pilier.actions_preview.length > 0 
        ? pilier.actions_preview 
        : defaultActionsPreview[key] || [];
      // Full actions list for expert email - use actions_full if available, fallback to actions_preview
      const actionsFull = pilier.actions_full && pilier.actions_full.length > 0 
        ? pilier.actions_full 
        : pilier.actions_preview || defaultActionsPreview[key] || [];
      const actionsCacheesCount = pilier.actions_cachees_count ?? Math.max(3, Math.floor(Math.random() * 4) + 3);
      
      console.log(`Pilier ${index}: label="${pilier.label}", name="${pilier.name}", final="${name}", actions_full count=${actionsFull.length}`);
      
      return {
        name,
        key,
        score: pilier.score,
        status,
        analyse_detaillee: pilier.analyse_detaillee || pilier.recommandation,
        points_forts: pilier.points_forts || [],
        points_faibles: pilier.points_faibles || [],
        actions_preview: actionsPreview,
        actions_full: actionsFull,
        actions_cachees_count: actionsCacheesCount
      };
    });
  }
  
  // Handle OBJECT format (legacy structure)
  console.log("generatePiliersFromApi: detected OBJECT format");
  const pilierKeys = ['citabilite', 'autorite', 'geo', 'eeat'] as const;
  const piliersObj = piliers as { citabilite?: ApiPilierItem; autorite?: ApiPilierItem; geo?: ApiPilierItem; eeat?: ApiPilierItem };
  
  return pilierKeys
    .filter(key => piliersObj[key])
    .map(key => {
      const pilier = piliersObj[key]!;
      const status = getStatusFromData(pilier.status, pilier.score);
      // Display ALL actions from actions_preview (no limit)
      const actionsPreview = pilier.actions_preview && pilier.actions_preview.length > 0 
        ? pilier.actions_preview 
        : defaultActionsPreview[key] || [];
      // Full actions list for expert email
      const actionsFull = pilier.actions_full && pilier.actions_full.length > 0 
        ? pilier.actions_full 
        : pilier.actions_preview || defaultActionsPreview[key] || [];
      const actionsCacheesCount = pilier.actions_cachees_count ?? Math.max(3, Math.floor(Math.random() * 4) + 3);
      
      // PRIORITY: item.label from API is the main title source
      const name = pilier.label || pilier.name || pilierLabels[key] || key;
      
      return {
        name,
        key,
        score: pilier.score,
        status,
        analyse_detaillee: pilier.analyse_detaillee || pilier.recommandation,
        points_forts: pilier.points_forts || [],
        points_faibles: pilier.points_faibles || [],
        actions_preview: actionsPreview,
        actions_full: actionsFull,
        actions_cachees_count: actionsCacheesCount
      };
    });
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
  const [piliers, setPiliers] = useState<PilierDisplay[]>([]);
  const [showPiliers, setShowPiliers] = useState<number>(0);
  const [conclusionStrategique, setConclusionStrategique] = useState<string | null>(null);
  
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
    setPiliers([]);
    setShowPiliers(0);
    setConclusionStrategique(null);
    apiResultRef.current = null;
    scanStartTimeRef.current = Date.now();

    // Start API call with robust error handling
    try {
      console.log("🔍 Starting API call to: https://ndigital-api.vercel.app/api/analyze");
      console.log("📤 Request payload:", { url: url.trim() });
      
      const response = await fetch("https://ndigital-api.vercel.app/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      console.log("📥 Response status:", response.status, response.statusText);

      // Try to parse JSON, handle parse errors
      let data: ApiResponse;
      try {
        const rawText = await response.text();
        console.log("📄 Raw response (first 500 chars):", rawText.substring(0, 500));
        data = JSON.parse(rawText);
      } catch (parseError) {
        console.error("❌ JSON parse error:", parseError);
        apiResultRef.current = { 
          score: 0, 
          error: "Erreur de lecture de la réponse API. Le serveur a peut-être renvoyé une réponse invalide." 
        };
        throw new Error("JSON parse failed");
      }
      
      console.log("✅ Parsed API data:", data);
      
      if (!response.ok) {
        console.error("❌ HTTP error:", response.status);
        apiResultRef.current = { 
          score: 0, 
          error: data.error || `Erreur serveur (${response.status}). Veuillez réessayer.` 
        };
      } else if (data.error) {
        console.error("❌ API returned error:", data.error);
        apiResultRef.current = { score: 0, error: data.error };
      } else {
        apiResultRef.current = data;
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
      if (!apiResultRef.current) {
        apiResultRef.current = { 
          score: 0, 
          error: "Impossible de contacter l'API. Vérifiez votre connexion et réessayez." 
        };
      }
    }

    // Ensure minimum scan duration for UX
    const elapsed = Date.now() - scanStartTimeRef.current;
    const remaining = MIN_SCAN_DURATION - elapsed;
    
    if (remaining > 0) {
      await new Promise(resolve => setTimeout(resolve, remaining));
    }

    // CRITICAL: Always stop loading state, even on error
    setIsScanning(false);
    
    // Handle results or errors
    const data = apiResultRef.current;
    
    // DEBUG: Log received data for troubleshooting
    console.log('========== DONNÉES REÇUES ==========');
    console.log('Données reçues:', data);
    console.log('data.piliers:', data?.piliers);
    console.log('=====================================');
    
    // Safety check: if no data or no piliers, show error
    if (!data) {
      console.error("❌ No API result available");
      setApiError("Aucune réponse reçue de l'API. Veuillez réessayer.");
      setScanComplete(false);
      return;
    }
    
    if (data.error) {
      console.log("🚨 Setting error state:", data.error);
      setApiError(data.error);
      setScanComplete(false);
      return;
    }
    
    // Safety check for piliers
    if (!data.piliers) {
      console.warn("⚠️ No piliers in API response, using fallback");
    }
    
    try {
      console.log("🎯 Processing successful API response");
      setScore(data.score ?? 0);
      setAnalysis(data.analysis || null);
      setConclusionStrategique(data.conclusion_strategique || null);
      
      // Map API piliers to display format with error handling
      const piliersData = generatePiliersFromApi(data.piliers, data.score ?? 0);
      
      console.log("📊 API Response complète:", JSON.stringify(data, null, 2));
      console.log("📊 Mapped Piliers:", piliersData);
      console.log("📊 Nombre de piliers:", piliersData.length);
      
      // Log each pilier for debugging
      piliersData.forEach((p, i) => {
        console.log(`📊 Pilier ${i}: label="${p.name}", status="${p.status}"`);
      });
      
      setPiliers(piliersData);
      setScanComplete(true);
      
      console.log("✅ scanComplete set to TRUE, piliers count:", piliersData.length);
      
      // Cascade animation for piliers
      piliersData.forEach((_, index) => {
        setTimeout(() => {
          setShowPiliers(prev => prev + 1);
        }, (index + 1) * 400);
      });
    } catch (processingError) {
      console.error("❌ Error processing API data:", processingError);
      setApiError("Erreur lors du traitement des résultats. Format de données inattendu.");
      setScanComplete(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubmittingEmail) return;
    
    setIsSubmittingEmail(true);
    
    // Use the actual conclusion from API or provide meaningful fallback
    const conclusionText = conclusionStrategique || apiResultRef.current?.conclusion_strategique || "Analyse en cours de finalisation par notre équipe.";
    
    try {
      // Build detailed piliers text with FULL ACTIONS LIST for expert email
      const detailPoints = piliers.map((pilier) => {
        const scoreText = pilier.score !== undefined ? ` [${pilier.score}/100]` : '';
        const statusEmoji = pilier.status === 'critique' ? '🔴' : pilier.status === 'ameliorer' ? '🟠' : '🟢';
        const statusLabel = pilier.status === 'critique' ? 'CRITIQUE' : pilier.status === 'ameliorer' ? 'À AMÉLIORER' : 'BON';
        
        // Full detailed analysis - no truncation
        const analyseBlock = pilier.analyse_detaillee 
          ? `\n  📋 ANALYSE DÉTAILLÉE:\n  ${pilier.analyse_detaillee}`
          : '';
        
        // FULL ACTIONS LIST (actions_full) for expert email - not just preview
        const actionsBlock = pilier.actions_full && pilier.actions_full.length > 0 
          ? `\n\n  🛠️ LISTE COMPLÈTE DES ACTIONS (${pilier.actions_full.length} recommandations):\n${pilier.actions_full.map((a, i) => `     ${i + 1}. ${a}`).join('\n')}`
          : '';
        
        return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${statusEmoji} ${pilier.name}${scoreText} — ${statusLabel}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${analyseBlock}${actionsBlock}`;
      }).join('\n\n');

      // Calculate total actions for email stats
      const totalActions = piliers.reduce((sum, p) => sum + (p.actions_full?.length || 0), 0);

      const formData = new FormData();
      formData.append("access_key", "cb6a48ec-fcf8-4e60-812f-b001d893a6db");
      formData.append("subject", `🎯 NOUVEAU LEAD AUDIT IA - Score ${score}/100 - ${url}`);
      formData.append("from_name", "NDIGITAL Audit IA");
      
      // Structured fields for easy reading
      formData.append("1_URL_Testée", url);
      formData.append("2_Score_Global", `${score}/100`);
      formData.append("3_Email_Prospect", email.trim());
      formData.append("4_Total_Actions", `${totalActions} recommandations complètes`);
      formData.append("5_Conclusion_Stratégique", conclusionText);
      
      // Complete formatted message with rich content
      formData.append("message", `
╔══════════════════════════════════════════════════════════════╗
║           🎯 RAPPORT D'AUDIT VISIBILITÉ IA COMPLET           ║
╚══════════════════════════════════════════════════════════════╝

┌──────────────────────────────────────────────────────────────┐
│ 📌 INFORMATIONS DE BASE                                      │
└──────────────────────────────────────────────────────────────┘

  🌐 URL analysée: ${url}
  📊 Score global: ${score}/100
  📧 Email prospect: ${email.trim()}
  📅 Date d'analyse: ${new Date().toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}

┌──────────────────────────────────────────────────────────────┐
│ 📊 ANALYSE DÉTAILLÉE PAR PILIER                              │
└──────────────────────────────────────────────────────────────┘

${detailPoints}


┌──────────────────────────────────────────────────────────────┐
│ 🎯 CONCLUSION STRATÉGIQUE                                    │
└──────────────────────────────────────────────────────────────┘

${conclusionText}


┌──────────────────────────────────────────────────────────────┐
│ 📈 AIDE-MÉMOIRE EXPERT                                       │
└──────────────────────────────────────────────────────────────┘

  ✅ ${totalActions} recommandations stratégiques complètes ci-dessus
  → Lead intéressé par l'optimisation GEO/IA
  → Recommandation: Contacter sous 24h pour proposer un accompagnement

══════════════════════════════════════════════════════════════
`);
      
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
    setPiliers([]);
    setShowPiliers(0);
    setConclusionStrategique(null);
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

                        {/* Piliers cards with cascade animation - Expert dark design */}
                        {piliers.length > 0 && (
                          <div className="space-y-4 mb-6 text-left">
                            {piliers.map((pilier, index) => (
                              <motion.div
                                key={pilier.key}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ 
                                  opacity: showPiliers > index ? 1 : 0, 
                                  x: showPiliers > index ? 0 : -20 
                                }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="p-5 bg-deep-black/80 border border-white/10 rounded-xl backdrop-blur-sm"
                              >
                                {/* Pilier header with status icon */}
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <span className="text-xl">
                                      {pilier.status === 'critique' ? '🔴' : pilier.status === 'ameliorer' ? '🟠' : '🟢'}
                                    </span>
                                    <span className="font-bold text-white text-lg">{pilier.name}</span>
                                  </div>
                                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                                    pilier.status === 'critique' 
                                      ? 'bg-destructive/20 text-destructive border border-destructive/30' 
                                      : pilier.status === 'ameliorer'
                                      ? 'bg-warning/20 text-warning border border-warning/30'
                                      : 'bg-success/20 text-success border border-success/30'
                                  }`}>
                                    {pilier.status === 'critique' ? 'Critique' : pilier.status === 'ameliorer' ? 'À améliorer' : 'Bon'}
                                  </span>
                                </div>
                                
                                {/* Analyse détaillée */}
                                {pilier.analyse_detaillee && (
                                  <p className="text-white/70 text-sm mb-4 leading-relaxed border-l-2 border-primary/30 pl-3">
                                    {pilier.analyse_detaillee}
                                  </p>
                                )}
                                
                                {/* Actions preview section */}
                                {pilier.actions_preview.length > 0 && (
                                  <div className="mt-4 pt-4 border-t border-white/10">
                                    <p className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                                      🛠️ Actions à mettre en place <span className="text-white/50 font-normal">(Aperçu)</span>
                                    </p>
                                    <ul className="space-y-2 mb-3">
                                      {pilier.actions_preview.map((action, i) => (
                                        <li key={i} className="text-white/80 text-sm pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-primary">
                                          {action}
                                        </li>
                                      ))}
                                    </ul>
                                    {pilier.actions_cachees_count > 0 && (
                                      <button
                                        onClick={() => {
                                          const ctaSection = document.getElementById('rapport-cta');
                                          ctaSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        }}
                                        className="mt-4 w-full group cursor-pointer"
                                      >
                                        <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 rounded-lg p-3 transition-all duration-300 hover:border-amber-500/50 hover:from-amber-500/15 hover:via-orange-500/15 hover:to-amber-500/15 hover:shadow-lg hover:shadow-amber-500/10">
                                          <div className="flex items-center justify-center gap-2">
                                            <Lock className="w-4 h-4 text-amber-400" />
                                            <span className="text-amber-300 text-sm font-medium">
                                              +{pilier.actions_cachees_count} recommandations stratégiques
                                            </span>
                                          </div>
                                          <p className="text-amber-200/60 text-xs mt-1 text-center group-hover:text-amber-200/80 transition-colors">
                                            Débloquées dans votre rapport personnalisé
                                          </p>
                                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                        </div>
                                      </button>
                                    )}
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Strategic conclusion from API */}
                        {(conclusionStrategique || apiResultRef.current?.conclusion_strategique) && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showPiliers >= piliers.length ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/20 rounded-xl p-4 mb-4"
                          >
                            <p className="text-white/80 text-sm leading-relaxed">
                              <span className="text-secondary font-semibold">📊 Conclusion stratégique :</span>{" "}
                              {conclusionStrategique || apiResultRef.current?.conclusion_strategique || "Analyse en cours de finalisation par notre équipe."}
                            </p>
                          </motion.div>
                        )}

                        {/* Conclusion hook */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: showPiliers >= piliers.length ? 1 : 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-4 mb-6"
                        >
                          <p className="text-white/90 text-sm font-medium">
                            ⚠️ Ces points bloquent votre recommandation sur <span className="text-primary">ChatGPT</span> et <span className="text-secondary">Gemini</span>.{" "}
                            <span className="text-white">Recevez le guide correctif par email.</span>
                          </p>
                        </motion.div>

                        <form id="rapport-cta" onSubmit={handleEmailSubmit} className="space-y-4">
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
                          <motion.button
                            type="submit"
                            disabled={isSubmittingEmail}
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-full bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient-shift hover:shadow-lg hover:shadow-primary/30 text-white font-bold py-5 px-6 rounded-xl flex items-center justify-center gap-3 transition-all group text-lg disabled:opacity-50"
                          >
                            {isSubmittingEmail ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <>
                                <Mail className="w-5 h-5" />
                                Recevoir mon rapport complet et les {piliers.reduce((acc, p) => acc + p.actions_cachees_count, 0)} correctifs
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </motion.button>
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
