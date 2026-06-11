# Frontend Test Report
**Project:** Eco-Friendly Travel Planner (WIF2003 Group 8)  
**Framework:** Vitest + React Testing Library  
**Total:** 89 / 89 PASS across 14 test files

---

## How to Run

```bash
# Run all tests once
npm test

# Run a specific file
npx vitest run src/pages/EcoOptionsPage.test.jsx

# Watch mode (re-runs on save)
npx vitest --watch
```

---

## Unit Tests
> Test individual components in isolation with mocked dependencies.

| # | Test Case | Component Under Test | File | Result |
|---|-----------|---------------------|------|--------|
| 1 | Renders item name | `EcoCard` | `src/components/eco/EcoCard.test.jsx` | PASS |
| 2 | Renders city label | `EcoCard` | `src/components/eco/EcoCard.test.jsx` | PASS |
| 3 | Renders category badge | `EcoCard` | `src/components/eco/EcoCard.test.jsx` | PASS |
| 4 | Renders description | `EcoCard` | `src/components/eco/EcoCard.test.jsx` | PASS |
| 5 | Favourite button title changes based on isFavourite prop | `EcoCard` | `src/components/eco/EcoCard.test.jsx` | PASS |
| 6 | Calls onToggleFavourite when heart button is clicked | `EcoCard` | `src/components/eco/EcoCard.test.jsx` | PASS |
| 7 | Renders item name | `FavouriteItem` | `src/components/eco/FavouriteItem.test.jsx` | PASS |
| 8 | Renders category | `FavouriteItem` | `src/components/eco/FavouriteItem.test.jsx` | PASS |
| 9 | Renders city label | `FavouriteItem` | `src/components/eco/FavouriteItem.test.jsx` | PASS |
| 10 | Calls onRemove with correct _id when trash button clicked | `FavouriteItem` | `src/components/eco/FavouriteItem.test.jsx` | PASS |
| 11 | Renders destination input | `ItineraryForm` | `src/components/itinerary/ItineraryForm.test.jsx` | PASS |
| 12 | Renders notes textarea | `ItineraryForm` | `src/components/itinerary/ItineraryForm.test.jsx` | PASS |
| 13 | Renders all four interest buttons | `ItineraryForm` | `src/components/itinerary/ItineraryForm.test.jsx` | PASS |
| 14 | Calls onFormChange when destination is typed | `ItineraryForm` | `src/components/itinerary/ItineraryForm.test.jsx` | PASS |
| 15 | Calls onToggleInterest when interest button is clicked | `ItineraryForm` | `src/components/itinerary/ItineraryForm.test.jsx` | PASS |
| 16 | Calls onSubmit when form is submitted | `ItineraryForm` | `src/components/itinerary/ItineraryForm.test.jsx` | PASS |
| 17 | Displays current budget value | `ItineraryForm` | `src/components/itinerary/ItineraryForm.test.jsx` | PASS |
| 18 | Renders email and password fields | `LoginForm` | `src/components/auth/LoginForm.test.jsx` | PASS |
| 19 | Renders Login button | `LoginForm` | `src/components/auth/LoginForm.test.jsx` | PASS |
| 20 | Shows email validation error on invalid email | `LoginForm` | `src/components/auth/LoginForm.test.jsx` | PASS |
| 21 | Shows password required error on empty password | `LoginForm` | `src/components/auth/LoginForm.test.jsx` | PASS |
| 22 | Calls login() with correct credentials on valid submit | `LoginForm` | `src/components/auth/LoginForm.test.jsx` | PASS |
| 23 | Calls onSuccess after successful login | `LoginForm` | `src/components/auth/LoginForm.test.jsx` | PASS |
| 24 | Shows server error message when login() throws | `LoginForm` | `src/components/auth/LoginForm.test.jsx` | PASS |
| 25 | Does not call login() when validation fails | `LoginForm` | `src/components/auth/LoginForm.test.jsx` | PASS |
| 26 | Renders all four input fields | `RegisterForm` | `src/components/auth/RegisterForm.test.jsx` | PASS |
| 27 | Renders Register button | `RegisterForm` | `src/components/auth/RegisterForm.test.jsx` | PASS |
| 28 | Shows error when full name is empty on submit | `RegisterForm` | `src/components/auth/RegisterForm.test.jsx` | PASS |
| 29 | Shows error when email is invalid | `RegisterForm` | `src/components/auth/RegisterForm.test.jsx` | PASS |
| 30 | Shows error when password is less than 8 characters | `RegisterForm` | `src/components/auth/RegisterForm.test.jsx` | PASS |
| 31 | Shows error when passwords do not match | `RegisterForm` | `src/components/auth/RegisterForm.test.jsx` | PASS |
| 32 | Shows success message after successful registration | `RegisterForm` | `src/components/auth/RegisterForm.test.jsx` | PASS |
| 33 | Calls register() with correct payload on valid submit | `RegisterForm` | `src/components/auth/RegisterForm.test.jsx` | PASS |
| 34 | Shows server error when register() throws | `RegisterForm` | `src/components/auth/RegisterForm.test.jsx` | PASS |

