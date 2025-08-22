import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
// import apiService from "../Services/apiService.js"; // Adjust the path to your apiService file

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('stage');
  const [month, setMonth] = useState('');
  const [cv, setCV] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate CV
    if (!cv) {
      setError('Veuillez téléverser votre CV');
      return;
    }

    // Validate start_month for stage
    if (type === 'stage' && !month) {
      setError('Veuillez spécifier le mois de début pour le stage');
      return;
    }

    // Check for token
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Vous devez être connecté pour soumettre une candidature');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Prepare form data
    const formData = new FormData();
    formData.append('application_type', type);
    formData.append('start_month', type === 'stage' ? month : '');
    formData.append('cv', cv);
    const user = JSON.parse(localStorage.getItem('user'));
    let form_month = formData.get("start_month")
    let form_cv = formData.get("cv")
    console.log(form_month);
    
    try {
      await axios.post(`http://127.0.0.1:8000/api/candidatures/`, {start_month: form_month, cv: form_cv, user: user.id});
      setSuccess('Vos informations ont été reçues, nous vous contacterons si votre profil est requis');
      setType('stage');
      setMonth('');
      setCV(null);
      setTimeout(() => navigate('/user-page'), 4000);
    } catch (err) {
      if (err.response?.status === 403 || err.response?.status === 401) {
        setError('Session expirée ou non autorisée. Veuillez vous reconnecter.');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(err.detail || 'Échec de la soumission de la candidature');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Soumettre une candidature</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        {/* Type */}
        <label className="block mb-2 font-medium">Type de candidature :</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="stage">Stage</option>
          <option value="emploi">Emploi</option>
        </select>

        {/* Mois (stage uniquement) */}
        {type === 'stage' && (
          <>
            <label className="block mb-2 font-medium">Mois de début :</label>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
              className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}

        {/* CV */}
        <label className="block mb-2 font-medium">CV (PDF) :</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setCV(e.target.files[0])}
          required
          className="w-full p-2 mb-4 outline outline-blue-600 rounded-md h-10 hover:cursor-pointer"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 hover:cursor-pointer transition"
        >
          Soumettre la candidature
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;