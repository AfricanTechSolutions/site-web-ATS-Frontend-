import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaMobileAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

const IconList = [
  {
    id: 1,
    name: <FaFacebook className="text-2xl transition-transform duration-300 group-hover:scale-125" />,
    text: 'Facebook',
    link: '/',
  },
  {
    id: 2,
    name: <FaInstagram className="text-2xl transition-transform duration-300 group-hover:scale-125" />,
    text: 'Instagram',
    link: '/',
  },
  {
    id: 3,
    name: <FaLinkedin className="text-2xl transition-transform duration-300 group-hover:scale-125" />,
    text: 'LinkedIn',
    link: '/',
  },
  {
    id: 4,
    name: <FaTwitter className="text-2xl transition-transform duration-300 group-hover:scale-125" />,
    text: 'Twitter / X',
    link: '/',
  },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white pt-12 pb-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.05),
              rgba(255, 255, 255, 0.05) 10px,
              transparent 10px,
              transparent 20px
            )
          `,
          opacity: 0.3,
        }}
      ></div>

      {/* Decorative Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
        {/* Logo and Description Section */}
        <div className="flex flex-col items-center sm:items-start">
          <div className="mb-4">
            <h1
              className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
              aria-label="ATS Logo"
            >
              A T S
            </h1>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
            ATS : Votre partenaire pour des solutions technologiques innovantes au Cameroun et au-delà.
          </p>
        </div>

        {/* Liens importants */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">
            Liens importants
          </h2>
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href="/"
                className="text-gray-300 hover:text-white transition-colors duration-300"
                aria-label="Page d'accueil"
              >
                Accueil
              </a>
            </li>
            <li>
              <a
                href="/about-us"
                className="text-gray-300 hover:text-white transition-colors duration-300"
                aria-label="À propos de nous"
              >
                À propos
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
                aria-label="Mentions légales"
              >
                Mentions légales
              </a>
            </li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">
            Réseaux sociaux
          </h2>
          <ul className="flex flex-wrap justify-center sm:justify-start gap-6">
            {IconList.map((data) => (
              <li key={data.id}>
                <a
                  href={data.link}
                  className="group flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full hover:bg-blue-600/50 transition-all duration-300"
                  aria-label={`Suivez-nous sur ${data.text}`}
                >
                  {data.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Coordonnées */}
        <div className="flex flex-col gap-4 items-center sm:items-start">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">
            Contact
          </h2>
          <div className="flex items-center gap-3 text-gray-300">
            <FaMobileAlt className="text-xl text-blue-400" />
            <div className='flex flex-col'>
            <span>+237 675 90 24 76</span>
            <span>+237 690 13 34 46</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <FaLocationDot className="text-xl text-red-400" />
            <span className="underline">Douala, Cameroun</span>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mt-12 relative">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                rgba(255, 255, 255, 0.1),
                rgba(255, 255, 255, 0.1) 10px,
                transparent 10px,
                transparent 20px
              )
            `,
            opacity: 0.3,
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto p-2 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-lg sm:text-xl font-semibold text-white text-center sm:text-left">
            Besoin d'aide ou d'informations ?
          </p>
          <a
            href="/contact"
            className="group px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            aria-label="Nous contacter"
          >
            <span className="flex items-center space-x-2">
              <span>Nous contacter</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 text-center text-sm text-gray-400 py-6">
        &copy; {new Date().getFullYear()} ATS. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;