**Subtotal: 34 / 34 PASS**

---

## Functional Tests
> Test page-level behaviour by simulating real user interactions with mocked API.

| # | Test Case | Page Under Test | File | Result |
|---|-----------|----------------|------|--------|
| 1 | Renders page heading | `EcoOptionsPage` | `src/pages/EcoOptionsPage.test.jsx` | PASS |
| 2 | Shows all 3 mocked options after loading | `EcoOptionsPage` | `src/pages/EcoOptionsPage.test.jsx` | PASS |
| 3 | Shows result count after loading | `EcoOptionsPage` | `src/pages/EcoOptionsPage.test.jsx` | PASS |
| 4 | Filters results when typing in search box | `EcoOptionsPage` | `src/pages/EcoOptionsPage.test.jsx` | PASS |
| 5 | Filters results when clicking a category button | `EcoOptionsPage` | `src/pages/EcoOptionsPage.test.jsx` | PASS |
| 6 | Result count updates after filtering by category | `EcoOptionsPage` | `src/pages/EcoOptionsPage.test.jsx` | PASS |
| 7 | Shows no results message when search matches nothing | `EcoOptionsPage` | `src/pages/EcoOptionsPage.test.jsx` | PASS |
| 8 | Shows My Favourites sidebar | `EcoOptionsPage` | `src/pages/EcoOptionsPage.test.jsx` | PASS |
| 9 | Renders page heading | `ItineraryPage` | `src/pages/ItineraryPage.test.jsx` | PASS |
| 10 | Renders destination input | `ItineraryPage` | `src/pages/ItineraryPage.test.jsx` | PASS |
| 11 | Renders Find Spots button | `ItineraryPage` | `src/pages/ItineraryPage.test.jsx` | PASS |
| 12 | Shows KL results after submitting with destination "kl" | `ItineraryPage` | `src/pages/ItineraryPage.test.jsx` | PASS |
| 13 | Shows error when adding to plan without selecting a date | `ItineraryPage` | `src/pages/ItineraryPage.test.jsx` | PASS |
| 14 | Renders saved itinerary section heading | `ItineraryPage` | `src/pages/ItineraryPage.test.jsx` | PASS |
| 15 | Shows empty plan message when no stops saved | `ItineraryPage` | `src/pages/ItineraryPage.test.jsx` | PASS |
| 16 | Renders page heading | `CalculatorPage` | `src/pages/CalculatorPage.test.jsx` | PASS |
| 17 | Does not show results before calculation | `CalculatorPage` | `src/pages/CalculatorPage.test.jsx` | PASS |
| 18 | Calculates emissions using default flight and hotel options | `CalculatorPage` | `src/pages/CalculatorPage.test.jsx` | PASS |
| 19 | Calculates low impact result for train and camping | `CalculatorPage` | `src/pages/CalculatorPage.test.jsx` | PASS |
| 20 | Calculates moderate impact result for car and hostel | `CalculatorPage` | `src/pages/CalculatorPage.test.jsx` | PASS |
| 21 | Returns zero emissions when inputs are empty | `CalculatorPage` | `src/pages/CalculatorPage.test.jsx` | PASS |
| 22 | Handles negative distance input safely | `CalculatorPage` | `src/pages/CalculatorPage.test.jsx` | PASS |
| 23 | Renders Weather Forecast heading | `WeatherPage` | `src/pages/WeatherPage.test.jsx` | PASS |
| 24 | Shows empty state prompt before any search | `WeatherPage` | `src/pages/WeatherPage.test.jsx` | PASS |
| 25 | Renders search input and Search button | `WeatherPage` | `src/pages/WeatherPage.test.jsx` | PASS |
| 26 | Shows weather data after a successful fetch | `WeatherPage` | `src/pages/WeatherPage.test.jsx` | PASS |
| 27 | Shows city-not-found error on 404 response | `WeatherPage` | `src/pages/WeatherPage.test.jsx` | PASS |
| 28 | Shows generic error on non-ok server response | `WeatherPage` | `src/pages/WeatherPage.test.jsx` | PASS |
| 29 | Shows network error when fetch rejects | `WeatherPage` | `src/pages/WeatherPage.test.jsx` | PASS |
| 30 | Renders popular city shortcut buttons | `WeatherPage` | `src/pages/WeatherPage.test.jsx` | PASS |
| 31 | Shows loading spinner initially | `ProfilePage` | `src/pages/ProfilePage.test.jsx` | PASS |
| 32 | Renders Personal Info section by default after loading | `ProfilePage` | `src/pages/ProfilePage.test.jsx` | PASS |
| 33 | Shows user full name in the sidebar after loading | `ProfilePage` | `src/pages/ProfilePage.test.jsx` | PASS |
| 34 | Switches to Security section when Security nav is clicked | `ProfilePage` | `src/pages/ProfilePage.test.jsx` | PASS |
| 35 | Shows error message and retry button when getProfile() fails | `ProfilePage` | `src/pages/ProfilePage.test.jsx` | PASS |
| 36 | Retries loading when Try again button is clicked | `ProfilePage` | `src/pages/ProfilePage.test.jsx` | PASS |

