import React from 'react'
import { FaApple, FaGoogle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();

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
            <form className="flex flex-col gap-6">
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Entrez votre adresse email"
                  className="w-full border border-blue-400 h-10 rounded-md px-3 focus:outline-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="mb-1 font-medium">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Entrez le mot de passe"
                  className="w-full border border-blue-400 h-10 rounded-md px-3 focus:outline-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled
                className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full mt-4 self-end hover:bg-blue-700 hover:scale-105 duration-200"
              >
                Se connecter
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
