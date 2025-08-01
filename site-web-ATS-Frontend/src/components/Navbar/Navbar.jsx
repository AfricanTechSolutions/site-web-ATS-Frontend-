import React from 'react'
import logo from '../../assets/logo.png'
import {IoMdSearch} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Menu = [
  {id: '1', name: 'Accueil', link: '/'},
  {id: '2', name: 'Nos services', link: '#'},
  {id: '3', name: 'Realisations', link: '#'},
  {id: '4', name: 'A propos', link: '#'},
]

const Navbar = () => {
const navigate = useNavigate();

  return (
    <div className='bg-white shadow-md w-full'>
        {/* Upper section */}
        <div className='mx-0 mt-0 px-5 pt-2 pb-1 bg-blue-200'>
          <div className='flex justify-between
               flex-wrap '>
            <div className=' '>
                <a href="/" className='flex gap-1 text-lg font-semibold'><p>ATS</p>
                <img src={logo} alt="Logo"
                              className='w-[40px] h-[30px]' /></a>
            </div>
            <div className='md:mr-[300px] '>
              <ul className='flex sm:gap-8 gap-4'>
                {
                  Menu.map((data) => (
                    <li key={data.id}
                    className='text-black hover:text-blue-500 font-semibold text-xl'>
                        <a href={data.link}>{data.name}</a>
                    </li>
                  )
                )
                }
              </ul>
            </div>
          </div>
        </div>
        {/* Lower section */}
        <div>
        <div className='flex justify-between flex-wrap py-1 px-4'>
           <div className='relative group hover:text-blue-950'>
              <input type="text" placeholder=' Search...' 
                  className='min-w-[150px] w-full border rounded-xl p-1 bg-white focus:outline-blue-500
                    mt-2 mb-1 border-gray-500 sm:group-hover:w-[250px] duration-300 
                    hover:border-blue-600 transition-all md:w-[400px] 
                    md:group-hover:w-[420px] '
              /> <IoMdSearch className='absolute top-1/2 -translate-y-1/2 right-3'
              />
            </div>
            <div className='flex gap-4 sm:gap-6 mb-1 flex-wrap'>
              <button onClick={() => {navigate('/login')} } 
                className='bg-blue-500 text-white text-xl
                                      font-semibold py-1 px-4 rounded-full mt-2 mb-1
                                      hover:cursor-pointer hover:scale-105
                                      duration-200 hover:bg-blue-700
                                      '>
                se connecter
              </button>
              <button onClick={() => {navigate('/register')}}

                className='bg-gray-200 text-black text-xl
                                      font-semibold py-1 px-4 rounded-full mt-2 mb-1
                                      hover:cursor-pointer hover:scale-105
                                      duration-200 hover:bg-gray-300
                                      '>
                Nouveau compte
              </button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Navbar