import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { LeafCompassGuide } from '../components/LeafCompassGuide';
import { ECO_OPTIONS, CITY_LABELS } from '../data/ecoOptions';
import { TRANSPORT_FACTORS, ACCOMMODATION_FACTORS } from '../constants/calculatorConfig';
import '../styles/home.css';

/* ── Derived stats (single source of truth: data files) ─────── */
const DESTINATION_COUNT = ECO_OPTIONS.length;
const CITY_COUNT        = Object.keys(CITY_LABELS).length;
const CITY_NAMES        = Object.values(CITY_LABELS).join(' · ');
const TRANSPORT_COUNT   = Object.keys(TRANSPORT_FACTORS).length;
const STAY_COUNT        = Object.keys(ACCOMMODATION_FACTORS).length;
const TRAIN_VS_FLIGHT   = Math.round((1 - TRANSPORT_FACTORS.train / TRANSPORT_FACTORS.flight) * 100);

/* Transport rows for the methodology chart, sorted highest → lowest */
const TRANSPORT_ROWS = Object.entries(TRANSPORT_FACTORS)
  .map(([key, kgPerKm]) => ({ key, kgPerKm }))
  .sort((a, b) => b.kgPerKm - a.kgPerKm);
const MAX_FACTOR = TRANSPORT_ROWS[0].kgPerKm;
const TRANSPORT_LABEL = {
  flight: 'Flight',
  car:    'Car',
  bus:    'Bus',
  train:  'Train',
};

/* ── Feature cards — each maps to a real app page ───────────── */
const FEATURES = [
  { icon: '🌍', title: 'Eco Options',       to: '/eco-options', desc: `Browse ${DESTINATION_COUNT} curated stays, restaurants, transport, and activities across ${CITY_COUNT} Malaysian cities.`, accent: 'var(--green-primary)' },
  { icon: '🗺️', title: 'Green Itinerary',   to: '/itinerary',   desc: 'Plan day-by-day trips filtered by interests and budget — every stop carries an eco rating.',                                accent: 'var(--green-darker)' },
  { icon: '☁️', title: 'Weather Forecast',  to: '/weather',     desc: 'Check destination conditions before you travel so you can pack and plan low-impact activities.',                          accent: '#60a5fa' },
  { icon: '🌱', title: 'Carbon Calculator', to: '/calculator',  desc: `Estimate trip emissions across ${TRANSPORT_COUNT} transport modes and ${STAY_COUNT} stay types, with offset suggestions.`, accent: 'var(--green-secondary)' },
  { icon: '❤️', title: 'Favourites',        to: '/eco-options', desc: 'Save the spots that match your values — your shortlist persists locally between sessions.',                              accent: '#f97316' },
  { icon: '👤', title: 'Profile',           to: '/profile',     desc: 'See your saved plan, favourites, and the sustainability choices you have made so far.',                                  accent: '#8b5cf6' },
];

/* ── Animation helpers ──────────────────────────────────────── */
const VP   = { once: true, margin: '-72px' };
const ease = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    VP,
  transition:  { duration: 0.65, ease, delay },
});

