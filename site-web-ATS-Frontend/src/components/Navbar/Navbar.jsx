import React, { useState, useEffect } from 'react'
import logo from '../../assets/logo_ats2.png'
import { IoMdLogIn, IoMdPersonAdd } from "react-icons/io";
import {FaBars, FaTimes} from "react-icons/fa"

const Menu = [
  { id: '1', name: 'Accueil', link: '/' },
  { id: '2', name: 'Nos services', link: '/services' },
  { id: '3', name: 'Réalisations', link: '/realisations' },
  { id: '4', name: 'À propos', link: '/about-us' },
  { id: '5', name: 'Nous contacter', link: '/contact'},
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState('1');

  // Mock navigation function (replace with your router implementation)
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
    window.location.href = path;
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-nav')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const handleMenuClick = (id, link) => {
    setActiveMenu(id);
    setIsOpen(false);
    navigate(link);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`fixed top-0 w-[100vw] z-50 transition-all duration-500 hidden md:block ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20' 
          : 'bg-gradient-to-r from-white via-blue-50/50 to-white shadow-sm'
      }`}>
        {/* Main Navigation */}
        <div className="mx-auto px-3 w-full">
          <div className="flex items-center justify-between h-20 w-full">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/')}>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <img src={logo} alt="Logo ATS" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                  ATS
                </h1>
                <p className="text-xs text-slate-500 -mt-1">African Technologies Solutions</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex items-center lg:space-x-8 md:space-x-4">
              {Menu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id, item.link)}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    activeMenu === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                  {activeMenu === item.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Right Section */}
            
              {/* Search Bar */}

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 mr-2">
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <IoMdLogIn className= 'text-3xl'/>
                  <span>Se connecter</span>
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-medium hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <IoMdPersonAdd className='text-2xl'/>
                  <span>S'inscrire</span>
                </button>
              </div>
            
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <div className={`fixed top-0 w-full z-50 md:hidden transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-lg' 
          : 'bg-gradient-to-r from-white via-blue-50/50 to-white'
      }`}>
        <div className="flex items-center justify-between px-6 h-16">
          {/* Mobile Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <img src={logo} alt="Logo ATS" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
              ATS
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 bg-white rounded-xl shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all duration-300"
          >
            <span className={`text-2xl text-slate-700 transition-all duration-300 ${isOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}> <FaBars /> </span>
            <span className={`text-2xl text-slate-700 absolute transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'}`}><FaTimes /> </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="mobile-nav absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl border-t border-white/20">
            <div className="p-6 space-y-6">
              {/* Mobile Search */}

              {/* Mobile Navigation */}
              <div className="space-y-2">
                {Menu.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id, item.link)}
                    className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 text-left ${
                      activeMenu === item.id
                        ? 'bg-blue-50 text-blue-600 shadow-lg shadow-blue-500/10'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="font-medium text-lg">{item.name}</span>
                    {activeMenu === item.id && (
                      <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Mobile Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                >
                  <span className="text-xl">🚪</span>
                  <span>Se connecter</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/register');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 p-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-medium hover:bg-slate-50 transition-all duration-300"
                >
                  <span className="text-xl">👤</span>
                  <span>Créer un compte</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-20 md:h-20"></div>
    </>
  );
};

export default Navbar;