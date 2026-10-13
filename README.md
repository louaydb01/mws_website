# MarketWave Solution — site Next.js

Version Next.js (App Router, TypeScript) du site marketwavesolution.com.
Le site est entièrement statique : `npm run build` produit un dossier `out/` à publier tel quel.

## Démarrer

Prérequis : Node.js 20.9 ou plus récent (LTS recommandée).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # génère le site statique dans out/
```

## URLs

| Langue   | URL     |
|----------|---------|
| Français | `/`     |
| Arabe    | `/ar/`  |
| Anglais  | `/en/`  |
| Espagnol | `/es/`  |

Chaque langue est une vraie page HTML (balises `lang`/`dir`, titre, description et `hreflang` traduits),
donc indexable séparément par Google. Les anciens liens `/?lang=ar` redirigent vers `/ar/`.

## Publier

- **Vercel / Netlify** : importer le dossier, la commande de build est `npm run build`, le dossier publié `out`.
- **Hébergement classique (Hostinger, cPanel, Apache…)** : lancer `npm run build`, puis envoyer le contenu de `out/` à la racine du site.

## Où modifier quoi

| Quoi | Fichier |
|------|---------|
| Numéro WhatsApp / téléphone, e-mail, réseaux sociaux | `lib/site.ts` |
| Textes des 4 langues | `lib/dictionaries/fr.ts`, `ar.ts`, `en.ts`, `es.ts` |
| Couleurs, typographie, espacements | `app/globals.css` (tokens en tête de fichier) |
| Sections de la page | `components/` (un fichier par section) |
| Titre, description, SEO | `lib/metadata.ts` |

Les dictionnaires sont typés : si une clé manque dans une langue, la compilation échoue.

## Avant la mise en ligne

1. ~~Remplacer le numéro provisoire~~ — fait : WhatsApp, téléphone et e-mail sont renseignés dans `lib/site.ts`.
2. Renseigner les liens LinkedIn / Instagram / Facebook / TikTok dans `lib/site.ts`.
3. Harmoniser les horaires : AR/EN indiquent samedi–jeudi, FR/ES lundi–vendredi.
4. Témoignages, chiffres (+150 clients, 3+ ans, 10+ experts), « Top Agency 2024 » et « +240 % » sont
   masqués tant qu'ils ne sont pas vérifiés. Pour les afficher, supprimer la règle `[data-unverified]`
   dans `app/globals.css` (section « TRUST AUDIT »).
