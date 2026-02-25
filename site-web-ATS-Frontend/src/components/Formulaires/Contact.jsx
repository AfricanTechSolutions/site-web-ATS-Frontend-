import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import ContactForm from './ContactForm';
import img1 from '../../assets/image.png';
import { FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const cards = [
    {
      icon: <FaMapMarkerAlt />,
      color: 'blue',
      title: 'Localisation',
      text: 'Entree BADEN BADEN,\nDouala, Cameroun',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: <FaPhoneAlt />,
      color: 'green',
      title: 'Téléphone',
      text: '+237 675 90 24 76\n+237 690 13 34 46',
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: <FaEnvelope />,
      color: 'red',
      title: 'Email',
      text: 'contact@africantechnologies-group.com',
      gradient: 'from-red-500 to-red-600',
    },
    {
      icon: <FaClock />,
      color: 'orange',
      title: 'Horaires',
      text: 'Lun - Ven: 8h - 18h\nSamedi: 9h - 15h\nDimanche: Fermé',
      gradient: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col w-full items-center p-0">
      {/* Banner - UNCHANGED */}
      <div className="relative w-full h-[400px] sm:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1600&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-wide drop-shadow-lg animate-fadeInUp">
            Nous Contacter
          </h1>
          <p className="mt-4 text-base sm:text-xl text-gray-200 max-w-2xl animate-fadeInUp delay-200">
            Nous sommes toujours à votre écoute pour vous accompagner et répondre à vos besoins.
          </p>

          <a href='Https://wa.me/+237675902476' target='_blank' className="mt-6 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl shadow-lg transition-transform transform hover:-translate-y-1 animate-fadeInUp delay-300 flex gap-2">
            Envoyer un message
            <FaWhatsapp className='text-2xl' />
          </a>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className='fixed right-4 bottom-6 z-50'>
        <a 
          href='Https://wa.me/+237675902476' 
          target='_blank' 
          className="group relative animate-bounce hover:animate-none px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center gap-2 backdrop-blur-sm"
        >
          <span className="hidden md:inline">WhatsApp</span>
          <FaWhatsapp className='text-2xl group-hover:rotate-12 transition-transform duration-300' />
        </a> 
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Form + Cards Row */}
        <div className="flex flex-col xl:flex-row items-start gap-12">
          
          {/* Left Column: Cards + Welcome Text */}
          <div className="flex-1 space-y-8">
            
            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-gray-300 shadow-lg hover:shadow-xl rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {/* Subtle gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className="relative flex items-start gap-4">
                    {/* Modern Icon Container */}
                    <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${card.gradient} text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 flex-shrink-0`}>
                      <div className="text-xl">{card.icon}</div>
                      {/* Subtle glow effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-20 blur-md group-hover:blur-lg transition-all duration-300`}></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[1rem] text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed break-words">
                        {card.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Welcome Section */}
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50 overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <h2 className='text-center text-3xl lg:text-3xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent'>
                  Bienvenu chez ATS
                </h2>
                <p className="text-gray-700 text-center max-w-3xl mx-auto leading-relaxed text-lg">
                  Nous sommes à votre disposition pour répondre à toutes vos questions — que ce soit pour une
                  demande commerciale, un support technique, ou pour planifier une visite. Notre équipe vous
                  répondra dans les plus brefs délais. N'hésitez pas à préciser l'objet de votre message
                  pour un traitement plus rapide.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="w-full xl:w-96 xl:flex-shrink-0">
            <ContactForm />
          </div>
        </div>

        {/* Map Section */}
        <div className='space-y-8 mt-20'>
          <div className="text-center">
            <h2 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-4'>
              Nous trouver sur{' '}
              <span className="bg-gradient-to-r from-blue-600 via-green-500 to-red-500 bg-clip-text text-transparent font-extrabold">
                Google
              </span>{' '}
              <span className="text-gray-800">Maps</span>
            </h2>
            <p className="text-gray-600 text-lg">Visitez-nous à notre bureau principal</p>
          </div>

          {/* Map Container with modern styling */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-3xl opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white p-3 rounded-3xl shadow-2xl">
              <iframe
                src="https://maps.google.com/maps?q=4.0989136,9.7534779&z=16&output=embed"
                width="100%"
                height="390"
                title="Notre localisation"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl shadow-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;