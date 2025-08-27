
import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const ContactForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    objet: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('access_token');
          if (!token) {
            setError('Vous devez être connecté pour soumettre une candidature');
            setTimeout(() => navigate('/login'), 2000);
            return;
          }
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
         // await axios.get('http://127.0.0.1:8000/api/current-user/');

      const response = await fetch('http://127.0.0.1:8000/api/send-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      setSuccess('Votre message a été envoyé avec succès !');
      setFormData({ email: '', objet: '', message: '' }); // Reset form
    } catch (err) {
      setError('Une erreur est survenue lors de l\'envoi du message.');
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-md shadow-2xl p-6 flex flex-col gap-6 w-full min-h-[420px]"
      >
        <fieldset className="mb-4">
          <legend className="font-semibold text-gray-800">Envoyer un email</legend>
        </fieldset>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium">
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Entrez votre adresse email"
            className="w-full border border-blue-400 h-10 rounded-md px-3 focus:outline-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="objet" className="mb-1 font-medium">
            Objet du message
          </label>
          <input
            type="text"
            id="objet"
            name="objet"
            value={formData.objet}
            onChange={handleChange}
            placeholder="Objet"
            className="w-full border border-blue-400 h-10 rounded-md px-3 focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="message" className="mb-1 font-medium">
            Message*
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Entrez votre message ici"
            className="w-full border border-blue-400 rounded-md px-3 h-40 lg:h-60 focus:outline-blue-500 p-3 text-gray-700 resize-none"
            required
          />
        </div>
        {success && (
          <div className="text-green-500 text-center">{success}</div>
        )}
        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-500 text-white font-semibold py-2 px-6 rounded-full self-end hover:bg-blue-700 hover:scale-105 duration-200 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;