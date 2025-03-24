import React, { useState } from 'react';
<<<<<<< HEAD
import axios from 'axios';  // Assurez-vous d'importer axios
import { useNavigate } from 'react-router-dom';  // Importer useNavigate pour la redirection
=======
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import './login.css'; // Import custom styles
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
>>>>>>> 77b9aa1 (Initial commit)

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
  const [role, setRole] = useState('PATIENT'); // Rôle patient uniquement
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Initialiser le hook useNavigate

  // Fonction pour soumettre le formulaire d'inscription
=======
  const [role, setRole] = useState('PATIENT'); // Default role: PATIENT
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

>>>>>>> 77b9aa1 (Initial commit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
<<<<<<< HEAD
      // Envoie la requête d'inscription à l'API
=======
>>>>>>> 77b9aa1 (Initial commit)
      const response = await axios.post('http://localhost:6060/auth/signup', {
        email,
        password,
        role,
      });

<<<<<<< HEAD
      // Si l'inscription est réussie
      if (response.status === 200) {
        alert('Compte créé avec succès!');
        // Redirection vers la page de login après une inscription réussie
        navigate('/login');
      }
    } catch (error) {
      setError('Échec de l\'inscription, veuillez réessayer.');
=======
      if (response.status === 200) {
        alert('Account successfully created!');
        navigate('/login'); // Redirect to Login page after signup
      }
    } catch (error) {
      setError('Signup failed, please try again.');
>>>>>>> 77b9aa1 (Initial commit)
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div>
      <h2>Créer un compte</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-control"
          >
            <option value="PATIENT">Patient</option>
            {/* Ajoutez d'autres options si nécessaire */}
          </select>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Création en cours...' : 'Créer un compte'}
        </button>
      </form>
    </div>
=======
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
>>>>>>> 77b9aa1 (Initial commit)
  );
};

export default Signup;
