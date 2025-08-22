import React, {useState} from 'react'
import { FaApple, FaGoogle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setError(null); // Clear any previous errors
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
      // Updated endpoint to match Django URLs
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
        email: formData.email,
        password: formData.password
      });

      // Store tokens
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      // Set default Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;

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
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="relative z-0 w-full max-w-6xl bg-white shadow-xl rounded-lg p-6 sm:p-10">
        
        {/* Background design */}
        <div className="bg-blue-400 w-32 h-32 absolute z-0 rounded-3xl top-[-40px] left-[-40px]"></div>

        {/* Header */}
        <div className="text-center relative z-10 mb-10">
          <h1 className="text-3xl font-bold">Se Connecter</h1>
          <p className="text-gray-500">Entrez vos informations pour vous connecter à votre compte</p>
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 relative z-10">
          
          {/* Email login form */}
          <div className="w-full max-w-md bg-white rounded-md shadow-2xl p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-2 md:p-4">
              {error && (
                <div className="bg-white border border-red-400 text-red-700 px-4 py-3 rounded">
                  Une erreur est survenue lors de la connexion Veilluez reessayer!
                </div>
              )}
              
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Entrez votre adresse email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-blue-400 h-10 rounded-md px-3 focus:outline-blue-500"
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="mb-1 font-medium">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Entrez le mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-blue-400 h-10 rounded-md px-3 focus:outline-blue-500"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !formData.email || !formData.password}
                className="bg-blue-500 disabled:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full mt-4 self-end hover:bg-blue-700 hover:scale-105 duration-200 disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>

          </div>

          {/* Login with Google / Apple */}
          <div className="w-full max-w-md bg-white rounded-md shadow-2xl p-6 flex flex-col items-center gap-6">
            <div className="text-center">
              <h2 className="text-xl mb-2">Ou</h2>
              <p className="text-gray-500">Se connecter avec</p>
            </div>
            <div className="flex gap-4 flex-wrap justify-center">
              <button className="bg-blue-600 text-white flex items-center gap-2 px-6 py-2 rounded-md hover:bg-blue-700 transition">
                <FaGoogle className="text-2xl" />
                <span className="text-sm font-light">Google</span>
              </button>
              <button className="bg-blue-600 text-white flex items-center gap-2 px-6 py-2 rounded-md hover:bg-blue-700 hover:outline">
                <FaApple className="text-2xl" />
                <span className="text-sm font-light">Apple</span>
              </button>
            </div>
            <div className="text-center mt-4">
              <p className="mb-4">Vous n'avez pas encore de compte ?</p>
              <button
                onClick={() => navigate('/register')}
                className="border border-blue-500 text-blue-500 py-2 px-6 rounded-full hover:bg-blue-500 hover:text-white hover:scale-105 transition"
              >
                Créer un compte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
