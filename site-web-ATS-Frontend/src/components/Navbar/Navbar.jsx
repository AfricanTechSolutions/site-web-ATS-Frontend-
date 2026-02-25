import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_ats2.png';
import { IoMdLogIn, IoMdPersonAdd } from 'react-icons/io';
import { FaBars, FaTimes } from 'react-icons/fa';

const Menu = [
  { id: '1', name: 'Accueil', link: '/' },
  { id: '2', name: 'Nos services', link: '/services' },
  { id: '3', name: 'Réalisations', link: '/realisations' },
  { id: '4', name: 'À propos', link: '/about-us' },
  { id: '5', name: 'Nous contacter', link: '/contact' },
  { id: '6', name: 'Blog', link: '/blog' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState('1');
  const navigate = useNavigate();

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
      if (isOpen && event.target.closest('.mobile-nav-overlay')) {
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
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 hidden md:block ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-md border-b border-gray-100'
            : 'bg-gradient-to-r from-white via-blue-50/70 to-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo Section */}
            <div
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
              onClick={() => handleMenuClick('1', '/')}
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300">
                  <img src={logo} alt="Logo ATS" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                  ATS
                </h1>
                <p className="text-xs text-slate-500 hidden sm:block">African Technologies Solutions</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex items-center space-x-2 lg:space-x-6">
              {Menu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id, item.link)}
                  className={`relative px-3 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                    activeMenu === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                >
                  {item.name}
                  {activeMenu === item.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => navigate('/login')}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105"
              >
                <IoMdLogIn className="text-lg sm:text-xl" />
                <span>Se connecter</span>
              </button>
              <button
                onClick={() => navigate('/register')}
                className="hidden lg:flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 hover:scale-105"
              >
                <IoMdPersonAdd className="text-lg sm:text-xl" />
                <span>S'inscrire</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <div
        className={`fixed top-0 w-full z-50 md:hidden transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-gradient-to-r from-white via-blue-50/70 to-white'
        }`}
      >
        <div className="flex items-center justify-between px-4 h-16">
          {/* Mobile Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleMenuClick('1', '/')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300">
              <img src={logo} alt="Logo ATS" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
              ATS
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-10 h-10 bg-white rounded-lg shadow-md border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all duration-500"
          >
            {isOpen ? (
              <FaTimes className="text-xl text-slate-700" />
            ) : (
              <FaBars className="text-xl text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden mobile-nav-overlay">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-100">
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                {Menu.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id, item.link)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-base font-medium transition-all duration-300 ${
                      activeMenu === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-700 hover:bg-blue-50/50'
                    }`}
                    style={{ animation: `fadeIn ${0.2 + index * 0.1}s ease-in` }}
                  >
                    <span>{item.name}</span>
                    {activeMenu === item.id && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-base font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                >
                  <IoMdLogIn className="text-xl" />
                  <span>Se connecter</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/register');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-white border border-slate-200 text-slate-700 rounded-lg text-base font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
                >
                  <IoMdPersonAdd className="text-xl" />
                  <span>S'inscrire</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20"></div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;