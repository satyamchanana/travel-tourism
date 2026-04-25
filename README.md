<div align="center">

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
<img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Razorpay-Integrated-0C2451?style=for-the-badge&logo=razorpay&logoColor=white" />
<img src="https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" />

<br/><br/>

# 🌍 WanderIndia

### A full-stack travel and tourism platform for discovering and booking incredible trips across India.

[**Live Demo →**](https://wanderindia.netlify.app) &nbsp;|&nbsp; [**Report Bug**](https://github.com/satyamchanana/travel-tourism/issues) &nbsp;|&nbsp; [**Request Feature**](https://github.com/satyamchanana/travel-tourism/issues)

<br/>

![WanderIndia Homepage](https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&h=300&fit=crop)

</div>

---

## 📌 About The Project

WanderIndia is a complete travel and tourism web platform built as a final year diploma project. It solves the problem of fragmented travel planning in India — where users typically jump between 4–5 different apps just to plan a single trip — by bringing **destination discovery, tourist spot exploration, package selection, and secure booking** all into one seamless interface.

> Built from scratch in under 48 hours for a college submission deadline, then iteratively improved into a production-ready platform.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ **Destination Discovery** | 12 curated Indian destinations loaded dynamically from Firebase Firestore |
| 🔍 **Real-time Search & Filter** | Instant client-side filtering by name and category (Beach, Mountain, Heritage, Nature, Adventure) |
| 📍 **Google Maps Integration** | Interactive tourist spot markers with InfoWindows on each destination's detail page |
| 💰 **Dynamic Package Pricing** | 4 tiers (Budget 1×, Standard 1.5×, Premium 2×, Luxury 3×) — prices adapt to each destination's base cost |
| 💳 **Razorpay Payment Gateway** | Full payment integration — UPI, Cards, Net Banking, Wallets |
| 🌙 **Dark Mode** | System-aware dark mode with localStorage persistence across sessions |
| ⚙️ **Admin Dashboard** | Firebase Auth-protected panel with booking management, analytics, and live destination addition |
| 📱 **Fully Responsive** | Mobile-first design using Tailwind CSS — works on all screen sizes |
| 🚀 **CI/CD Deployment** | Auto-deploys to Netlify on every GitHub push |

---

## 🛠️ Tech Stack

### Frontend
- **React.js 18** — Component-based UI with Hooks
- **Vite 5** — Build tool with Hot Module Replacement
- **Tailwind CSS 4** — Utility-first styling with dark mode
- **React Router DOM v6** — Client-side routing with state passing
- **@react-google-maps/api** — Google Maps with Markers and InfoWindows

### Backend & Services
- **Firebase Firestore** — NoSQL cloud database (destinations, bookings, contacts)
- **Firebase Authentication** — Admin Email/Password login
- **Razorpay Checkout.js** — Payment gateway
- **Google Maps JavaScript API** — Interactive destination maps

### Deployment
- **Netlify** — Static hosting with CI/CD from GitHub
- **Environment Variables** — All secrets stored in `.env` (never in version control)

---

## 📸 Screenshots

<table>
  <tr>
    <td><b>Homepage</b></td>
    <td><b>Destinations Page</b></td>
  </tr>
  <tr>
    <td>Hero section with dynamic destination cards from Firestore</td>
    <td>Real-time search + category filter with result count</td>
  </tr>
  <tr>
    <td><b>Destination Detail + Maps</b></td>
    <td><b>Booking Page</b></td>
  </tr>
  <tr>
    <td>3-tab layout with Google Maps tourist spot markers</td>
    <td>Step-by-step flow with live dynamic pricing</td>
  </tr>
  <tr>
    <td><b>Admin Dashboard</b></td>
    <td><b>Dark Mode</b></td>
  </tr>
  <tr>
    <td>Protected panel with bookings, analytics, destination management</td>
    <td>Full dark mode across all pages with localStorage persistence</td>
  </tr>
</table>

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- A Firebase project with Firestore and Authentication enabled
- Razorpay account (for test/live payments)
- Google Maps JavaScript API key

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/satyamchanana/travel-tourism.git
cd travel-tourism

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file at the project root with the following:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
VITE_MAPS_API_KEY=your_google_maps_api_key
```

### Seed the Database

```bash
# Start the dev server
npm run dev

# Navigate to /seed in your browser and click "Seed Now"
# This populates Firestore with 12 destinations
# Remove the /seed route after seeding!
```

### Run Locally

```bash
npm run dev
# App runs at http://localhost:5173
```

### Build for Production

```bash
npm run build
# Output in /dist folder
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky nav with dark mode toggle + mobile menu
│   ├── Footer.jsx          # Site-wide footer with links
│   └── FloatingButtons.jsx # WhatsApp + scroll-to-top buttons
├── context/
│   ├── AuthContext.jsx     # Firebase auth state (login/logout)
│   └── ThemeContext.jsx    # Dark mode state with localStorage
├── pages/
│   ├── Home.jsx            # Hero + Firestore destination grid
│   ├── Destinations.jsx    # Search + filter + listing
│   ├── DestinationDetail.jsx # Tabs: Overview, Spots, Google Maps
│   ├── Booking.jsx         # Step-by-step booking + Razorpay
│   ├── Packages.jsx        # Package tiers with live destination pricing
│   ├── Admin.jsx           # Protected dashboard (bookings + analytics)
│   ├── About.jsx           # Team + mission + values
│   ├── Contact.jsx         # Contact form → Firestore
│   └── NotFound.jsx        # Custom 404
├── firebase.js             # Firebase init + Firestore export
└── App.jsx                 # Routes + providers
```

---

## 💡 Key Technical Decisions

**Why Firebase over a traditional backend?**
> Serverless architecture eliminates server setup and maintenance. Firestore's real-time capabilities mean new destinations added via the admin panel appear on the live site instantly — no redeployment needed.

**Why dynamic multiplier-based pricing?**
> Instead of storing separate prices for every destination × tier combination (48 values), we store one base price per destination and compute tier prices as multipliers (1×, 1.5×, 2×, 3×) in JavaScript. Adding a new destination requires zero pricing logic changes.

**Why client-side search/filter instead of Firestore queries?**
> For 12–50 destinations, fetching all once and filtering in JS is faster (no network round-trip per keystroke) and cheaper (fewer Firestore reads). Scales to Firestore queries when the catalog grows larger.

---

## 🗄️ Database Schema

### `destinations` collection
```json
{
  "name": "Goa",
  "type": "Beach",
  "img": "https://...",
  "price": 8000,
  "rating": 4.8,
  "desc": "...",
  "bestTime": "November to February",
  "duration": "4-6 Days",
  "lat": 15.2993,
  "lng": 74.1240,
  "highlights": ["Water Sports", "Beach Shacks", "Nightlife"],
  "spots": [
    { "name": "Baga Beach", "desc": "...", "lat": 15.55, "lng": 73.75 }
  ]
}
```

### `bookings` collection
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "destination": "Goa",
  "package": "Standard",
  "travelers": 2,
  "basePrice": 8000,
  "tierPrice": 12000,
  "totalPrice": 24000,
  "checkIn": "2026-05-10",
  "checkOut": "2026-05-15",
  "paymentId": "pay_XXXXXXXXXX",
  "paymentStatus": "paid",
  "bookedAt": "2026-04-15T10:30:00Z"
}
```

---

## 🚢 Deployment

The project is deployed on **Netlify** with continuous deployment from GitHub.

```toml
# netlify.toml — required for React Router SPA routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Steps to deploy your own:**
1. Push code to GitHub
2. Connect repo to Netlify → Build command: `npm run build` → Publish: `dist`
3. Add all environment variables in Netlify → Site Configuration → Environment Variables
4. Every `git push` auto-deploys 🚀

---

## 🔒 Security

- All API keys stored in `.env` — never committed to version control
- `.env` listed in `.gitignore`
- Razorpay Key Secret never exposed to frontend
- Admin routes protected by Firebase Authentication
- Production keys configured as Netlify Environment Variables

> ⚠️ **Note:** Firestore is currently in test mode. Production deployment should add Security Rules to restrict write access.

---

## 🗺️ Roadmap

- [ ] User registration & login (Firebase Auth)
- [ ] Booking history for registered users
- [ ] Email confirmation after booking (EmailJS)
- [ ] Firestore Security Rules for production
- [ ] Destination reviews & ratings system
- [ ] PWA support (offline + installable)
- [ ] PhonePe payment gateway (requires Node.js backend)
- [ ] AI-powered trip recommendations
- [ ] React Native mobile app


## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [React.js](https://react.dev) — UI Library
- [Firebase](https://firebase.google.com) — Backend & Database
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Razorpay](https://razorpay.com) — Payment Gateway
- [Google Maps Platform](https://developers.google.com/maps) — Maps API
- [Unsplash](https://unsplash.com) — Destination Photography
- [Netlify](https://netlify.com) — Hosting & CI/CD
- **Mr. Rohit Mandhar** — Project Supervisor, Seth Jai Parkash Polytechnic, Damla

---

<div align="center">

Made with ❤️ in India &nbsp;|&nbsp; Seth Jai Parkash Polytechnic, Damla &nbsp;|&nbsp; Diploma in Computer Engineering 2023–2026

⭐ **Star this repo if you found it useful!**

</div>