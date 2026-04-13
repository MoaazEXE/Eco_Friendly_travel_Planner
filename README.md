# Eco-Friendly Travel Planner

WIF2003 Web Programming — University Group Project

A web application that helps users plan eco-friendly travel itineraries, compare carbon footprints, and choose sustainable transport options.

## Pages

- **Home** — Landing page
- **Login / Register** — User authentication
- **Profile** — User profile management
- **Eco Options** — Sustainable travel alternatives
- **Itinerary** — Trip planning and management
- **Weather** — Weather forecast for destinations
- **Calculator** — Carbon footprint calculator

## Tech Stack

- HTML5, CSS3, JavaScript
- Bootstrap 5

---

## Color System — Team Rules

All colors are defined as CSS variables in **`css/colors.css`**.  
`style.css` imports it automatically, so every page that links `style.css` has access to every token.

### Rule: never write a raw color value in your code

```css
/* WRONG */
color: #2e7d32;
background: #fff;
box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);

/* CORRECT */
color: var(--green-primary);
background: var(--white);
box-shadow: 0 2px 8px var(--danger-shadow);
```

This applies to **CSS files**, **`<style>` blocks inside HTML**, and **inline `style="..."` attributes**.

---

### Available Tokens

#### Green palette
| Variable | Value | Use for |
|---|---|---|
| `--green-darkest` | `#1b4332` | Darkest hover state on buttons |
| `--green-darker` | `#1b5e20` | Body text |
| `--green-dark` | `#2d6a4f` | Profile accents, camera button |
| `--green-primary` | `#2e7d32` | Navbar, footer, headings, primary buttons |
| `--green-success` | `#198754` | Itinerary badges & timeline |
| `--green-mid` | `#40916c` | Profile mid-tone text |
| `--green-secondary` | `#66bb6a` | Nav link hover, secondary accents |
| `--green-light` | `#74c69d` | Focus rings, toggle active state |
| `--green-pale` | `#d8f3dc` | Tab icon backgrounds |
| `--green-subtle` | `#e9f5ee` | Itinerary icon box background |
| `--green-bg` | `#f1f8e9` | Default page background |
| `--green-surface` | `#f8f9f6` | Profile page background |

#### Earth & cream
| Variable | Value | Use for |
|---|---|---|
| `--earth-cream` | `#fefae0` | Stats badge, edit button bg |
| `--earth-tan` | `#d4a373` | Base for tan alpha tokens |

#### Neutrals
| Variable | Value | Use for |
|---|---|---|
| `--white` | `#ffffff` | Card backgrounds, text on dark |
| `--gray-50` | `#f9fafb` | Form input bg |
| `--gray-100` | `#f3f4f6` | Hover backgrounds, dividers |
| `--gray-200` | `#e5e7eb` | Input borders |
| `--gray-300` | `#d1d5db` | Cancel button border |
| `--gray-350` | `#dee2e6` | Bootstrap dashed borders |
| `--gray-400` | `#9ca3af` | Placeholder / label text |
| `--gray-500` | `#6b7280` | Secondary / hint text |
| `--gray-600` | `#4b5563` | Supporting body text |
| `--gray-700` | `#374151` | Form labels |
| `--gray-800` | `#2d3436` | Card titles |
| `--gray-900` | `#111827` | Primary input text |
| `--gray-line` | `#e9ecef` | Timeline / divider lines |

#### Danger / red
| Variable | Value | Use for |
|---|---|---|
| `--danger` | `#dc2626` | Delete confirm button |
| `--danger-dark` | `#b91c1c` | Delete hover state |
| `--danger-soft` | `#ff7675` | Soft delete icon (itinerary) |
| `--danger-bg` | `#fef2f2` | Delete button background |
| `--danger-bg-hover` | `#fee2e2` | Delete button hover bg |
| `--danger-bg-subtle` | `#fff5f5` | Danger badge background |
| `--danger-border` | `#fecaca` | Delete button border |

#### Warning
| Variable | Value | Use for |
|---|---|---|
| `--warning-bg` | `#fef8e7` | Warning badge background |

#### Shadows & overlays
| Variable | Value | Use for |
|---|---|---|
| `--shadow-card` | `rgba(0,0,0,0.08)` | Profile cards / sidebar |
| `--shadow-xs` | `rgba(0,0,0,0.05)` | Subtle elevation |
| `--shadow-sm` | `rgba(0,0,0,0.075)` | Bootstrap shadow-sm override |
| `--shadow-md` | `rgba(0,0,0,0.10)` | Card hover |
| `--shadow-lg` | `rgba(0,0,0,0.15)` | Avatar portrait |
| `--shadow-xl` | `rgba(0,0,0,0.20)` | Toggle knob, slider thumb |
| `--shadow-2xl` | `rgba(0,0,0,0.25)` | Modal card |
| `--overlay` | `rgba(0,0,0,0.55)` | Modal backdrop |
| `--forest-a20/35/40/45` | forest green + opacity | Cover overlays, tab shadow |
| `--tan-a12/35/45` | earth tan + opacity | Delete warning, edit border |
| `--cream-a55/60/70` | earth cream + opacity | Hover backgrounds |
| `--white-a70` | `rgba(255,255,255,0.70)` | Active tab description |
| `--success-shadow` | `rgba(25,135,84,0.20)` | Itinerary badge shadow |
| `--danger-shadow` | `rgba(220,38,38,0.30)` | Delete confirm shadow |

---

### Adding a new page or component

1. **Never** add a new color without checking `css/colors.css` first.
2. If the color you need already exists under a different name, use that token.
3. If you genuinely need a new color, add it to `css/colors.css` with a comment explaining its purpose — **do not** put it in a `<style>` block or inline style.
4. Follow the naming convention: `--category-shade` (e.g. `--green-light`, `--danger-dark`).

### Backward-compat aliases

The old variable names still work (they are aliased in `colors.css`) but new code should use the canonical names:

| Old name | Canonical name |
|---|---|
| `--primary-green` | `--green-primary` |
| `--secondary-green` | `--green-secondary` |
| `--light-bg` | `--green-bg` |
| `--dark-text` | `--green-darker` |
