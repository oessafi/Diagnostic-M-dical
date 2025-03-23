import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // 'Link' est retiré ici
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'; // Import du fichier CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:6060/auth/signin', {
        email,
        password,
      });

      // Stockage du token et du refresh token dans le localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('userEmail', email);

      // Redirection en fonction du rôle de l'utilisateur
      const ROLE = response.data.role;
      if (ROLE === 'ADMIN') {
        navigate('/admin-dashboard');
      } else if (ROLE === 'MEDECIN') {
        navigate('/medecin-dashboard');
      } else if (ROLE === 'PATIENT') {
        navigate('/patient-dashboard');
      } else {
        setError('Role not recognized.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setError('Login failed. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="login-form bg-light p-4 rounded shadow">
        <h2 className="mb-4 text-center">Login</h2>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            disabled={loading}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button 
          className="btn btn-primary w-100" 
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;
