import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EMAIL_REGEX } from '../utils/validators';

export default function RegisterPage() {
  const [fields, setFields] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  }

  function validate() {
    const next = {};
    if (!fields.fullName.trim()) {
      next.fullName = 'Please enter your full name.';
    }
    if (!EMAIL_REGEX.test(fields.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (fields.password.length < 8) {
      next.password = 'Password must be at least 8 characters.';
    }
    if (!fields.confirmPassword || fields.confirmPassword !== fields.password) {
      next.confirmPassword = 'Passwords do not match.';
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
    setSuccess(true);
  }

  return (
    <main className="container my-5" style={{ flex: 1 }}>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card-eco">
            <div className="p-4 p-md-5">
              <h2 className="eco-page-title text-center mb-4">Create an Account</h2>

              {success && (
                <div className="alert alert-success" role="alert">
                  Registration successful! You can now{' '}
                  <Link to="/login" className="alert-link">
                    login
                  </Link>
                  .
                </div>
              )}

              {!success && (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className={`form-control${errors.fullName ? ' is-invalid' : fields.fullName ? ' is-valid' : ''}`}
                      id="fullName"
                      name="fullName"
                      placeholder="Jane Doe"
                      value={fields.fullName}
                      onChange={handleChange}
                      required
                    />
                    {errors.fullName && (
                      <div className="invalid-feedback">{errors.fullName}</div>
                    )}
                  </div>

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

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control${errors.password ? ' is-invalid' : fields.password.length >= 8 ? ' is-valid' : ''}`}
                      id="password"
                      name="password"
                      placeholder="At least 8 characters"
                      value={fields.password}
                      onChange={handleChange}
                      required
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className={`form-control${errors.confirmPassword ? ' is-invalid' : fields.confirmPassword && fields.confirmPassword === fields.password ? ' is-valid' : ''}`}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Repeat your password"
                      value={fields.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>

                  <button type="submit" className="btn-eco-primary">
                    Register
                  </button>
                </form>
              )}

              <p className="text-center mt-4 mb-0">
                Already have an account?{' '}
                <Link to="/login" style={{ color: 'var(--green-primary)' }}>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
