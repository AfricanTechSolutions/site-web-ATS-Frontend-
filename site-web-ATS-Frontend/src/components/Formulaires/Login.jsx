import React, { useState } from 'react'
import { FaApple, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setError(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;

      const userResponse = await axios.get('http://127.0.0.1:8000/api/current-user/');
      localStorage.setItem('user', JSON.stringify(userResponse.data));

      if (userResponse.data.role === 'admin') {
        console.log("Success, Admin"); 
        navigate('/admin');
      } else {
        navigate('/user-page');
      }
    } catch (error) {
      console.error('Login error:', error.response || error);
      setError(
        error.response?.data?.detail || 
        'Une erreur est survenue lors de la connexion'
      );
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Bienvenue
          </h1>
          <p className="text-gray-600 text-lg">Connectez-vous pour continuer</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Email Login Form */}
            <div className="w-full lg:w-1/2 p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Connexion</h2>
                <p className="text-gray-500">Accédez à votre compte</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r-lg">
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="vous@exemple.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !formData.email || !formData.password}
                  className="text-md w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Connexion...
                    </span>
                  ) : (
                    'Se connecter'
                  )}
                </button>
              </form>
            </div>

            {/* Divider */}
            <div className="hidden lg:flex items-center justify-center w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent">
              <div className="bg-white px-4 py-2 rounded-full text-gray-400 text-sm font-medium">OU</div>
            </div>

            <div className="lg:hidden flex items-center justify-center py-6">
              <div className="flex items-center w-full max-w-xs">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-gray-200"></div>
                <div className="px-4 text-gray-400 text-sm font-medium">OU</div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-200 to-gray-200"></div>
              </div>
            </div>

            {/* Social Login */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Connexion rapide</h2>
                <p className="text-gray-500">Utilisez votre compte existant</p>
              </div>

              <div className="space-y-4 mb-8">
                <button className="w-full bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-700 font-medium flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl hover:shadow-lg transition-all duration-200 group">
                  <FaGoogle className="text-md text-red-500 group-hover:scale-110 transition-transform" />
                  <span>Continuer avec Google</span>
                </button>
                
                <button className="w-full bg-black hover:bg-gray-900 text-white font-medium flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl hover:shadow-lg transition-all duration-200 group">
                  <FaApple className="text-md group-hover:scale-110 transition-transform" />
                  <span>Continuer avec Apple</span>
                </button>
              </div>

              <div className="text-center pt-6 border-t border-gray-200">
                <p className="text-gray-600 mb-4">Nouveau sur notre plateforme ?</p>
                <button
                  onClick={() => navigate('/register')}
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 hover:shadow-lg"
                >
                  Créer un compte
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Besoin d'aide ? <a href="#" className="text-blue-600 hover:underline font-medium">Contactez le support</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login