/**
 * Single source of truth for all eco destinations.
 * Used by EcoOptionsPage (browse/favourites) and ItineraryPage (planning).
 *
 * Fields:
 *  id          — unique identifier
 *  name        — display name
 *  city        — city key: 'kl' | 'penang' | 'melaka' | 'sabah'
 *  category    — used by EcoOptionsPage filter: 'Accommodation' | 'Restaurant' | 'Transportation' | 'Activity'
 *  type        — used by ItineraryPage interest filter: 'nature' | 'culture' | 'food' | 'cycling'
 *  eco         — 1–5 star eco rating
 *  budget      — approximate cost in RM
 *  impact      — 'Low' | 'Medium' | 'High'
 *  impactNote  — one-sentence eco impact detail (shown in ItineraryPage cards)
 *  desc        — short description (shown in both pages)
 *  image       — Unsplash image URL
 */

export const CITY_LABELS = {
  kl:     'Kuala Lumpur',
  penang: 'Penang',
  melaka: 'Melaka',
  sabah:  'Sabah',
};

export const ECO_OPTIONS = [

  // ── Kuala Lumpur ────────────────────────────────────────────────────────────
  {
    id: 1, name: 'Green Leaf Boutique', city: 'kl',
    category: 'Accommodation', type: 'nature', eco: 5, budget: 150, impact: 'Low',
    desc: 'Solar-powered eco-resort with zero-waste facilities and organic amenities.',
    impactNote: 'Solar-powered with zero-waste facilities — among the lowest-footprint stays in KL.',
    image: 'https://images.unsplash.com/photo-1445991842772-097fea258e7b?w=400&h=200&fit=crop',
  },
  {
    id: 2, name: 'The Organic Kitchen', city: 'kl',
    category: 'Restaurant', type: 'food', eco: 4, budget: 35, impact: 'Low',
    desc: 'Farm-to-table restaurant serving organic vegan and vegetarian meals.',
    impactNote: 'Locally sourced ingredients reduce supply chain emissions. Minimal packaging waste.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=200&fit=crop',
  },
  {
    id: 3, name: 'EcoRail Tours', city: 'kl',
    category: 'Transportation', type: 'nature', eco: 4, budget: 25, impact: 'Low',
    desc: 'Low-carbon city tours using electric buses and eco-friendly transit.',
    impactNote: 'Electric transit only — no combustion engines on any route.',
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=400&h=200&fit=crop',
  },
  {
    id: 4, name: 'Rainforest Trekking', city: 'kl',
    category: 'Activity', type: 'nature', eco: 5, budget: 40, impact: 'Low',
    desc: 'Guided nature hikes through protected forest reserves with conservation focus.',
    impactNote: 'Walking only in protected reserves. Entry fees directly fund conservation programs.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
  },

  // ── Penang ───────────────────────────────────────────────────────────────────
  {
    id: 5, name: 'Penang Eco Resort', city: 'penang',
    category: 'Accommodation', type: 'nature', eco: 5, budget: 180, impact: 'Low',
    desc: 'Beachfront resort built with sustainable materials and rainwater harvesting systems.',
    impactNote: 'Rainwater harvesting and sustainable building materials significantly reduce environmental footprint.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=200&fit=crop',
  },
  {
    id: 6, name: 'Heritage Spice Café', city: 'penang',
    category: 'Restaurant', type: 'food', eco: 4, budget: 25, impact: 'Low',
    desc: 'Local cuisine using organic, locally-sourced ingredients from nearby farms.',
    impactNote: 'Supports local farmers directly. Organic sourcing cuts chemical runoff.',
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=200&fit=crop',
  },
  {
    id: 7, name: 'Green Cycling Tours', city: 'penang',
    category: 'Transportation', type: 'cycling', eco: 5, budget: 30, impact: 'Low',
    desc: "Bicycle tours exploring Georgetown's historic streets with zero emissions.",
    impactNote: 'Zero emissions. Cycling is the most sustainable way to experience urban heritage.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
  },
  {
    id: 8, name: 'Island Snorkeling', city: 'penang',
    category: 'Activity', type: 'nature', eco: 4, budget: 60, impact: 'Medium',
    desc: 'Eco-conscious marine exploration tours with reef protection guidelines.',
    impactNote: 'Reef protection guidelines are followed, but water entry still causes minor coral disturbance.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=200&fit=crop',
  },

  // ── Melaka ───────────────────────────────────────────────────────────────────
  {
    id: 9, name: 'River Valley Lodge', city: 'melaka',
    category: 'Accommodation', type: 'nature', eco: 4, budget: 120, impact: 'Low',
    desc: 'Traditional architecture meets sustainability with composting toilets and solar panels.',
    impactNote: 'Composting toilets and solar panels reduce grid dependence substantially.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=200&fit=crop',
  },
  {
    id: 10, name: 'Spice Route Kitchen', city: 'melaka',
    category: 'Restaurant', type: 'food', eco: 4, budget: 30, impact: 'Low',
    desc: 'Authentic Melaka cuisine prepared with heritage recipes and organic produce.',
    impactNote: 'Heritage recipes with organic produce. Supports traditional farming methods.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=200&fit=crop',
  },
  {
    id: 11, name: 'Heritage Walking Tours', city: 'melaka',
    category: 'Transportation', type: 'culture', eco: 5, budget: 0, impact: 'Low',
    desc: 'Explore UNESCO heritage sites on foot with knowledgeable local guides.',
    impactNote: 'Walking only — zero carbon. Directly supports local guides and heritage preservation.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop',
  },
  {
    id: 12, name: 'Mangrove Kayaking', city: 'melaka',
    category: 'Activity', type: 'nature', eco: 5, budget: 45, impact: 'Low',
    desc: 'Silent kayaking expeditions through mangrove forests observing local wildlife.',
    impactNote: 'Silent kayaking causes minimal wildlife disturbance. Entry fees fund mangrove conservation.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
  },

  // ── Sabah ────────────────────────────────────────────────────────────────────
  {
    id: 13, name: 'Jungle Lodge Sanctuary', city: 'sabah',
    category: 'Accommodation', type: 'nature', eco: 5, budget: 200, impact: 'Low',
    desc: 'Deep jungle lodge promoting biodiversity conservation and community tourism.',
    impactNote: 'Community-run with strict biodiversity rules. A portion of revenue funds wildlife conservation.',
    image: 'https://images.unsplash.com/photo-1518136247453-74e7b5265980?w=400&h=200&fit=crop',
  },
  {
    id: 14, name: 'Mountain Lodge Café', city: 'sabah',
    category: 'Restaurant', type: 'food', eco: 4, budget: 30, impact: 'Low',
    desc: 'Mountain retreat serving indigenous cuisine and sustainable locally-grown coffee.',
    impactNote: 'Indigenous ingredients sourced locally. Supports traditional farming communities.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=200&fit=crop',
  },
  {
    id: 15, name: 'Eco-Adventure Guides', city: 'sabah',
    category: 'Transportation', type: 'nature', eco: 4, budget: 80, impact: 'Medium',
    desc: 'Private guides for jungle trekking with minimal environmental impact practices.',
    impactNote: 'Minimal impact trekking, but jungle penetration can disturb habitats if not managed carefully.',
    image: 'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=400&h=200&fit=crop',
  },
];
