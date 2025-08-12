import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import img1 from '../../assets/image.png';

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
      text: '+237 6 XX XX XX XX\n+237 6 XX XX XX XX',
    },
    {
      icon: <FaEnvelope />,
      color: 'red',
      title: 'Email',
      text: 'contact@africantechnologies-group.com',
    },
    {
      icon: <FaClock />,
      color: 'yellow',
      title: 'Horaires',
      text: 'Lun - Ven: 8h - 18h\nSamedi: 9h - 15h\nDimanche: Fermé',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col w-full items-center p-0">
      {/* Banner */}
      <div className="relative w-full h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center h-full"
          style={{
            backgroundImage: `url(${img1})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="bg-black w-full h-full opacity-40"></div>
        </div>
        <div className="relative z-10 flex flex-col gap-4 items-center justify-center h-full px-6 text-center">
          <h1 className="text-4xl text-white font-bold drop-shadow-lg">Nous Contacter</h1>
          <p className="text-xl text-gray-100 max-w-3xl">Nous sommes toujours à votre écoute</p>
        </div>
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
        <div className="flex-1">
          <form className="bg-white rounded-md shadow-2xl p-6 flex flex-col gap-6 w-full min-h-[420px]">
            <fieldset className="mb-4">
              <legend className="font-semibold text-gray-800">Envoyer un email</legend>
            </fieldset>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-medium">
                Email*
              </label>
              <input
                type="email"
                id="email"
                placeholder="Entrez votre adresse email"
                className="w-full border border-blue-400 h-10 rounded-md px-3 focus:outline-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="objet" className="mb-1 font-medium">
                Objet du message
              </label>
              <input
                type="text"
                id="objet"
                placeholder="Objet"
                className="w-full border border-blue-400 h-10 rounded-md px-3 focus:outline-blue-500"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="message" className="mb-1 font-medium">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Entrez votre message ici"
                className="w-full border border-blue-400 rounded-md px-3 h-40 lg:h-60 focus:outline-blue-500 p-3 text-gray-700 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled
              className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full self-end hover:bg-blue-700 hover:scale-105 duration-200"
            >
              Envoyer
            </button>
          </form>
        </div>
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
