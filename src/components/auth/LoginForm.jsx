import { useState } from "react";
import PropTypes from "prop-types";
import { EMAIL_REGEX } from "../../utils/validators";

export default function LoginForm({ onSuccess }) {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  }

  function validate() {
    const next = {};
    if (!EMAIL_REGEX.test(fields.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!fields.password.trim()) {
      next.password = "Password is required.";
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
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email Address</label>
        <input
          type="email"
          className={`form-control${errors.email ? " is-invalid" : fields.email ? " is-valid" : ""}`}
          id="email"
          name="email"
          placeholder="jane@example.com"
          value={fields.email}
          onChange={handleChange}
          required
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className={`form-control${errors.password ? " is-invalid" : fields.password ? " is-valid" : ""}`}
          id="password"
          name="password"
          placeholder="Your password"
          value={fields.password}
          onChange={handleChange}
          required
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>

      <button type="submit" className="btn-eco-primary">Login</button>
    </form>
  );
}

LoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};
