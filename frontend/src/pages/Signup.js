import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    // common fields
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'CUSTOMER', // toggle between CUSTOMER or ADMIN

    // customer-specific
    homeNo: '',
    street: '',
    city: '',
    postalCode: '',

    // admin-specific
    phone: '',
    adminRole: '', // e.g., SUPER_ADMIN, MANAGER
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // common validation
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    // role-specific validation
    if (formData.role === 'CUSTOMER') {
      if (!formData.city.trim()) newErrors.city = 'City is required';
      // optional: require homeNo or street
    } else if (formData.role === 'ADMIN') {
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required for admin';
      if (!formData.adminRole.trim()) newErrors.adminRole = 'Admin role is required (e.g., MANAGER)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      // choose endpoint by role
      const endpoint =
        formData.role === 'ADMIN'
          ? 'http://localhost:8081/api/auth/register/admin'
          : 'http://localhost:8081/api/auth/register/customer';

      // build payload depending on role
      const basePayload = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      let payload;
      if (formData.role === 'ADMIN') {
        // Admin payload: includes phone and role (adminRole)
        payload = {
          ...basePayload,
          phone: formData.phone,
          role: formData.adminRole || 'ADMIN' // backend Admin entity has `role` field
        };
      } else {
        // Customer payload: includes address details
        payload = {
          ...basePayload,
          homeNo: formData.homeNo,
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode
        };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // optionally store user in localStorage (avoid storing password)
        localStorage.setItem('user', JSON.stringify(data));

        // redirect to appropriate dashboard after short delay
        setTimeout(() => {
          if (formData.role === 'ADMIN') {
            window.location.href = '/admin-dashboard';
          } else {
            window.location.href = '/customer-dashboard';
          }
        }, 1200);
      } else {
        // backend may return { message: "..." }
        setErrors({ submit: data.message || 'Signup failed. Please try again.' });
      }
    } catch (err) {
      setErrors({ submit: 'Network error. Please check your connection.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="signup-page">
        <div className="signup-container">
          <div className="signup-header">
            <h2 className="signup-title">JOIN MD RESTAURANT SERVICES</h2>
          </div>

          {success && (
            <div className="alert alert-success">
              <p className="alert-title">Success! Account created successfully.</p>
              <p className="alert-message">Redirecting to your dashboard...</p>
            </div>
          )}

          {errors.submit && <div className="alert alert-error">{errors.submit}</div>}

          <div className="signup-card">
            <form onSubmit={handleSubmit} className="signup-form">
              {/* Role Selection */}
              <div className="form-section">
                <label className="role-label">I am a</label>
                <div className="role-grid">
                  {['CUSTOMER', 'ADMIN'].map(r => (
                    <label key={r} className={`role-option ${formData.role === r ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="role"
                        value={r}
                        checked={formData.role === r}
                        onChange={handleChange}
                      />
                      <span className="role-text">{r.charAt(0) + r.slice(1).toLowerCase()}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Common fields */}
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="error-message">{errors.email}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="error-message">{errors.password}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* ADMIN-specific fields */}
              {formData.role === 'ADMIN' && (
                <div className="form-section">
                  <h3 className="form-section-title">Admin Details</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`form-input ${errors.phone ? 'error' : ''}`}
                        placeholder="+94 77 123 4567"
                      />
                      {errors.phone && <p className="error-message">{errors.phone}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Admin Role *</label>
                      <input
                        type="text"
                        name="adminRole"
                        value={formData.adminRole}
                        onChange={handleChange}
                        className={`form-input ${errors.adminRole ? 'error' : ''}`}
                        placeholder="e.g., MANAGER or SUPER_ADMIN"
                      />
                      {errors.adminRole && <p className="error-message">{errors.adminRole}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* CUSTOMER-specific fields */}
              {formData.role === 'CUSTOMER' && (
                <div className="form-section">
                  <h3 className="form-section-title">Address Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">House/Apartment No</label>
                      <input
                        type="text"
                        name="homeNo"
                        value={formData.homeNo}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="123"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Street</label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Main Street"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`form-input ${errors.city ? 'error' : ''}`}
                        placeholder="Colombo"
                      />
                      {errors.city && <p className="error-message">{errors.city}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="10400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button type="submit" disabled={loading} className="submit-button">
                  {loading ? (
                    <span className="button-content">
                      <div className="spinner"></div>
                      Creating Account...
                    </span>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>

              <div className="form-footer">
                Already have an account? <a href="/login">Sign in</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

