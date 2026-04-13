

## Plan : Transformer /sms-groupes en page de présentation Avis-Pro

### Objectif
Convertir la landing page SMS interne en page vitrine pour **Avis-Pro** (avis-pro.eu), créé par NDigital. Retirer les notions de connexion/authentification, rediriger les CTA vers le site externe.

### Modifications sur `src/pages/SmsLanding.tsx`

**1. Assets — Copier les 2 logos uploadés dans le projet**
- `user-uploads://Logo_Avis-Pro_2.png` → `public/assets/avis-pro-icon.png`
- `user-uploads://Capture_d_écran_2026-04-06_à_22.09.30.png` → `public/assets/avis-pro-logo.png`

**2. Hero**
- Remplacer le badge par le logo Avis-Pro (icône + texte)
- Titre : indiquer que NDigital a conçu **Avis-Pro** (ex. "NDigital a créé **Avis-Pro**" ou "Découvrez **Avis-Pro**, par NDigital")
- Sous-titre : garder le même esprit mais mentionner Avis-Pro
- CTA principal `"Commencer maintenant"` → lien externe `<a href="https://avis-pro.eu" target="_blank">`
- **Supprimer** le bouton "Se connecter" et le lien "J'ai déjà un compte"
- Social proof : conserver tel quel

**3. Section "Pourquoi les pros choisissent"**
- Renommer en "Pourquoi les pros choisissent **Avis-Pro** ?"
- **Conserver** les 3 cards identiques (wording inchangé)

**4. Sections "Import Excel & CSV" et "Pay-as-you-go"**
- **Aucun changement** de wording (demande explicite)

**5. CTA final**
- CTA `"Commencer maintenant"` → lien externe `https://avis-pro.eu`
- **Supprimer** le lien "J'ai déjà un compte — me connecter"

**6. Nettoyage**
- Retirer l'import et l'utilisation de `useAuth` (plus nécessaire)
- Retirer les variables `ctaHref` / `ctaLabel` conditionnelles, remplacer par des constantes

### Fichiers modifiés
- `src/pages/SmsLanding.tsx`

### Fichiers créés
- `public/assets/avis-pro-icon.png`
- `public/assets/avis-pro-logo.png`

