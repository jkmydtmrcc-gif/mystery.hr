# Mystery.hr Setup Guide

Dobrodošli! Ovaj dokument sadrži sve potrebne korake za pokretanje Mystery.hr platforme.

## 📋 Preduvjeti

- Node.js 18+ instaliran
- MongoDB Atlas nalog (besplatno na mongodb.com/cloud/atlas)
- CorvusPay nalog za plaćanje (corvuspay.com)

## 🚀 Brza Instalacija

### 1. Klonirajte projekt i instalirajte dependencije

```bash
npm install
```

### 2. Konfiguracija Baze Podataka

#### Kreiranje MongoDB Atlas klastera:

1. Idite na [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Napravite besplatni nalog
3. Kreirajte novi klaster (M0 Sandbox - besplatan)
4. Pod "Database Access", dodajte novog korisnika sa lozinkom
5. Pod "Network Access", dodajte svoju IP adresu (ili 0.0.0.0/0 za sve IP-ove)
6. Kliknite "Connect" → "Connect your application"
7. Kopirajte connection string

**VAŽNO:** Connection string mora biti u ovom formatu:
```
mongodb+srv://username:password@cluster.mongodb.net/mysterybox?retryWrites=true&w=majority
```

**NEMOJTE** dodavati port broj (kao `:27017`) - to uzrokuje grešku!

### 3. Kreirajte .env.local fajl

Kopirajte `.env.local.example` u `.env.local`:

```bash
cp .env.local.example .env.local
```

Uredite `.env.local` i popunite sve potrebne vrijednosti:

```env
# MongoDB - ZAMIJENITE sa vašim podacima
MONGODB_URI=mongodb+srv://vasekorisnickoime:vasasifra@cluster.mongodb.net/mysterybox?retryWrites=true&w=majority

# Admin Panel - Promijenite za produkciju!
JWT_SECRET=vasa-super-tajna-kljuc-najmanje-32-karaktera
ADMIN_EMAIL=admin@mystery.hr
ADMIN_PASSWORD=VasaSigurnaLozinka123!

# CorvusPay - ZAMIJENITE sa vašim podacima
CORVUSPAY_STORE_ID=vas-store-id
CORVUSPAY_SECRET_KEY=vas-secret-key
CORVUSPAY_TEST_MODE=true

# Email (Opcionalno)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=vas-email@gmail.com
SMTP_PASSWORD=app-specific-password

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Mystery.hr
```

### 4. Inicijalizirajte bazu podataka

Pokrenite seed skripte za kreiranje admin korisnika i proizvoda:

```bash
# Prvo kreirajte admin korisnika
npm run seed:admin

# Zatim kreirajte proizvode
npm run seed:products
```

### 5. Pokrenite development server

```bash
npm run dev
```

Sajt će biti dostupan na: `http://localhost:3000`

## 🔐 Pristup Admin Panelu

Admin panel je dostupan na: `http://localhost:3000/admin`

**Pristupni podaci:**
- Email: Vrijednost iz `ADMIN_EMAIL` u .env.local
- Lozinka: Vrijednost iz `ADMIN_PASSWORD` u .env.local

## 🛍️ Proizvodi

Platforma automatski kreira 9 Mystery Box-ova:

1. **Pet Box** (€35) - Proizvodi za ljubimce
2. **Sex Box** (€45) - Intimni proizvodi
3. **Garden Box** (€30) - Vrtni alati i oprema
4. **Home Box** (€40) - Proizvodi za dom
5. **Tech Box** (€50) - Tehnologija i gadgeti
6. **Random Box** (€25) - Nasumični proizvodi
7. **Perfume Box** (€42) - Parfemi i kozmetika
8. **Beauty Box** (€38) - Beauty proizvodi
9. **Kid Box** (€32) - Proizvodi za djecu

## 💳 CorvusPay Integracija

### Test Mode

U test modu možete koristiti test kartice:

- **Uspješna transakcija:**
  - Broj kartice: `4111111111111111`
  - CVV: Bilo koji 3-znamenkasti broj
  - Datum: Bilo koji budući datum

### Production Mode

1. Registrirajte se na [CorvusPay](https://corvuspay.com)
2. Dobijte vaš Store ID i Secret Key
3. U .env.local postavite:
   ```
   CORVUSPAY_TEST_MODE=false
   CORVUSPAY_STORE_ID=pravi-store-id
   CORVUSPAY_SECRET_KEY=pravi-secret-key
   ```

## 📊 Provjera da li sve radi

1. **Homepage** (`/`) - Prikazuje se Spin to Win popup nakon 3 sekunde
2. **Mystery Boxes** (`/mystery-boxes`) - Lista svih proizvoda
3. **Pojedinačni proizvod** - Klikni "Pogledaj Detalje" na bilo koji box
4. **Košarica** (`/kosarica`) - Dodaj proizvod i provjeri košaricu
5. **Checkout** - Ispuni podatke i kreiraj narudžbu
6. **Admin Panel** (`/admin`) - Prijavi se i vidi narudžbe

## 🔧 Rješavanje Problema

### MongoDB Connection Error

**Greška:** `MongoParseError: mongodb+srv URI cannot have port number`

**Rješenje:** Provjerite da vaš MONGODB_URI nema `:27017` u URL-u. MongoDB Atlas koristi SRV format koji ne treba port.

✅ DOBRO: `mongodb+srv://user:pass@cluster.mongodb.net/db`  
❌ LOŠE: `mongodb+srv://user:pass@cluster.mongodb.net:27017/db`

### Admin Login Error

**Greška:** `JSON.parse: unexpected character at line 1 column 1`

**Rješenje:** Prvo pokrenite `npm run seed:admin` da kreirate admin korisnika u bazi.

### Spin to Win ne pojavljuje se

**Rješenje:** 
1. Očistite localStorage u browseru (F12 → Application → Local Storage → Clear All)
2. Refresh stranicu
3. Popup će se pojaviti nakon 3 sekunde

### Košarica ne radi

**Rješenje:**
1. Provjerite da je MongoDB povezan (provjerite konzolu)
2. Provjerite da su proizvodi kreirani (`npm run seed:products`)

## 🌐 Deployment na Vercel

1. Push kod na GitHub
2. Importujte projekt na [Vercel](https://vercel.com)
3. Dodajte Environment Variables iz .env.local
4. Deploy!

**VAŽNO:** Za produkciju obavezno promijenite:
- `JWT_SECRET` - koristite jak random string
- `ADMIN_PASSWORD` - koristite sigurnu lozinku
- `CORVUSPAY_TEST_MODE=false` - prebacite na produkcijski način

## 📧 Podrška

Za pitanja i pomoć:
- Email: support@mystery.hr
- Website: https://mystery.hr/kontakt

## ✅ Checklist prije pokretanja

- [ ] MongoDB Atlas klaster kreiran i connection string kopiran
- [ ] .env.local fajl kreiran sa svim podacima
- [ ] Admin korisnik kreiran (`npm run seed:admin`)
- [ ] Proizvodi kreirani (`npm run seed:products`)
- [ ] Development server pokrenut (`npm run dev`)
- [ ] Admin panel testiran (prijava uspješna)
- [ ] Narudžba testirana (kreiranje narudžbe radi)

---

**Sretno sa vašom Mystery.hr platformom! 🎁✨**
```

```json file="" isHidden
