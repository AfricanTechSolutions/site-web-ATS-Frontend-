import React, { useState } from 'react'
import { FaApple, FaGoogle, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const InputList = [
  { id: '1', name: 'nom', holder: "Entrez votre nom d'utilisateur", icon: <FaUser className='text-blue-500' /> },
  { id: '2', name: 'email', holder: 'Entrez votre adresse email', icon: <FaEnvelope className='text-red-600'/> },
  { id: '3', name: 'password1', holder: 'Entrez votre mot de passe', icon: <FaLock /> },
  { id: '4', name: 'password2', holder: 'Confirmez votre mot de passe', icon: <FaLock /> },
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
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

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
          const loginResponse = await axios.post('http://127.0.0.1:8000/api/auth/login', {
            email: formData.email,
            password: formData.password1
          })

          // Store tokens
          localStorage.setItem('access_token', loginResponse.data.access)
          localStorage.setItem('refresh_token', loginResponse.data.refresh)
          
          // Set default Authorization header for future requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${loginResponse.data.access}`

          // Show success message and redirect
          // Get user info
      const userResponse = await axios.get('http://127.0.0.1:8000/api/current-user/');
      localStorage.setItem('user', JSON.stringify(userResponse.data));

      // Redirect based on user role
      if (userResponse.data.role === 'admin') {
        console.log("Success, Admin"); 
        navigate('/admin');
      } else {
        navigate('/user-page');
      }

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
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-gradient-to-l from-indigo-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 left-1/3 w-72 h-72 bg-gradient-to-t from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 overflow-hidden">
        
        {/* Modern Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-xl"></div>
        
        <div className="relative z-20 p-4 sm:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-[2.6rem] font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-indigo-900 bg-clip-text text-transparent mb-4">
              Créer un Compte
            </h1>
            <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
              Restez à jour et bénéficiez des réductions en vous enregistrant
            </p>
          </div>

          {/* Main Content */}
          <div className="flex flex-col xl:flex-row gap-8 justify-center items-stretch max-w-6xl mx-auto">
            
            {/* Email Registration Form */}
            <div className="flex-1 max-w-lg">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8 h-full">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">S'inscrire par email</h2>
                  <p className="text-gray-600">Créez votre compte rapidement</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg shadow-sm animate-pulse">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3 text-sm font-medium">{error}</div>
                      </div>
                    </div>
                  )}

                  {InputList.map((data) => (
                    <div key={data.id} className="space-y-2">
                      <label htmlFor={data.name} className="block text-sm font-semibold text-gray-700">
                        {data.name === 'nom' ? "Nom d'utilisateur" :
                         data.name === 'email' ? 'Adresse Email' :
                         data.name === 'password1' ? 'Mot de passe' : 'Confirmer le mot de passe'}
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <div className="text-gray-700 group-focus-within:text-blue-500 transition-colors duration-300">
                            {data.icon}
                          </div>
                        </div>
                        <input
                          type={
                            (data.id === '3' && !showPassword1) || (data.id === '4' && !showPassword2) 
                              ? 'password' 
                              : data.id === '1' 
                                ? 'text' 
                                : data.id === '2' 
                                  ? 'email' 
                                  : 'text'
                          }
                          id={data.name}
                          name={data.name}
                          placeholder={data.holder}
                          value={formData[data.name]}
                          onChange={handleChange}
                          disabled={loading}
                          required
                          className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-gray-50"
                        />
                        
                        {/* Password visibility toggle */}
                        {(data.id === '3' || data.id === '4') && (
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                            onClick={() => data.id === '3' ? setShowPassword1(!showPassword1) : setShowPassword2(!showPassword2)}
                          >
                            {(data.id === '3' && showPassword1) || (data.id === '4' && showPassword2) ? <FaEyeSlash /> : <FaEye className='text-blue-500' />}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={loading || !formData.nom || !formData.email || !formData.password1 || !formData.password2}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Création du compte...
                      </>
                    ) : (
                      "Créer mon compte"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Social Registration */}
            <div className="flex-1 max-w-lg">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8 h-full flex flex-col justify-center">
                
                {/* Divider */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-6 bg-white text-gray-500 font-medium text-lg">Ou continuer avec</span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-4 mb-8">
                  <button className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3 group">
                    <FaGoogle className="text-2xl text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-lg">Continuer avec Google</span>
                  </button>
                  
                  <button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3 group">
                    <FaApple className="text-2xl group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-lg">Continuer avec Apple</span>
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-gray-600 mb-4 text-lg">Vous avez déjà un compte ?</p>
                  <button
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center px-8 py-3 border-2 border-blue-500 text-blue-600 hover:text-white font-semibold rounded-2xl hover:bg-blue-500 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    Se connecter maintenant
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register