import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import Parrainage from "./pages/Parrainage";
import AuditVisibiliteIA from "./pages/AuditVisibiliteIA";
import LexiqueIASEO from "./pages/LexiqueIASEO";
import BulkSms from "./pages/BulkSms";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/parrainage" element={<Parrainage />} />
          <Route path="/test-visibilite-ia" element={<AuditVisibiliteIA />} />
          <Route path="/ressources/lexique-ia-seo" element={<LexiqueIASEO />} />
          {/* Redirection 301 pour préserver le SEO */}
          <Route path="/audit-visibilite-ia" element={<Navigate to="/test-visibilite-ia" replace />} />
          <Route path="/envoi-groupe" element={<BulkSms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
