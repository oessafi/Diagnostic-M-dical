import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import './login.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ADMIN'); // Default role: PATIENT
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:6060/auth/signup', {
        email,
        password,
        role,
        firstName, // Prénom
        lastName,  // Nom de famille
      });

      if (response.status === 200) {
        alert('Account successfully created!');
        navigate('/login'); // Redirect to Login page after signup
      }
    } catch (error) {
      setError('Signup failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        <Helmet>
          <title>Sign Up - MediAi Care</title>
        </Helmet>
        <Navbar />
        <div className="signup-container d-flex justify-content-center align-items-center vh-100">
          <div className="signup-form bg-light p-4 rounded shadow text-center">
            <h4 className="mb-4">Join Us</h4>
            <div className="logo-container">
              <img src="/assets/img/logo.png" alt="Logo" className="signup-logo" />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    disabled={loading}
                />
              </div>
              <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nom de famille"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    disabled={loading}
                />
              </div>
              <div className="mb-3">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                />
              </div>
              <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />
              </div>
              <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
              >
                {loading ? 'Signing up...' : 'Create Account'}
              </button>
            </form>
            <p className="mt-3">
              Already have an account? <Link to="/login" className="text-decoration-none">Log In</Link>
            </p>
          </div>
        </div>
        <Footer />
      </>
  );
};

export default Signup;
