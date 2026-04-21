# Maison Dentaire Élysée

Landing page premium et système de réservation pour un centre dentaire haut de gamme, construits avec Next.js, Tailwind CSS, `lucide-react` et `date-fns`.

## Démarrage

```bash
npm install
npm run dev
```

## Configuration Resend

Créez un fichier `.env.local` à partir de `.env.example` puis renseignez :

```bash
RESEND_API_KEY=...
RESEND_FROM_EMAIL=Maison Dentaire Élysée <onboarding@resend.dev>
RESEND_TO_EMAIL=contact@votre-domaine.fr
```

L'API de réservation dans `app/api/rendez-vous/route.ts` envoie ensuite chaque demande par email via Resend.

## Personnalisation rapide

- Remplacer les placeholders visuels de la bannière et des sections avant/après.
- Modifier les données métier dans `lib/data.ts`.
- Ajuster les destinataires Resend et le domaine d'envoi dans `.env.local`.
- Brancher ensuite l'API `app/api/rendez-vous/route.ts` à votre CRM ou base de données si nécessaire.
