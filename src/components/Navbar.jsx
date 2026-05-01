import { NavLink, Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const APP_LINKS = [
  { to: '/dashboard',   label: 'Dashboard' },
  { to: '/eco-options', label: 'Eco Options' },
  { to: '/itinerary',   label: 'Itinerary' },
  { to: '/weather',     label: 'Weather' },
  { to: '/calculator',  label: 'Carbon Calc' },
  { to: '/profile',     label: 'Profile' },
];

export default function Navbar() {
  const { user } = useAppContext();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg eco-navbar">
      <div className="container">
        {/* Brand */}
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <Leaf size={20} color="var(--green-primary)" style={{ marginRight: '0.4rem' }} />
          EcoWay
        </NavLink>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ boxShadow: 'none' }}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          {/* Nav links — always visible */}
          <ul className="navbar-nav mx-auto d-flex flex-row gap-1 mb-0">
            {APP_LINKS.map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link eco-nav-link${isActive ? ' active' : ''}`
                  }
                  to={to}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right side — changes based on auth state */}
          {isLoggedIn ? (
            <div className="d-flex align-items-center gap-2 ms-auto">
              <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)', whiteSpace: 'nowrap' }}>
                Hi, {user?.firstName} 👋
              </span>
              <div className="navbar-user-avatar">
                {user?.firstName?.[0]?.toUpperCase() ?? 'U'}
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-sm"
                style={{
                  border: '1px solid var(--gray-300)',
                  color: 'var(--gray-700)',
                  fontSize: '0.8rem',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '0.5rem',
                  background: 'transparent',
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2 ms-auto">
              <Link
                to="/login"
                className="btn btn-sm"
                style={{ color: 'var(--gray-700)', fontSize: '0.875rem' }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-sm"
                style={{
                  background: 'var(--gray-900)',
                  color: 'var(--white)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  padding: '0.4rem 0.9rem',
                }}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
