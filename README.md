# Mystery.hr - Premium Mystery Box E-Commerce Platform

Profesionalna platforma za prodaju premium mystery boxova s fokusom na hrvatsko tržište. 

## ✨ Značajke

### Frontend
- 🎨 Luksuzni dizajn (zlato/crno)
- 🇭🇷 Potpuno na hrvatskom jeziku
- 📱 Potpuno responzivan
- 🎡 Spin to Win popup sa kotačem sreće
- 🔔 Lažne notifikacije o kupnji (social proof)
- ⏰ Brojači za urgentnost (countdown timers)
- 📉 Indikatori ograničene zalihe
- 💳 Sustav kupona s popustima
- 🛒 Funkcionalna košarica s upravljanjem količinama
- 🎯 Flash sale banner
- 📄 Sve pravne stranice (Uvjeti, Privatnost, Povrat, GDPR)
- 🍪 GDPR cookie consent banner

### Backend
- 🗄️ MongoDB baza podataka
- 🔐 JWT autentifikacija za admin panel
- 💰 CorvusPay integracija za plaćanje
- 📦 API rute za proizvode, košaricu, kupone
- 👨‍💼 Admin panel s pregledom narudžbi

### Mystery Boxovi
1. **Pet Box** (€35) - Za ljubitelje kućnih ljubimaca
2. **Sex Box** (€45) - Wellness i intimni proizvodi (18+)
3. **Garden Box** (€30) - Vrtlarstvo i biljke
4. **Home Box** (€40) - Home decor i dodaci
5. **Tech Box** (€50) - Tehnologija i gadgeti
6. **Random Box** (€25) - Iznenađenje mix
7. **Perfume Box** (€42) - Premium mirisi
8. **Beauty Box** (€38) - Šminka i njega
9. **Kid Box** (€32) - Igračke i zabava za djecu

## 🚀 Brza Instalacija

### 1. Instalirajte dependencies

```bash
npm install
```

### 2. Kreirajte .env.local

```bash
cp .env.local.example .env.local
```

Uredite `.env.local` i popunite vrijednosti:

```env
# MongoDB Atlas connection (BEZ port broja!)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mysterybox?retryWrites=true&w=majority

# JWT Secret (minimalno 32 karaktera)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_EMAIL=admin@mystery.hr
ADMIN_PASSWORD=change-this-password

# CorvusPay
CORVUSPAY_STORE_ID=your-corvuspay-store-id
CORVUSPAY_SECRET_KEY=your-corvuspay-secret-key
CORVUSPAY_TEST_MODE=true
```

⚠️ **VAŽNO**: MongoDB URI ne smije imati port broj (`:27017`)! Koristite samo `mongodb+srv://` format.

### 3. Pokrenite seed skripte

```bash
# Kreiraj admin korisnika
npm run seed:admin

# Kreiraj proizvode
npm run seed:products

# Ili oboje odjednom
npm run seed:all
```

### 4. Pokrenite development server

```bash
npm run dev
```

Sajt: `http://localhost:3000`  
Admin: `http://localhost:3000/admin`

## 🔐 Admin Pristup

Default admin kredencijali (nakon seed:admin):
- Email: Iz `ADMIN_EMAIL` env varijable
- Password: Iz `ADMIN_PASSWORD` env varijable

⚠️ **Promijenite lozinku u produkciji!**

## 🛠️ MongoDB Setup

1. Kreirajte besplatni account na [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Napravite novi klaster (M0 Sandbox - besplatan)
3. Database Access → Dodajte korisnika
4. Network Access → Dodajte IP (0.0.0.0/0 za sve IP-ove)
5. Connect → "Connect your application" → Kopirajte string
6. Zalijepite u `.env.local` kao `MONGODB_URI`

**Format MORA biti:**
```
mongodb+srv://username:password@cluster.mongodb.net/mysterybox?retryWrites=true&w=majority
```

## 💳 CorvusPay Setup

### Test Mode
Koristite test kartice:
- Broj: `4111111111111111`
- CVV: Bilo koji 3-znamenkasti
- Datum: Bilo koji budući

### Production
1. Registracija na [CorvusPay](https://corvuspay.hr/)
2. Dobijte Store ID i Secret Key
3. Postavite callback URL-ove:
   - Success: `https://yourdomain.com/narudzba-uspjesna`
   - Cancel: `https://yourdomain.com/narudzba-otkazana`
   - Callback: `https://yourdomain.com/api/payment/callback`

## 📊 Admin Panel

Pristup: `/admin/login`

**Funkcionalnosti:**
- 📈 Dashboard s statistikama prihoda
- 📦 Upravljanje narudžbama i statusima
- 👥 Pregled kupaca i njihovih podataka
- 🎟️ Kreiranje i upravljanje kuponima
- 📦 Dodavanje i uređivanje proizvoda
- 🔍 Pretraga i filtriranje

## 🔧 Troubleshooting

### MongoDB Connection Error
**Greška:** `MongoParseError: mongodb+srv URI cannot have port number`

✅ **Rješenje:** Provjerite da URI nema `:27017`. Koristite samo SRV format.

### Admin Login JSON Error
**Greška:** `JSON.parse: unexpected character`

✅ **Rješenje:** Pokrenite `npm run seed:admin` prvo.

### Spin to Win ne pojavljuje se
✅ **Rješenje:** Očistite localStorage (F12 → Application → Local Storage → Clear All)

### Checkout greška
✅ **Rješenje:** Provjerite da su proizvodi kreirani (`npm run seed:products`)

Pročitajte **SETUP.md** za detaljne korake i troubleshooting.

## 📱 Stranice

- `/` - Početna stranica
- `/mystery-boxes` - Katalog proizvoda
- `/mystery-boxes/[id]` - Detalji proizvoda
- `/kosarica` - Košarica
- `/placanje` - Checkout
- `/o-nama` - O nama
- `/kontakt` - Kontakt
- `/kako-funkcionira` - Kako funkcionira
- `/faq` - Česta pitanja
- `/uvjeti-koristenja` - Uvjeti korištenja
- `/politika-privatnosti` - Politika privatnosti
- `/politika-povrata` - Politika povrata
- `/gdpr` - GDPR informacije
- `/admin` - Admin panel

## 🔧 Tehnologije

- **Framework**: Next.js 16
- **React**: 19.2
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **Database**: MongoDB 7.0
- **Auth**: JWT (jose)
- **Password Hashing**: bcryptjs
- **Payment**: CorvusPay
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Deployment**: Vercel

## 🌐 Deployment na Vercel

1. Push na GitHub
2. Import na [Vercel](https://vercel.com)
3. Dodaj Environment Variables iz `.env.local`
4. Deploy!

**Za produkciju promijenite:**
- `JWT_SECRET` - jak random string (32+ karaktera)
- `ADMIN_PASSWORD` - sigurna lozinka
- `CORVUSPAY_TEST_MODE=false`

## 📞 Podrška

Za pitanja i pomoć:
- Email: info@mystery.hr
- Telefon: +385 1 234 5678

## 📄 Licenca

Sva prava pridržana © 2025 Mystery.hr
