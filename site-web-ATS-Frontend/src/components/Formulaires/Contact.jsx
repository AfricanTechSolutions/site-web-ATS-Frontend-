
import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import ContactForm from './ContactForm'; // Adjust the import path based on your file structure
import img1 from '../../assets/image.png';
import { FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const cards = [
    {
      icon: <FaMapMarkerAlt />,
      color: 'blue',
      title: 'Localisation',
      text: 'Entree BADEN BADEN,\nDouala, Cameroun',
    },
    {
      icon: <FaPhoneAlt />,
      color: 'green',
      title: 'Téléphone',
      text: '+237 675 90 24 76\n+237 690 13 34 46',
    },
    {
      icon: <FaEnvelope />,
      color: 'red',
      title: 'Email',
      text: 'contact@africantechnologies-group.com',
    },
    {
      icon: <FaClock />,
      color: 'orange',
      title: 'Horaires',
      text: 'Lun - Ven: 8h - 18h\nSamedi: 9h - 15h\nDimanche: Fermé',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col w-full items-center p-0">
      {/* Banner */}
      <div className="relative w-full h-[400px] sm:h-[500px] overflow-hidden">
  {/* Background image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1600&q=80')`,
    }}
  >
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
  </div>

  {/* Content */}
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

<div className='fixed right-0 bottom-15 mr-2 md:mr-7 border-2 border-b-red-500 border-t-0 border-x-0'>
<a href='Https://wa.me/+237675902476' target='_blank' className="animate-bounce duration-200 mt-6 px-6 py-3 bg-green-700/80 hover:bg-green-800 text-white font-semibold rounded-xl shadow-lg transition-transform transform hover:-translate-y-1 animate-fadeInUp delay-300 flex gap-2">
      Whatsapp
      <FaWhatsapp className='text-2xl' />
    </a> 
  </div>

      {/* Form + Cards Row (items-stretch to equalize heights) */}
      <div className="flex flex-col lg:flex-row items-stretch gap-8 max-w-full mx-auto p-2 w-full mt-10">
        {/* Left column: cards grid + text under the cards */}
        <div className="flex-1 flex flex-col gap-6">
          {/* 2x2 cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-max">
            {cards.map((card, index) => (
              <div
                key={index}
                style={{ whiteSpace: 'pre-wrap' }}
                className="flex items-center gap-4 bg-white shadow-lg rounded-lg py-3 px-1 lg:min-w-[400px] "
              >
                <div
                  className={`bg-${card.color}-100 text-${card.color}-500 py-3 px-3 rounded-full text-2xl flex-shrink-0`}
                >
                  {card.icon}
                </div>
                <div>
                  <h2 className="font-bold text-lg">{card.title}</h2>
                  <p className="text-gray-600 break-all">{card.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Extra text block UNDER the cards (outside the cards), it will expand to match form height */}
          <div className="bg-white rounded-lg shadow-lg px-4 flex-1 flex justify-center flex-col ">
            <h3 className='text-center text-2xl text-gray-800 font-bold mb-6 lg:text-3xl'>Bienvenu chez ATS</h3>
            <p className="text-gray-700 text-center max-w-full font-mono">
              Nous sommes à votre disposition pour répondre à toutes vos questions — que ce soit pour une
              demande commerciale, un support technique, ou pour planifier une visite. Notre équipe vous
              répondra dans les plus brefs délais. N'hésitez pas à préciser l'objet de votre message
              pour un traitement plus rapide.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>

      {/* Map Section */}
      <div className='flex flex-col gap-5 mt-10 w-full max-w-6xl'>
        <h1 className='text-center text-3xl text-gray-800'>Nous trouver sur <span className=" font-semibold bg-gradient-to-r  from-blue-500 via-green-500 to-red-500 bg-clip-text text-transparent">
  Google 
</span> <span>Maps</span>
 </h1>
      <div className="w-full max-w-6xl px-6 mt-10">
        <iframe
          src="https://maps.google.com/maps?q=4.0989136,9.7534779&z=16&output=embed"
          width="100%"
          height="450"
          title="Notre localisation"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg shadow-lg"
        ></iframe>
      </div>
      </div>
    </div>
  );
};

export default Contact;
