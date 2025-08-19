import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    const accessToken = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    // Try logging out (blacklist refresh token)
    await axios.post(
      'http://127.0.0.1:8000/api/auth/logout/',
      { refresh: refreshToken },
      accessToken
        ? { headers: { Authorization: `Bearer ${accessToken}` } }
        : {}
    );
  } catch (error) {
    console.error("Logout API failed:", error.response?.data || error.message);
  } finally {
    // Always clear local storage, even if request fails
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-blue-700 text-center">Bienvenue sur votre espace personnel</h1>

        <p className="text-gray-700 mb-6 text-center text-xl">
          Ici, vous pouvez soumettre une candidature pour un emploi ou un stage ou consulter vos précédentes demandes.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href='/application-form'
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow transition duration-200"
          >
            Soumettre une candidature
          </a>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          Connecté en tant que <strong>Nom d'utilisateur</strong> <br />
          <button 
            onClick={handleLogout}
            className="text-red-500 text-xl underline hover:text-blue-700 my-6 text-shadow-2xs"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;