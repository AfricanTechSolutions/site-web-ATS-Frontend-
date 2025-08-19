import React, { useState } from 'react'
import { FaApple, FaGoogle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const InputList = [
  { id: '1', name: 'nom', holder: "Entrez votre nom d'utilisateur" },
  { id: '2', name: 'email', holder: 'Entrez votre adresse email' },
  { id: '3', name: 'password1', holder: 'Entrez votre mot de passe' },
  { id: '4', name: 'password2', holder: 'Confirmez votre mot de passe' },
]

// Add CSRF helper function
const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password1: '',
    password2: '',
  })

  const handleChange = (e) => {
    setError(null) // Clear previous errors
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validation
    if (formData.password1 !== formData.password2) {
      setError('Les mots de passe ne correspondent pas')
      setLoading(false)
      return
    }

    try {
      // Register the user
      const response = await axios.post('http://127.0.0.1:8000/api/auth/register/', {
        username: formData.nom,
        email: formData.email,
        password: formData.password1
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      })

      if (response.status === 201) {
        try {
          // Attempt login directly without CSRF token first
          const loginResponse = await axios.post('http://127.0.0.1:8000/api/token/', {
            email: formData.email,
            password: formData.password1
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })

          // Store tokens
          localStorage.setItem('access_token', loginResponse.data.access)
          localStorage.setItem('refresh_token', loginResponse.data.refresh)
          
          // Set default Authorization header for future requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${loginResponse.data.access}`

          // Show success message and redirect
          alert('Compte créé avec succès!')
          navigate('/user-page')
        } catch (loginError) {
          console.error('Login Error:', loginError.response || loginError)
          setError('Compte créé mais erreur de connexion automatique. Veuillez vous connecter manuellement.')
          navigate('/login')
        }
      }
    } catch (error) {
      console.error('Registration Error:', error.response || error)
      setError(
        error.response?.data?.detail ||
        error.response?.data?.email?.[0] ||
        error.response?.data?.username?.[0] ||
        'Une erreur est survenue lors de la création du compte'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 p-4">
      <div className="relative z-0 w-full max-w-6xl bg-white shadow-xl rounded-lg p-6 sm:p-10 flex flex-col justify-center items-center">
        
        {/* Background design */}
        <div className="bg-blue-400 w-32 h-32 absolute z-0 rounded-3xl top-[-40px] left-[-40px]"></div>

        {/* Header */}
        <div className="text-center relative z-10 mb-10">
          <h1 className="text-3xl font-bold">Créer un Compte</h1>
          <p className="text-gray-500">Restez à jour et bénéficiez des réductions en vous enregistrant</p>
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center relative z-10">
          
          {/* Register with email */}
          <div className="w-full max-w-md bg-white rounded-md shadow-xl p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {InputList.map((data) => (
        <div key={data.id} className="flex flex-col">
          <label htmlFor={data.name} className="mb-1 font-medium">
            {data.name === 'nom' ? "Nom d'utilisateur" :
             data.name === 'email' ? 'Email' :
             data.name === 'password1' ? 'Mot de passe' : 'Confirmer le mot de passe'}
          </label>
          <input
            type={data.id === '3' || data.id === '4' ? 'password' : data.id === '1' ? 'text' : 'email'}
            id={data.name}
            name={data.name}
            placeholder={data.holder}
            value={formData[data.name]}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full border border-blue-400 h-10 rounded-md px-3 focus:outline-blue-500 disabled:opacity-50"
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={loading || !formData.nom || !formData.email || !formData.password1 || !formData.password2}
        className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full mt-4 self-end hover:bg-blue-700 hover:scale-105 duration-200 disabled:opacity-50 disabled:hover:scale-100"
      >
        {loading ? 'Création...' : "S'enregistrer"}
      </button>
    </form>

          </div>

          {/* Register with Google / Apple */}
          <div className="w-full max-w-md bg-white rounded-md shadow-2xl p-6 flex flex-col items-center gap-6">
            <div className="text-center">
              <h2 className="text-xl mb-2">Ou</h2>
              <p className="text-gray-500">S'enregistrer avec</p>
            </div>
            <div className="flex gap-4 flex-wrap justify-center">
              <button className="bg-blue-600 text-white flex items-center gap-2 px-6 py-2 rounded-md hover:bg-blue-700 transition">
                <FaGoogle className="text-2xl" />
                <span className="text-sm font-light">Google</span>
              </button>
              <button className="bg-blue-600 text-white flex items-center gap-2 px-6 py-2 rounded-md hover:bg-blue-700 transition">
                <FaApple className="text-2xl" />
                <span className="text-sm font-light">Apple</span>
              </button>
            </div>
            <div className="text-center mt-4">
              <p className="mb-4">Vous avez déjà un compte ?</p>
              <button
                onClick={() => navigate('/login')}
                className="border border-blue-500 text-blue-500 py-2 px-6 rounded-full hover:bg-blue-500 hover:text-white hover:scale-105 transition"
              >
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
