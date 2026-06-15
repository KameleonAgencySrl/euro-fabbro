# Euro Fabbro — Project Context

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS + CSS custom properties (globals.css)
- Framer Motion (animations)
- Lucide React (icons)
- Bilingual IT/EN via custom LanguageProvider context (no i18n lib)

## Working Directory
/run/media/harsh/7EB415B0B4156BC1/italy new demos/sites/euro-fabbro

## Key Files
```
src/
├── app/
│   ├── layout.tsx                          ← root layout (all main pages)
│   ├── (landing)/layout.tsx                ← landing pages layout
│   ├── HomeClient.tsx                      ← homepage all sections
│   ├── contatti/ContattiClient.tsx         ← contact page
│   ├── grazie/page.tsx                     ← thank-you page
│   ├── api/lead/route.ts                   ← form submission API (stub only)
│   ├── cancelli/page.tsx                   ← gates service page
│   └── (landing)/landing/
│       ├── cancelli-recinzioni/page.tsx    ← lead gen landing
│       └── lavora-con-noi/page.tsx         ← hiring landing
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ContactForm.tsx                     ← generic contact form (uses t.form)
│   ├── ContactCta.tsx                      ← dark CTA section with ContactForm
│   ├── Subpage.tsx                         ← SubpageHero + ContactSection
│   ├── FloatingActions.tsx
│   ├── ScrollReveal.tsx
│   ├── LanguageProvider.tsx
│   └── ui.tsx
└── lib/
    └── content.ts                          ← ALL bilingual content + site config
```

## Google Tags (added, not yet committed)
Both src/app/layout.tsx AND src/app/(landing)/layout.tsx have:
1. GTM GTM-MWF64NSZ — in <head> via next/script strategy="beforeInteractive"
2. GTM noscript iframe — first child of <body>
3. Google Ads AW-1063109549 — already existed, strategy="afterInteractive" in <body>

## Git State
- Branch: main
- Last commit: bd78790 feat: add Google Ads tag (AW-1063109549) to all pages
- GTM tags added but NOT yet committed or pushed
- All bugs below are unfixed

## Bugs To Fix

### CRITICAL
1. Sliding gate href 404
   - content.ts both EN+IT: href: "/cancelli/scorrevole" → must be "/cancelli/scorrevoli"
   - Actual page file: src/app/cancelli/scorrevoli/page.tsx

2. Lead API loses all submissions
   - src/app/api/lead/route.ts just console.logs and returns ok:true
   - No email, no DB, no webhook — every form submit is silently lost in prod

3. CV file silently dropped in lavora-con-noi form
   - src/app/(landing)/landing/lavora-con-noi/page.tsx
   - Form uses JSON.stringify — File object can't serialize — only hasCv:bool is sent
   - Fix: use FormData, update api/lead/route.ts to handle multipart

### HIGH
4. Landing forms show success text on error
   - cancelli-recinzioni/page.tsx:301 → {c.success} shown when status==="error"
   - lavora-con-noi/page.tsx:419 → same bug
   - Fix: add error string to content.ts landings sections, use it here

5. Contatti hero overlay escapes section
   - src/app/contatti/ContattiClient.tsx line 11
   - <section> has no position:relative but child has className="absolute inset-0"
   - Fix: add position:"relative" to the section style

### MEDIUM
6. Carport product card has no icon
   - HomeClient.tsx productIcons maps key "Car" but content.ts says icon:"CarFront"
   - productIcons["CarFront"] is undefined → icon silently missing on Carport card
   - Fix: change key "Car" to "CarFront" in productIcons object in HomeClient.tsx

7. Cancelli gallery empty 4th cell on desktop
   - src/app/cancelli/page.tsx lines 81-113
   - grid-cols-2 lg:grid-cols-4 but only 3 images hardcoded
   - Fix: change grid to lg:grid-cols-3 or add a 4th image

8. Contact form in /contatti missing type-of-work dropdown
   - ContattiClient.tsx uses generic <ContactForm /> which reads t.form
   - t.contatti.form defines name/phone/email/type/typeOptions/message but is never used
   - Fix: extend ContactForm to accept optional typeOptions prop, wire up t.contatti.form

9. WorkWithUs section has hardcoded English strings
   - HomeClient.tsx lines 1450-1459
   - "Installers · Resellers · Architects" and the paragraph below are hardcoded EN
   - Fix: move these strings to content.ts workWithUs section (both EN+IT), use t.workWithUs

### LOW
10. Stats strip border bleeds on mobile 2-col layout
    - HomeClient.tsx ~line 799
    - borderRight: i < stats.length-1 gives border to item[1] (right col) on mobile
    - Fix: use CSS border on left side instead, or only add border when not last in row

11. Featured projects first card 480px tall on mobile
    - HomeClient.tsx line 1212: style={{ height: idx===0 ? 480 : 228 }}
    - Inline style overrides all responsive classes
    - Fix: use aspect ratio or clamp instead of fixed height

12. Process step 3 icon key mismatch
    - content.ts step 3 has icon:"CircleCheckBig" in both EN+IT
    - HomeClient.tsx processIcons maps "CheckCircle" not "CircleCheckBig"
    - Fallback ?? CheckCircle saves it from crashing but content is wrong
    - Fix: change content.ts step 3 icon to "CheckCircle"

## Content Architecture
All text in src/lib/content.ts — one translations object with "en" and "it" keys.
Site config (phone, address, WhatsApp, socials, logo) in exported `site` object at top.
Components access via useT() hook → returns { t, site, lang, setLang }.
Default language: "it". Stored in localStorage key "eurofabbro_lang".
