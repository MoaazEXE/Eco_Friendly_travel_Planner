# Eco-Friendly Travel Planner — Frontend

**WIF2003 Web Programming** · Group 8

A React + Vite single-page application for planning eco-friendly travel in Malaysia. Users can browse a curated set of sustainable destinations, build a day-by-day itinerary, estimate the carbon footprint of a trip, check weather forecasts, and manage their profile.

---

## Tech Stack

| Layer       | Technology |
|-------------|------------|
| Framework   | React 18 |
| Bundler     | Vite 5 |
| Routing     | React Router v6 |
| UI / CSS    | Bootstrap 5.3 (npm) + Bootstrap Icons (CDN) |
| Animations  | Framer Motion |
| Icons       | Lucide React |
| Typography  | Playfair Display (Google Fonts) for landing-page headlines |
| HTTP layer  | Native `fetch` wrapped in `src/api/` |
| Language    | JavaScript (JSX) |

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher (ships with Node)

```bash
node -v
npm -v
```

---

## Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd eco-travel-frontend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Then open .env and fill in values (see Environment Variables section)
```

### Main dependencies

- `react` ^18.3.1, `react-dom` ^18.3.1
- `react-router-dom` ^6.22.3
- `bootstrap` ^5.3.3
- `framer-motion`, `lucide-react`, `prop-types`

### Dev dependencies

- `vite` ^5.4.2
- `@vitejs/plugin-react` ^4.3.1

---

## Running the App

### Development server

```bash
npm run dev
```

Opens at **http://localhost:5173** with hot-module replacement.

### Production build

```bash
npm run build
```

Output goes to `dist/`. Preview the production build locally:

```bash
npm run preview
```

---

## Project Structure

```
eco-travel-frontend/
├── public/                  # Static assets served as-is
├── src/
│   ├── api/                 # Backend service layer (fetch wrappers — mocked)
│   │   ├── client.js        # Base fetch client — base URL, auth headers
│   │   ├── auth.js          # Login, register, logout
│   │   └── profile.js       # Get/update profile, change password, delete account
│   │
│   ├── components/          # Shared UI components, grouped by feature
│   │   ├── Navbar.jsx           # Responsive navbar — logged-in / logged-out states
│   │   ├── Footer.jsx           # Site footer
│   │   ├── LeafCompassGuide.jsx # Brand mark used in hero + dashboard
│   │   ├── auth/                # LoginForm, RegisterForm
│   │   ├── calculator/          # OptionSelector, CalculationResults
│   │   ├── eco/                 # EcoCard, FavouriteItem
│   │   ├── itinerary/           # ItineraryForm, RecommendationsList, SavedItinerary, …
│   │   ├── profile/             # ProfileSidebar, PersonalInfoSection, SecuritySection, …
│   │   ├── weather/             # WeatherSearchBar, WeatherDisplay
│   │   └── ui/                  # StarRating, EmptyState, StatCard, UserAvatar
│   │
│   ├── constants/
│   │   └── calculatorConfig.js  # CO₂ emission factors (DEFRA-aligned)
│   │
│   ├── context/
│   │   └── AppContext.jsx       # Global state: user, saved itinerary, favourites
│   │
│   ├── data/
│   │   ├── ecoOptions.js        # 15 curated destinations across 4 Malaysian cities
│   │   └── weatherData.js       # Mock weather payloads
│   │
│   ├── pages/                   # One component per route
│   │   ├── HomePage.jsx         # Landing page — dark hero, feature grid, methodology chart
│   │   ├── DashboardPage.jsx    # Logged-in home — stats, next trip, recommendations
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ProfilePage.jsx      # Tabbed profile (details / security / preferences)
│   │   ├── EcoOptionsPage.jsx   # Browse + filter destinations, manage favourites
│   │   ├── ItineraryPage.jsx    # Filter recommendations, build a saved plan
│   │   ├── WeatherPage.jsx      # City search + 5-day forecast
│   │   └── CalculatorPage.jsx   # Trip carbon estimator
│   │
│   ├── styles/
│   │   ├── colors.css       # CSS custom properties (design tokens)
│   │   ├── style.css        # Global layout, typography, navbar
│   │   ├── home.css         # Landing page (.lp-* design system)
│   │   ├── dashboard.css
│   │   ├── eco-options.css
│   │   ├── itinerary.css
│   │   ├── calculator.css
│   │   ├── weather.css
│   │   └── profile.css
│   │
│   ├── assets/              # Images, icons, static files imported by JS
│   ├── App.jsx              # Route definitions (React Router v6)
│   └── main.jsx             # App entry point — Bootstrap imported here
│
├── .env.example
├── .gitignore
├── index.html               # Vite entry — Bootstrap Icons + Playfair Display loaded here
├── vercel.json              # SPA rewrite rule for client-side routing on Vercel
├── package.json
└── vite.config.js
```

---

## Routes

| Path           | Page         | Status |
|----------------|--------------|--------|
| `/`            | Home         | Done |
| `/dashboard`   | Dashboard    | Done |
| `/login`       | Login        | Done |
| `/register`    | Register     | Done |
| `/profile`     | Profile      | Done |
| `/eco-options` | Eco Options  | Done |
| `/itinerary`   | Itinerary    | Done |
| `/weather`     | Weather      | Done |
| `/calculator`  | Calculator   | Done |

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
# Base URL of the backend REST API
VITE_API_BASE_URL=http://localhost:8000/api

# (Optional) OpenWeatherMap API key for live weather data
VITE_WEATHER_API_KEY=your_key_here
```

