import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiService from '../Services/apiService'; // Adjust the path to your apiService file

const UserPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testimonial, setTestimonial] = useState({ description: '', img: null });
  const [testimonialStatus, setTestimonialStatus] = useState(null);

  // Fetch current user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await apiService.getCurrentUser();
        setUser(userData);
        setLoading(false);
      } catch (err) {
        setError(err.detail || 'Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle testimonial form submission
  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    if (!testimonial.description.trim()) {
      setTestimonialStatus({ type: 'error', message: 'Le témoignage ne peut pas être vide.' });
      return;
    }

    const formData = new FormData();
    formData.append('description', testimonial.description);
    formData.append('nom', 'Témoignage de ' + (user?.username || 'Utilisateur'));
    if (testimonial.img) {
      formData.append('img', testimonial.img);
    }
    if (user) {
      formData.append('auteur', user.id); // Assuming user.id is available from apiService
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/temoignages/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization header handled by apiService interceptor
        },
      });
      setTestimonialStatus({ type: 'success', message: 'Témoignage soumis avec succès !' });
      setTestimonial({ description: '', img: null });
    } catch (err) {
      setTestimonialStatus({
        type: 'error',
        message: err.response?.data?.detail || 'Erreur lors de la soumission du témoignage.',
      });
    }
  };

  // Handle logout with confirmation
  const handleLogout = async () => {
    if (!window.confirm('Voulez-vous vraiment vous déconnecter ?')) return;

    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      await axios.post(
        'http://127.0.0.1:8000/api/auth/logout/',
        { refresh: refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Logout failed:', error.response?.data?.error || error.message);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-12 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-700 text-center">
          Bienvenue sur votre espace personnel
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-6" role="alert">
            {error}
          </p>
        )}

        <p className="text-gray-700 mb-8 text-center text-lg md:text-xl">
          Ici, vous pouvez soumettre une candidature pour un emploi ou un stage, consulter vos
          précédentes demandes, ou partager un témoignage.
        </p>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-4 mb-8 w-full shadow">
          <a
            href="/application-form"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow transition duration-200 text-center"
            aria-label="Soumettre une candidature"
          >
            Soumettre une candidature
          </a>
          <a
            href="/previous-applications"
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full shadow transition duration-200 text-center"
            aria-label="Consulter les candidatures"
          >
            Consulter les candidatures
          </a>
        </div>

        {/* Testimonial Form */}
        <div className="mt-8 w-full shadow-xl p-2 sm:p-4 md:p-6 lg:py-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Partager un Témoignage sur ATS
          </h2>
          {testimonialStatus && (
            <p
              className={`text-center mb-4 ${
                testimonialStatus.type === 'success' ? 'text-green-500' : 'text-red-500'
              }`}
              role="alert"
            >
              {testimonialStatus.message}
            </p>
          )}
          <form onSubmit={handleTestimonialSubmit} className="space-y-4">
            <div>
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Votre témoignage
              </label>
              <textarea
                id="description"
                value={testimonial.description}
                onChange={(e) => setTestimonial({ ...testimonial, description: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Partagez votre expérience..."
                required
                aria-describedby="description-error"
              />
            </div>
            <div>
              <label htmlFor="img" className="block text-gray-700 font-medium mb-2">
                Image (optionnel)
              </label>
              <input
                id="img"
                type="file"
                accept="image/*"
                onChange={(e) => setTestimonial({ ...testimonial, img: e.target.files[0] })}
                className="w-full p-3 border rounded-lg"
                aria-describedby="img-error"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow transition duration-200"
              aria-label="Soumettre le témoignage"
            >
              Soumettre
            </button>
          </form>
        </div>
        </div>

        {/* User Info and Logout */}
        <div className="mt-8 text-center text-sm text-gray-600">
          Connecté en tant que{' '}
          <strong>{user ? user.username : 'Utilisateur inconnu'}</strong> <br />
          <button
            onClick={handleLogout}
            className="text-red-500 text-lg underline hover:text-red-700 mt-4 transition duration-200"
            aria-label="Se déconnecter"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;