import React, { useState } from 'react';
import axios from 'axios';  // Assurez-vous d'importer axios
import { useNavigate } from 'react-router-dom';  // Importer useNavigate pour la redirection

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('PATIENT'); // Rôle patient uniquement
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Initialiser le hook useNavigate

  // Fonction pour soumettre le formulaire d'inscription
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Envoie la requête d'inscription à l'API
      const response = await axios.post('http://localhost:6060/auth/signup', {
        email,
        password,
        role,
      });

      // Si l'inscription est réussie
      if (response.status === 200) {
        alert('Compte créé avec succès!');
        // Redirection vers la page de login après une inscription réussie
        navigate('/login');
      }
    } catch (error) {
      setError('Échec de l\'inscription, veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
};

export default Signup;