> All Vite environment variables must be prefixed with `VITE_` to be accessible in the browser.

---

## Backend Integration

The `src/api/` folder contains one file per domain area. Each function returns mock data today; the real `fetch` call is left as a single-line `// backend:` comment directly above the mock.

**When the backend is ready:**

1. Set `VITE_API_BASE_URL` in your `.env` file.
2. Open the relevant file in `src/api/` (e.g. `auth.js`).
3. Replace the `Promise.resolve(...)` body with the `request(...)` call from the `// backend:` comment.

### API modules

| File | Endpoints planned |
|------|-------------------|
| `api/client.js`  | Base fetch client, JWT header injection |
| `api/auth.js`    | `POST /auth/login`, `POST /auth/register`, `POST /auth/logout` |
| `api/profile.js` | `GET/PUT /profile`, `PUT /profile/password`, `DELETE /profile` |

### Mock response shapes

**`POST /auth/login`**
```json
{ "token": "jwt-string", "user": { "id": 1, "email": "...", "fullName": "Eleanor Vance" } }
```

**`GET /profile`**
```json
{
  "fullName": "Moaaz Khamis",
  "email": "traveller@example.com",
  "phone": "+62 123-4567",
  "location": "Kuala Lumpur, Malaysia",
  "bio": "Passionate about sustainable travel and discovering eco-friendly experiences around the world.",
  "stats": { "carbonSaved": "120 kg CO₂", "tripsTaken": 14 },
  "ecoScore": 78
}
```

---

## Design System

Colors live as CSS custom properties in [`src/styles/colors.css`](src/styles/colors.css) and are referenced via `var(--token-name)` everywhere.

A representative slice — the green scale runs from darkest to most subtle:

| Token | Value | Used for |
|-------|-------|----------|
| `--green-darkest`   | `#1b4332` | Landing hero, final CTA backgrounds |
| `--green-darker`    | `#1b5e20` | Dark text on cream |
| `--green-dark`      | `#2d6a4f` | Section accents, eco labels |
| `--green-primary`   | `#2e7d32` | Navbar brand, primary buttons |
| `--green-secondary` | `#66bb6a` | Highlighted accents, primary CTA fill |
| `--green-mid`       | `#40916c` | Chart gradients, eyebrow text |
| `--green-light`     | `#74c69d` | Accent borders, decorative dots |
| `--green-pale`      | `#d8f3dc` | Card borders on cream sections |
| `--green-subtle`    | `#e9f5ee` | Pill / chip backgrounds |
| `--green-surface`   | `#f8f9f6` | Section background (cream) |
| `--gray-50` … `--gray-900` | — | Neutral scale for text, borders, surfaces |

The landing page also uses Playfair Display (Google Fonts) for the serif headlines under the `.lp-hero-h1`, `.lp-section-h2`, and `.lp-quote-text` classes defined in [`src/styles/home.css`](src/styles/home.css).

---

## Data Sources

- **Destinations** (`src/data/ecoOptions.js`) — 15 hand-curated entries across Kuala Lumpur, Penang, Melaka, and Sabah. Each includes category, eco rating (1–5), impact level, and a short note on what makes it lower-footprint.
- **Carbon factors** (`src/constants/calculatorConfig.js`) — per-kilometre CO₂ values for flight / car / train / bus and per-night values for hotel / eco-lodge / hostel / camping, aligned with the UK DEFRA conversion factors used in the calculator and on the landing page.

---

## Assignment Info

- **Course:** WIF2003 — Web Programming
- **Project:** Eco-Friendly Travel Planner
- **Group:** 8
