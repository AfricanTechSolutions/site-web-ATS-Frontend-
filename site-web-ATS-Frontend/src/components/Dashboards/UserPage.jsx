import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiService from '../Services/apiService'; // Adjust the path to your apiService file

const UserPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Fetch current user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await apiService.getCurrentUser();
        setUser(userData);
      } catch (err) {
        setError(err.detail || 'Failed to fetch user data');
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // Send logout request with refresh token
      await axios.post(
        'http://127.0.0.1:8000/api/auth/logout/',
        { refresh: refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization header is added by apiService's interceptor
          },
        }
      );
    } catch (error) {
      console.error('Logout failed:', error.response?.data?.error || error.message);
    } finally {
      // Clear local storage and redirect regardless of API success
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-blue-700 text-center">
          Bienvenue sur votre espace personnel
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <p className="text-gray-700 mb-6 text-center text-xl">
          Ici, vous pouvez soumettre une candidature pour un emploi ou un stage ou consulter vos
          précédentes demandes.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/application-form"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow transition duration-200"
          >
            Soumettre une candidature
          </a>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          Connecté en tant que{' '}
          <strong>{user ? user.username : 'Chargement...'}</strong> <br />
          <button
            onClick={handleLogout}
            className="text-red-500 text-xl underline hover:text-red-700 my-6 text-shadow-2xs"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;