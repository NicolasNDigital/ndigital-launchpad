import { useState } from "react"
import { Navigate, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import logo from "@/assets/logo.png"

type Mode = "login" | "signup"

export default function Auth() {
  const { user, signIn, signUp } = useAuth()
  const [mode, setMode] = useState<Mode>("login")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")

  // Déjà connecté → rediriger vers l'outil
  if (user) return <Navigate to="/envoi-groupe" replace />

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      if (mode === "login") {
        await signIn(email, password)
        toast.success("Connexion réussie !")
      } else {
        await signUp(email, password, fullName)
        toast.success("Compte créé ! Vérifiez votre email pour confirmer votre inscription.")
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.includes("Invalid login credentials")) {
        toast.error("Email ou mot de passe incorrect.")
      } else if (msg.includes("User already registered")) {
        toast.error("Un compte existe déjà avec cet email.")
      } else if (msg.includes("Password should be at least")) {
        toast.error("Le mot de passe doit contenir au moins 6 caractères.")
      } else {
        toast.error(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-deep-black flex flex-col items-center justify-center px-4 py-16">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-electric-violet/8 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <Link to="/" className="flex justify-center mb-10">
          <img src={logo} alt="NDIGITAL" className="h-10 w-auto" />
        </Link>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">

          {/* Tabs */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-8">
            {(["login", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  mode === m
                    ? "bg-electric-violet text-white shadow-sm"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {m === "login" ? "Se connecter" : "Créer un compte"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Nom complet (signup uniquement) */}
              {mode === "signup" && (
                <div>
                  <label className="block text-white/60 text-sm mb-1.5">Nom complet</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jean Dupont"
                      className="w-full bg-white/5 border border-white/10 focus:border-electric-violet rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-white/25 outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-white/60 text-sm mb-1.5">Adresse email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.fr"
                    required
                    className="w-full bg-white/5 border border-white/10 focus:border-electric-violet rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-white/25 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-white/60 text-sm mb-1.5">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === "signup" ? "6 caractères minimum" : "••••••••"}
                    required
                    minLength={6}
                    className="w-full bg-white/5 border border-white/10 focus:border-electric-violet rounded-xl pl-10 pr-11 py-3 text-white placeholder:text-white/25 outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {mode === "login" ? "Se connecter" : "Créer mon compte"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.form>
          </AnimatePresence>
        </div>

        {/* Retour */}
        <p className="text-center text-white/30 text-sm mt-6">
          <Link to="/sms-groupes" className="hover:text-white/60 transition-colors underline underline-offset-4">
            ← Retour à la présentation
          </Link>
        </p>
      </div>
    </div>
  )
}