export default function HomePage() {
  return (
    <main style={{ flex: 1 }}>

      {/* ══ HERO (dark green) ════════════════════════════════ */}
      <section className="lp-hero">
        {/* Decorative orbs on the right */}
        <div className="lp-hero-orb lp-hero-orb-outer" aria-hidden="true" />
        <div className="lp-hero-orb lp-hero-orb-inner" aria-hidden="true" />
        <div className="lp-hero-orb lp-hero-orb-side"  aria-hidden="true" />

        <div className="container-xl px-4 px-lg-5 lp-hero-inner">
          <div className="row align-items-center" style={{ minHeight: '70vh' }}>
            <div className="col-12 col-lg-7" style={{ position: 'relative', zIndex: 2 }}>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="lp-hero-pill"
              >
                <span aria-hidden="true">🌍</span>
                <span>Sustainable Travel Platform</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.08 }}
                className="lp-hero-h1"
              >
                Travel <span className="lp-hero-accent">wisely,</span>
                <br />leave the world better.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease, delay: 0.18 }}
                className="lp-hero-lead"
              >
                Discover {DESTINATION_COUNT} curated eco-spots across {CITY_COUNT} Malaysian cities,
                compare the real CO₂ cost of how you travel, and build itineraries
                that match your values.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.26 }}
                className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-2"
              >
                <Link to="/eco-options" className="lp-btn-primary">
                  Start Exploring <ArrowRight size={16} />
                </Link>
                <a href="#what-we-offer" className="lp-btn-ghost">
                  Learn More
                </a>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Curved bottom divider into the cream section */}
        <svg
          className="lp-hero-wave"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,60 C240,100 480,20 720,40 C960,60 1200,100 1440,60 L1440,100 L0,100 Z"
            fill="var(--green-surface)"
          />
        </svg>
      </section>

      {/* ══ FEATURES (cream) ═════════════════════════════════ */}
      <section id="what-we-offer" className="home-section-cream" style={{ padding: '6rem 0 5rem' }}>
        <div className="container-xl px-4 px-lg-5">

          {/* Section header */}
          <div className="text-center" style={{ maxWidth: '44rem', margin: '0 auto 4rem' }}>
            <motion.div {...fadeUp(0)} className="lp-eyebrow">What we offer</motion.div>
            <motion.h2 {...fadeUp(0.06)} className="lp-section-h2">
              Everything you need for <span className="lp-section-accent">responsible</span> travel
            </motion.h2>
            <motion.p {...fadeUp(0.12)} className="lp-section-lead">
              From planning to tracking, EcoWay gives you every tool to make your
              journeys greener and more meaningful.
            </motion.p>
          </div>

          {/* Feature grid */}
          <div className="row g-4">
            {FEATURES.map(({ icon, title, to, desc, accent }, i) => (
              <motion.div
                key={title}
                {...fadeUp(i * 0.05)}
                className="col-12 col-md-6 col-lg-4"
              >
                <Link
                  to={to}
                  className="lp-feature-card"
                  style={{ '--feature-accent': accent }}
                >
                  <div className="lp-feature-icon" aria-hidden="true">{icon}</div>
                  <div className="lp-feature-title">{title}</div>
                  <p className="lp-feature-desc">{desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ METHODOLOGY — real numbers, real source ═════════ */}
      <section className="home-section-white" style={{ padding: '5rem 0' }}>
        <div className="container-xl px-4 px-lg-5">
          <div className="row align-items-center g-5">

            <div className="col-12 col-lg-5">
              <motion.div {...fadeUp(0)} className="lp-eyebrow">Built on real data</motion.div>
              <motion.h2 {...fadeUp(0.06)} className="lp-section-h2" style={{ textAlign: 'left' }}>
                Honest emission factors. <span className="lp-section-accent">No greenwashing.</span>
              </motion.h2>
              <motion.p {...fadeUp(0.12)} className="lp-section-lead" style={{ textAlign: 'left' }}>
                Every CO₂ estimate uses transparent per-kilometre factors aligned with
                published government datasets — so the train-vs-flight tradeoff you see
                in the calculator is one you can verify.
              </motion.p>
              <motion.p {...fadeUp(0.18)} className="lp-source-line">
                Source: <a href="https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting" target="_blank" rel="noreferrer">UK DEFRA — Greenhouse gas reporting: conversion factors</a>
              </motion.p>
            </div>

            <div className="col-12 col-lg-7">
              <motion.div {...fadeUp(0.1)} className="lp-chart">
                <div className="lp-chart-header">
                  <span>Transport mode</span>
                  <span>kg CO₂ per km</span>
                </div>
                {TRANSPORT_ROWS.map(({ key, kgPerKm }) => {
                  const widthPct = (kgPerKm / MAX_FACTOR) * 100;
                  const isLowest = key === 'train';
                  return (
                    <div key={key} className="lp-chart-row">
                      <div className="lp-chart-label">{TRANSPORT_LABEL[key]}</div>
                      <div className="lp-chart-track">
                        <div
                          className={`lp-chart-fill${isLowest ? ' lp-chart-fill-best' : ''}`}
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                      <div className="lp-chart-value">{kgPerKm.toFixed(3)}</div>
                    </div>
                  );
                })}
                <div className="lp-chart-footnote">
                  Train emits roughly <strong>{TRAIN_VS_FLIGHT}% less CO₂ per kilometre</strong> than flying.
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ HONEST QUOTE (cream) ═════════════════════════════ */}
      <section className="home-section-cream" style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '52rem', textAlign: 'center' }}>
          <motion.div {...fadeUp(0)} className="lp-quote-deco" aria-hidden="true">
            <LeafCompassGuide size="xs" />
            <span className="lp-quote-dot" />
            <span className="lp-quote-dot" />
            <span className="lp-quote-dot" />
          </motion.div>

          <motion.blockquote {...fadeUp(0.08)} className="lp-quote-text">
            “Aviation is responsible for around 2.5% of global CO₂ emissions —
            but for a frequent flier, flights can easily be the single largest
            slice of their personal carbon footprint.”
          </motion.blockquote>

          <motion.div {...fadeUp(0.16)} className="lp-quote-attrib">
            — <a href="https://ourworldindata.org/co2-emissions-from-aviation" target="_blank" rel="noreferrer">Our World in Data · Climate change & aviation</a>
          </motion.div>

          <motion.div {...fadeUp(0.22)} className="lp-quote-deco" aria-hidden="true" style={{ marginTop: '2rem' }}>
            <span className="lp-quote-dot" />
            <span className="lp-quote-dot" />
            <span className="lp-quote-dot" />
            <LeafCompassGuide size="xs" />
          </motion.div>
        </div>
      </section>

      {/* ══ FINAL CTA (dark) ═════════════════════════════════ */}
      <section className="lp-cta-section">
        <div className="container" style={{ maxWidth: '46rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.h2 {...fadeUp(0)} className="lp-cta-h2">
            Plan your first low-impact trip.
          </motion.h2>
          <motion.p {...fadeUp(0.08)} className="lp-cta-lead">
            No signups required to explore. Browse destinations, run the calculator, and
            see the difference your choices make — in {CITY_NAMES}.
          </motion.p>
          <motion.div {...fadeUp(0.16)} className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2">
            <Link to="/eco-options" className="lp-btn-primary">
              Start Exploring <ArrowRight size={16} />
            </Link>
            <Link to="/calculator" className="lp-btn-ghost">
              Calculate a Trip
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
