# Eco-Friendly Travel Planner — Frontend

**WIF2003 Web Programming** · Group 8

A React + Vite single-page application for planning eco-friendly travel. Users can browse sustainable travel options, build a day-by-day itinerary, check weather forecasts, and manage their profile.

---

## Tech Stack

| Layer      | Technology |
|------------|------------|
| Framework  | React 18 |
| Bundler    | Vite 5 |
| Routing    | React Router v6 |
| UI / CSS   | Bootstrap 5.3 (npm) + Bootstrap Icons (CDN) |
| Animations | Framer Motion (`framer-motion`) |
| Icons      | Lucide React (`lucide-react`) |
| HTTP layer | Native `fetch` API (wrapped in `src/api/`) |
| Language   | JavaScript (JSX) |

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher (comes with Node)

Check your versions:

```bash
node -v
npm -v
```

---

## Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd eco-travel-frontend/client

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Then open .env and fill in values (see Environment Variables section)
```

---

## Running the App

### Development server

```bash
npm run dev
```

Opens at **http://localhost:5173** with hot-module replacement enabled.

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
client/
├── public/                  # Static assets served as-is
├── src/
│   ├── api/                 # Backend service layer (fetch wrappers)
│   │   ├── client.js        # Base fetch client — base URL, auth headers
│   │   ├── auth.js          # Login, register, logout
│   │   ├── profile.js       # Get/update profile, change password, delete account
│   │   ├── itinerary.js     # Recommendations, saved plan CRUD
│   │   └── weather.js       # Weather data fetching
│   │
│   ├── components/          # Shared UI components
│   │   ├── Navbar.jsx           # Responsive navbar — logged-in / logged-out states
│   │   ├── Footer.jsx           # Site footer
│   │   └── LeafCompassGuide.jsx # Logo placeholder (swap src when image is ready)
│   │
│   ├── context/
│   │   └── AppContext.jsx       # Global state: user, itineraries, favourites (placeholder data)
│   │
│   ├── pages/               # One component per route
│   │   ├── HomePage.jsx         # Marketing landing page (scroll-animated sections)
│   │   ├── Dashboard.jsx        # Logged-in home — stats, next trip, recommendations
│   │   ├── LoginPage.jsx        # Login form with client-side validation
│   │   ├── RegisterPage.jsx     # Registration form with validation
│   │   ├── ProfilePage.jsx      # Tabbed profile (details / security / settings)
│   │   ├── EcoOptionsPage.jsx   # Eco travel options (placeholder)
│   │   ├── ItineraryPage.jsx    # Trip preferences, recommendations, saved plan
│   │   ├── WeatherPage.jsx      # City weather search + 5-day forecast
│   │   └── CalculatorPage.jsx   # Carbon footprint calculator (placeholder)
│   │
│   ├── styles/              # Global CSS
│   │   ├── colors.css       # CSS custom properties (design tokens)
│   │   ├── style.css        # Global layout, navbar styles
│   │   ├── home.css         # Homepage + dashboard shared styles
│   │   ├── itinerary.css    # Itinerary page — timeline, cards, slider
│   │   └── profile.css      # Profile page — layout, tabs, modal
│   │
│   ├── assets/              # Images, icons, static files imported by JS
│   ├── App.jsx              # Route definitions (React Router v6)
│   └── main.jsx             # App entry point — Bootstrap imported here
│
├── .env.example             # Template for required environment variables
├── .gitignore
├── index.html               # Vite HTML entry — Bootstrap Icons CDN loaded here
├── package.json
└── vite.config.js
```

---

## Routes

| Path           | Page             | Status |
|----------------|------------------|--------|
| `/`            | Home (marketing) | Done |
| `/dashboard`   | Dashboard        | Done |
| `/login`       | Login            | Done |
| `/register`    | Register         | Done |
| `/profile`     | Profile          | Done |
| `/eco-options` | Eco Options      | Placeholder |
| `/itinerary`   | Itinerary        | Done |
| `/weather`     | Weather          | Done |
| `/calculator`  | Calculator       | Placeholder |

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

The `src/api/` folder contains one file per domain area. Each function is currently a **placeholder** that returns mock data — the real API call is commented in directly above it.

**When the backend is ready:**

1. Set `VITE_API_BASE_URL` in your `.env` file.
2. Open the relevant file in `src/api/` (e.g. `auth.js`).
3. Uncomment the `request(...)` call and delete the mock block below it.

### API modules

| File | Endpoints covered |
|------|-------------------|
| `api/client.js` | Base fetch client, JWT header injection |
| `api/auth.js` | `POST /auth/login`, `POST /auth/register`, `POST /auth/logout` |
| `api/profile.js` | `GET/PUT /profile`, `PUT /profile/password`, `DELETE /profile` |
| `api/itinerary.js` | `GET /itinerary/recommendations`, `GET/POST/DELETE /itinerary/plan` |
| `api/weather.js` | `GET /weather?city=` |

### Expected backend response shapes

**`POST /auth/login`**
```json
{ "token": "jwt-string", "user": { "id": 1, "email": "...", "fullName": "..." } }
```

**`GET /profile`**
```json
{
  "fullName": "Eleanor Vance",
  "email": "eleanor@example.com",
  "phone": "+1 (555) 123-4567",
  "location": "Portland, USA",
  "bio": "...",
  "stats": { "carbonSaved": "120 kg CO2", "tripsTaken": 14 }
}
```

**`GET /itinerary/recommendations`**
```json
[
  { "id": 1, "name": "KLCC Park", "type": "nature", "budget": 0, "weather": "Sunny", "impact": "Low" }
]
```

**`GET /weather?city=kuala+lumpur`**
```json
{
  "city": "Kuala Lumpur",
  "condition": "Partly Cloudy",
  "humidity": "72%",
  "wind": "12 km/h",
  "temp": "31 C",
  "advice": "Bring a reusable water bottle.",
  "forecast": [
    { "day": "Mon", "icon": "bi-cloud-sun", "condition": "Partly Cloudy", "high": "32 C", "low": "25 C" }
  ]
}
```

---

## Design System

All colors are defined as CSS custom properties in `src/styles/colors.css` and used across every component via `var(--token-name)`.

Key tokens:

| Token | Value | Used for |
|-------|-------|----------|
| `--green-primary` | `#2e7d32` | Navbar, footer, headings, buttons |
| `--green-secondary` | `#66bb6a` | Hover states, accents |
| `--green-bg` | `#f1f8e9` | Page background |
| `--green-dark` | `#2d6a4f` | Profile UI, active states |
| `--earth-cream` | `#fefae0` | Edit button, stats badge |

---

## Assignment Info

- **Course:** WIF2003 — Web Programming
- **Project:** Eco-Friendly Travel Planner
- **Group:** 8
