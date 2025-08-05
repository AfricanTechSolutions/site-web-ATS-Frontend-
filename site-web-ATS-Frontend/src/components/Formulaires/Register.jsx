import React from 'react'
import { FaApple, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const InputList = [
  {id: '1', name: "Nom *", holder: "Entrez votre nom"},
  {id: '2', name: "Email *", holder: "Entrez votre addresse email"},
  {id: '3', name: "Mot de passe *", holder: "Entrez votre mot de passe"},
  {id: '4', name: "Confirmez le mot de passe *", holder: "Entrez votre mot de passe"},
];

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className='h-full w-full flex justify-center'>
      <div className='md:m-10 p-5 shadow-xl sm:m-10 m-6 bg-white lg:m-[50px] relative z-0 
                     outline outline-blue-400
                      w-max '>
        {/* Background design */}
       <div className='bg-blue-400 w-50 h-50 absolute z-1 rounded-3xl top-1/14 md:top-1/20'>
        </div>

        {/* Header section */}
        <div className='text-center flex flex-col relative gap-1 z-10'>
        <h1 className='text-3xl font-bold'>
          Creer un Compte</h1>
          <p className='font-light text-gray-500'>Restez ajour et beneficiez des reduction en vous enregistrant</p>
        </div>
        {/* Body section */}
         <div className='flex sm:gap-10 gap-4 flex-wrap sm:flex-row flex-col relative z-10 justify-center'>
          {/* Signin with email */}
          <div className='shadow-xl m-8 md:w-[400px] w-[300px] bg-white rounded-md sm:mr-4 py-2'>
            <form  method='POST' className='flex flex-col items-center gap-5 '>
            {
              InputList.map((data) => (
                
                  <div key={data.id} className='flex flex-col'>
                  <label htmlFor={data.name}
                  >
                    {data.name}
                  </label>
                  {data.id == 3 || data.id == 4 ? <input type="password" id={data.name} placeholder={data.holder} className='md:w-[300px] sm:w-max border border-blue-400 h-10 rounded-md p-2 focus:outline-blue-500' /> : data.id==1 ? <input className='md:w-[300px] sm:w-max border border-blue-400 h-10 rounded-md p-2 focus:outline-blue-500' type="text" id={data.name} placeholder={data.holder}/> : <input className='md:w-[300px] sm:w-max border border-blue-400 h-10 rounded-md p-2 focus:outline-blue-500' type="email" id={data.name} placeholder={data.holder}/> }
                </div>
                
              ))
            }
            <button type='submit' disabled
              className='bg-blue-500 text-white font-semibold py-2 px-6 self-end rounded-full mr-7 hover:bg-blue-700 hover:scale-105 duration-200 hover:cursor-pointer'
              >S'enregistrer</button>
            </form>
          </div>
          {/* Signin with Google/Apple */}
          <div className='shadow-xl md:m-8 m-4 md:w-[400px] w-[300px]  bg-white rounded-md sm:mr-4 flex flex-col items-center p-4 gap-8'>
            <div className='text-center'>
            <h1 className='text-2xl mb-4'>ou </h1>
            <h1 className='font-light'>S'enregistrer avec</h1>
            </div>
            <div className='flex gap-4'>
              <button className='bg-blue-600 text-white flex gap-4 px-6 py-2 rounded-md w-max md:w-[150px] hover:bg-blue-700 hover:cursor-pointer duration-200'>
                  <FaGoogle className='text-2xl'
                  />
                   <p className='font-extralight text-[14px] '
                  >Google</p>
              </button>
              <button className='bg-blue-600 text-white flex gap-4 px-6 py-2 rounded-md w-max md:w-[150px] hover:bg-blue-700 hover:cursor-pointer duration-200'>
                  <FaApple className='text-2xl'
                  />
                   <p className='font-extralight text-[14px] '
                  >Apple</p>
              </button>
            </div>
            <div className='text-center'>
            <h1>Vous avez deja un compte? </h1>
            <button onClick={() => {navigate('/login')}}
            className='border  m-10 bg-white text-blue-500 font-semibold py-1.5 px-10 rounded-full hover:bg-blue-500 hover:text-white hover:scale-105 duration-200 hover:cursor-pointer'
            >Se connecter</button>
            </div>
          </div>

        </div>
       {/* <div className='bg-blue-400 w-50 h-50 absolute z-1 rounded-3xl bottom-1/90 right-1/40 m-4'></div>*/}
      </div>
    </div>
  )
}

export default Login