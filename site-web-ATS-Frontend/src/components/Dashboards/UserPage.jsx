import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import apiService from '../Services/apiService'

const UserPage = () => {
  const navigate = useNavigate();
  // translations removed — using static strings for now
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testimonial, setTestimonial] = useState({ description: '', img: null });
  const [testimonialStatus, setTestimonialStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Fetch current user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await axios.get('http://127.0.0.1:8000/api/current-user/', { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError('Impossible de charger les données de l\'utilisateur.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Auto-hide status messages
  useEffect(() => {
    if (!testimonialStatus) return;
    const id = setTimeout(() => setTestimonialStatus(null), 4000);
    return () => clearTimeout(id);
  }, [testimonialStatus]);

  // Handle testimonial form submission
  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    
    if (!testimonial.description.trim()) {
      setTestimonialStatus({ 
        type: 'error', 
        message: 'Le témoignage ne peut pas être vide.' 
      });
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('description', testimonial.description);
    formData.append('nom', 'Témoignage de ' + (user?.username || 'Utilisateur'));
    
    if (testimonial.img) {
      formData.append('img', testimonial.img);
    }
    if (user) {
      formData.append('auteur', user.id);
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/temoignages/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setTestimonialStatus({ 
        type: 'success', 
        message: 'Témoignage soumis avec succès !' 
      });
      setTestimonial({ description: '', img: null });
    } catch (err) {
      setTestimonialStatus({
        type: 'error',
        message: err.response?.data?.detail || 'Erreur lors de la soumission du témoignage.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open confirm modal
  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  // Confirm logout: optional backend call then clear client auth
  const confirmLogout = async () => {
    setShowLogoutModal(false);
    try {
      setLoading(true);
      // Optional: call backend logout if you have one to blacklist refresh tokens
      // await axios.post('http://127.0.0.1:8000/api/auth/logout/', { refresh: localStorage.getItem('refresh_token') }, { withCredentials: true });

      // Clear tokens and default header
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];

      // Navigate to login
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout error', err);
      // still clear locally to avoid stuck session
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      delete axios.defaults.headers.common['Authorization'];
      navigate('/login', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const cancelLogout = () => setShowLogoutModal(false);

  // Loading state
  if (loading) {
    return (
      <div className="p-6">
        Chargement...
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-15 h-15 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Votre Espace Personnel
        </h1>
        
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Gérez vos candidatures, consultez votre historique et partagez votre expérience avec notre communauté
        </p>
        
        {user && (
          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-700 font-medium">Connecté en tant que {user.username}</span>
          </div>
        )}
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-8 mx-auto max-w-2xl">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Actions Rapides</h2>
          </div>
          
          <div className="space-y-4">
            <a
              href="/application-form"
              className="group flex items-center gap-4 p-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              aria-label="Soumettre une candidature"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Nouvelle Candidature</h3>
                <p className="text-blue-100 text-sm">Postuler pour un emploi ou stage</p>
              </div>
              <svg className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            
            <a
              href="/previous-applications"
              className="group flex items-center gap-4 p-6 bg-white hover:bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-md"
              aria-label="Consulter les candidatures"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-800">Mes Candidatures</h3>
                <p className="text-slate-600 text-sm">Consulter l'historique et le statut</p>
              </div>
              <svg className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Testimonial Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Partager un Témoignage</h2>
          </div>

          {/* Status Messages */}
          {testimonialStatus && (
            <div className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${
              testimonialStatus.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              <svg className={`w-5 h-5 flex-shrink-0 ${
                testimonialStatus.type === 'success' ? 'text-emerald-500' : 'text-red-500'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {testimonialStatus.type === 'success' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
              <p className="font-medium">{testimonialStatus.message}</p>
            </div>
          )}

          <form onSubmit={handleTestimonialSubmit} className="space-y-6">
            <div>
              <label htmlFor="description" className="block text-slate-700 font-semibold mb-3">
                Votre témoignage
              </label>
              <textarea
                id="description"
                value={testimonial.description}
                onChange={(e) => setTestimonial({ ...testimonial, description: e.target.value })}
                className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-white/70"
                rows="4"
                placeholder="Partagez votre expérience avec ATS..."
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="img" className="block text-slate-700 font-semibold mb-3">
                Image (optionnel)
              </label>
              <div className="relative">
                <input
                  id="img"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setTestimonial({ ...testimonial, img: e.target.files[0] })}
                  className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:font-medium bg-white/70"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || !testimonial.description.trim()}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-slate-400 disabled:to-slate-500 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Publier le témoignage
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Se déconnecter
        </button>
      </div>

      {/* Logout confirmation modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            <h3 className="text-lg font-semibold">Confirmer la déconnexion</h3>
            <p className="mt-2 text-sm text-gray-600">Voulez-vous vraiment vous déconnecter ?</p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 rounded border"
              >
                Annuler
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;