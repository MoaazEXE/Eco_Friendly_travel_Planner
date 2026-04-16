import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const navigate = useNavigate();

  const [fields, setFields] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear the error for this field as the user types
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  }

  function validate() {
    const next = {};
    if (!EMAIL_REGEX.test(fields.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!fields.password.trim()) {
      next.password = 'Password is required.';
    }
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    navigate('/');
  }

  return (
    <main className="container my-5" style={{ flex: 1 }}>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow">
            <div className="card-body p-4 p-md-5">
              <h2 className="card-title text-center mb-4">Welcome Back</h2>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`form-control${errors.email ? ' is-invalid' : fields.email ? ' is-valid' : ''}`}
                    id="email"
                    name="email"
                    placeholder="jane@example.com"
                    value={fields.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control${errors.password ? ' is-invalid' : fields.password ? ' is-valid' : ''}`}
                    id="password"
                    name="password"
                    placeholder="Your password"
                    value={fields.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-lg w-100"
                  style={{
                    backgroundColor: 'var(--green-primary)',
                    color: 'var(--white)',
                  }}
                >
                  Login
                </button>
              </form>

              <p className="text-center mt-4 mb-0">
                Don&apos;t have an account?{' '}
                <Link to="/register" style={{ color: 'var(--green-primary)' }}>
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
