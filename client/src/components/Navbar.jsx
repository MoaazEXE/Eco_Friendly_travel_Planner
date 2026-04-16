import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/',            label: 'Home',        end: true },
  { to: '/login',       label: 'Login' },
  { to: '/register',    label: 'Register' },
  { to: '/profile',     label: 'Profile' },
  { to: '/eco-options', label: 'Eco Options' },
  { to: '/itinerary',   label: 'Itinerary' },
  { to: '/weather',     label: 'Weather' },
  { to: '/calculator',  label: 'Calculator' },
];

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          EcoTravel
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto">
            {NAV_LINKS.map(({ to, label, end }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' active' : ''}`
                  }
                  to={to}
                  end={end}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
