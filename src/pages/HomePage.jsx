import { Link } from 'react-router-dom';

const FEATURES = [
  {
    icon: 'bi-leaf',
    title: 'Eco-Friendly Options',
    text: 'Browse curated eco-friendly travel choices that minimise environmental impact at every step.',
  },
  {
    icon: 'bi-map',
    title: 'Green Itinerary',
    text: 'Build day-by-day travel itineraries that prioritise sustainable destinations and low-impact activities.',
  },
  {
    icon: 'bi-cloud-sun',
    title: 'Weather Forecast',
    text: 'Check real-time weather forecasts to plan your trips safely and avoid unexpected conditions.',
  },
  {
    icon: 'bi-calculator',
    title: 'Carbon Calculator',
    text: 'Estimate and track the carbon footprint of your transport choices and travel activities.',
  },
  {
    icon: 'bi-person-circle',
    title: 'Profile Management',
    text: 'Manage your personal profile and keep track of your travel history and sustainability goals.',
  },
  {
    icon: 'bi-person-plus',
    title: 'Register & Login',
    text: 'Create a free account or sign in to save your preferences and itineraries securely.',
  },
];

export default function HomePage() {
  return (
    <main style={{ flex: 1 }}>
      {/* Hero Section */}
      <section
        className="py-5 text-center"
        style={{ backgroundColor: 'var(--green-primary)', color: 'var(--white)' }}
      >
        <div className="container py-4">
          <h1
            className="display-4 fw-bold mb-3"
            style={{ color: 'var(--white)' }}
          >
            Plan Your Eco-Friendly Journey
          </h1>
          <p className="lead mb-4">
            Discover sustainable travel options that reduce your carbon footprint
            while exploring the world.
          </p>
          <Link
            to="/register"
            className="btn btn-light btn-lg me-3 fw-semibold"
            style={{ color: 'var(--green-primary)' }}
          >
            Get Started
          </Link>
          <Link to="/login" className="btn btn-outline-light btn-lg">
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Our Features</h2>
          <div className="row g-4">
            {FEATURES.map(({ icon, title, text }) => (
              <div className="col-md-4" key={title}>
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4">
                    <i
                      className={`bi ${icon} fs-1 mb-3 d-block`}
                      style={{ color: 'var(--green-primary)' }}
                    />
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