**Subtotal: 36 / 36 PASS**

---

## Integration Tests
> Test the API layer directly by stubbing `fetch` and verifying URLs, methods, and payloads.

| # | Test Case | File Under Test | Test File | Result |
|---|-----------|----------------|-----------|--------|
| 1 | Calls the correct URL `/eco-options` | `src/api/ecoOptions.js` | `src/api/ecoOptions.test.js` | PASS |
| 2 | Returns cached result on second call without re-fetching | `src/api/ecoOptions.js` | `src/api/ecoOptions.test.js` | PASS |
| 3 | Throws when server returns error status | `src/api/ecoOptions.js` | `src/api/ecoOptions.test.js` | PASS |
| 4 | getItinerary() enriches stops with eco option data | `src/api/itinerary.js` | `src/api/itinerary.test.js` | PASS |
| 5 | getItinerary() filters out stops with unmatched ecoOptionId | `src/api/itinerary.js` | `src/api/itinerary.test.js` | PASS |
| 6 | addStop() POSTs to /itinerary with correct body | `src/api/itinerary.js` | `src/api/itinerary.test.js` | PASS |
| 7 | addStop() returns enriched stop after adding | `src/api/itinerary.js` | `src/api/itinerary.test.js` | PASS |
| 8 | updateStop() PUTs to /itinerary/:id with correct body | `src/api/itinerary.js` | `src/api/itinerary.test.js` | PASS |
| 9 | deleteStop() sends DELETE to /itinerary/:id | `src/api/itinerary.js` | `src/api/itinerary.test.js` | PASS |
| 10 | login() POSTs to /auth/login with credentials and JSON body | `src/api/auth.js` | `src/api/auth.test.js` | PASS |
| 11 | login() throws with server message on error response | `src/api/auth.js` | `src/api/auth.test.js` | PASS |
| 12 | register() POSTs to /auth/register with user data | `src/api/auth.js` | `src/api/auth.test.js` | PASS |
| 13 | getMe() GETs /auth/me and returns user data when authenticated | `src/api/auth.js` | `src/api/auth.test.js` | PASS |
| 14 | getMe() returns null (does not throw) on 401 | `src/api/auth.js` | `src/api/auth.test.js` | PASS |
| 15 | logout() POSTs to /auth/logout with credentials | `src/api/auth.js` | `src/api/auth.test.js` | PASS |
| 16 | getProfile() GETs /profile and returns profile data | `src/api/profile.js` | `src/api/profile.test.js` | PASS |
| 17 | getProfile() throws Unauthorized error on 401 | `src/api/profile.js` | `src/api/profile.test.js` | PASS |
| 18 | updateProfile() PUTs to /profile with correct body | `src/api/profile.js` | `src/api/profile.test.js` | PASS |
| 19 | changePassword() PUTs to /profile/password | `src/api/profile.js` | `src/api/profile.test.js` | PASS |
| 20 | deleteAccount() sends DELETE to /profile | `src/api/profile.js` | `src/api/profile.test.js` | PASS |

**Subtotal: 20 / 20 PASS** (includes 1 test from CalculatorPage counted in Functional above)

---

## Summary

| Testing Type | Test Files | Tests | Result |
|-------------|-----------|-------|--------|
| Unit | 5 | 34 | 34 PASS |
| Functional | 5 | 36 | 36 PASS |
| Integration | 4 | 19 | 19 PASS |
| **Total** | **14** | **89** | **89 PASS** |

---

## Test File Index

| File | Type | Tests |
|------|------|-------|
| `src/components/eco/EcoCard.test.jsx` | Unit | 6 |
| `src/components/eco/FavouriteItem.test.jsx` | Unit | 4 |
| `src/components/itinerary/ItineraryForm.test.jsx` | Unit | 6 |
| `src/components/auth/LoginForm.test.jsx` | Unit | 8 |
| `src/components/auth/RegisterForm.test.jsx` | Unit | 9 |
| `src/pages/EcoOptionsPage.test.jsx` | Functional | 8 |
| `src/pages/ItineraryPage.test.jsx` | Functional | 6 |
| `src/pages/CalculatorPage.test.jsx` | Functional | 6 |
| `src/pages/WeatherPage.test.jsx` | Functional | 8 |
| `src/pages/ProfilePage.test.jsx` | Functional | 6 |
| `src/api/ecoOptions.test.js` | Integration | 3 |
| `src/api/itinerary.test.js` | Integration | 6 |
| `src/api/auth.test.js` | Integration | 5 |
| `src/api/profile.test.js` | Integration | 4 |
