import React from 'react'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaMobileAlt
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const IconList = [
  {
    id: 1,
    name: <FaFacebook className="text-3xl hover:scale-125 duration-200" />,
    text: "Facebook",
    link: "/"
  },
  {
    id: 2,
    name: <FaInstagram className="text-3xl hover:scale-125 duration-200" />,
    text: "Instagram",
    link: "/"
  },
  {
    id: 3,
    name: <FaLinkedin className="text-3xl hover:scale-125 duration-200" />,
    text: "LinkedIn",
    link: "/"
  },
  {
    id: 4,
    name: <FaTwitter className="text-3xl hover:scale-125 duration-200" />,
    text: "Twitter / X",
    link: "/"
  }
];

const Footer = () => {
  return (
    <footer className="bg-gray-200 w-full mt-10 pt-8">
      {/* Main content */}
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
        {/* Liens importants */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Liens importants</h2>
          <ul className="flex flex-col gap-3">
            <li><a href="/" className="hover:text-blue-600">Accueil</a></li>
            <li><a href="/about-us" className="hover:text-blue-600">À propos</a></li>
            <li><a href="#" className="hover:text-blue-600">Mentions légales</a></li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Réseaux sociaux</h2>
          <ul className="flex flex-wrap justify-center sm:justify-start gap-4">
            {IconList.map((data) => (
              <li key={data.id}>
                <a href={data.link} className="text-gray-700 hover:text-blue-600">
                  {data.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Coordonnées */}
        <div className="flex flex-col gap-3 items-center sm:items-start">
          <h2 className="font-semibold text-lg mb-4">Contact</h2>
          <div className="flex items-center gap-2">
            <FaMobileAlt /><span>6XXXXXXXX</span>
          </div>
          <div className="flex items-center gap-2">
            <FaLocationDot className="text-red-600" />
            <span><u>Douala, Cameroun</u></span>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-400 text-white mt-10">
        <div className="max-w-screen-xl mx-auto p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-center text-lg font-semibold">Besoin d'aide ou d'informations ?</p>
          <a
            href="/contact"
            className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition duration-200"
          >
            Nous contacter
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-600 py-4">
        &copy; {new Date().getFullYear()} Tsona Belvic Tous droits réservés. belvictsona@gmail.com
      </div>
    </footer>
  );
};

export default Footer;
