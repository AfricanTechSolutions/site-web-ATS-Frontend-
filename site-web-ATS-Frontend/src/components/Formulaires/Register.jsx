import React, { useState } from 'react'
import { FaApple, FaGoogle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const InputList = [
  { id: '1', name: 'nom', holder: "Entrez votre nom d'utilisateur" },
  { id: '2', name: 'email', holder: 'Entrez votre adresse email' },
  { id: '3', name: 'password1', holder: 'Entrez votre mot de passe' },
  { id: '4', name: 'password2', holder: 'Confirmez votre mot de passe' },
]

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password1: '',
    password2: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

    const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password1 !== formData.password2) {
      alert('Les mots de passe ne correspondent pas')
      return
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.nom,
          email: formData.email,
          password: formData.password1
        }),
      })

      if (response.ok) {
        alert('Compte créé avec succès !')
        navigate('/login') // redirection vers login
      } else {
        const data = await response.json()
        alert('Erreur: ' + JSON.stringify(data))
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Impossible de créer le compte')
    }
  }


  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 p-4">
      <div className="relative z-0 w-full max-w-6xl bg-white shadow-xl rounded-lg p-6 sm:p-10">
        
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
  {InputList.map((data) => (
    <div key={data.id} className="flex flex-col">
      <label htmlFor={data.name} className="mb-1 font-medium">
        {data.name}
      </label>
      <input
        type={data.id === '3' || data.id === '4' ? 'password' : data.id === '1' ? 'text' : 'email'}
        id={data.name}
        name={data.name}
        placeholder={data.holder}
        value={formData[data.name]}
        onChange={handleChange}
        className="w-full border border-blue-400 h-10 rounded-md px-3 focus:outline-blue-500"
      />
    </div>
  ))}
  <button
    type="submit"
    className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full mt-4 self-end hover:bg-blue-700 hover:scale-105 duration-200"
  >
    S'enregistrer
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
