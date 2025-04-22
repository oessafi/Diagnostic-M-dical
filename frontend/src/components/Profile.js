import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Appel API pour récupérer les informations de l'utilisateur
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch("http://localhost:6060/public/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setUserInfo(data);
          } else {
            console.error("Erreur lors de la récupération des informations utilisateur:", data);
            navigate('/login'); // Si l'utilisateur n'est pas authentifié, rediriger vers login
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des informations utilisateur:", error);
          navigate('/login'); // Si l'appel échoue, rediriger vers login
        }
      } else {
        navigate('/login'); // Si pas de token, rediriger vers login
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, [navigate]);

  return (
    <div className="container" style={{ marginTop: "90px" }}>
      <h2>Mon Profil</h2>
      {loading ? (
        <p>Chargement des informations...</p>
      ) : (
        userInfo ? (
          <div className="mt-4">
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Nom:</strong> {userInfo.firstName ? userInfo.firstName : 'Nom non disponible'}</p>
            <p><strong>Prénom:</strong> {userInfo.lastName ? userInfo.lastName : 'Prénom non disponible'}</p>
            <p><strong>Role:</strong> {userInfo.roles ? userInfo.roles[0].authority : 'Role inconnu'}</p>
          </div>
        ) : (
          <p>Erreur lors de la récupération des informations utilisateur.</p>
        )
      )}
    </div>
  );
};

export default Profile;
