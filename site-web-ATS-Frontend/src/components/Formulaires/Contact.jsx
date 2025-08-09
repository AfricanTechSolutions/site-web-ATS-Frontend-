import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col w-full">
      
      {/* Banner */}
      <div className="bg-blue-500 text-white text-center py-6 shadow-md w-full m-0">
        <h1 className="text-3xl font-bold">Nous Contacter</h1>
        <p className="text-lg mt-2">Nous sommes toujours à votre écoute</p>
      </div>

      {/* Cards Row */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 p-6 max-w-6xl mx-auto">
        
        {[
          { icon: <FaMapMarkerAlt />, color: 'blue', title: 'Localisation', text: 'Douala, Cameroun' },
          { icon: <FaPhoneAlt />, color: 'green', title: 'Téléphone', text: '+237 6 99 99 99 99' },
          { icon: <FaEnvelope />, color: 'yellow', title: 'Email', text: 'contact@entreprise.com' },
        ].map((card, index) => (
          <div
            key={index}
            className="flex items-center gap-4  bg-white shadow-lg rounded-lg p-10 md:p-4 lg:p-10 flex-1 min-w-[250px] h-auto lg:h-28"
          >
            <div className={`bg-${card.color}-100 text-${card.color}-500 p-3 rounded-full text-2xl flex-shrink`}>
              {card.icon}
            </div>
            <div>
              <h2 className="font-bold text-lg">{card.title}</h2>
              <p className="text-gray-600">{card.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Map + Form Section */}
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto p-6 w-full">
        
        {/* GPS Map Placeholder */}
        <div className="flex-1 bg-gray-200 rounded-lg min-h-[300px] lg:min-h-[500px] flex items-center justify-center text-gray-500">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1989.8064856432823!2d9.752184388311925!3d4.098902774319888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2scm!4v1754671853321!5m2!1sen!2scm" 
          allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          className='w-full h-full'></iframe>
        </div>

        {/* Contact Form */}
        <div className="flex-1 flex">
          <form className="bg-white rounded-md shadow-2xl p-6 flex flex-col gap-6 w-full min-h-[300px] lg:min-h-[500px]">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-medium">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Entrez votre adresse email"
                className="w-full border border-blue-400 h-10 rounded-md px-3 focus:outline-blue-500"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="message" className="mb-1 font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Entrez votre message ici"
                className="w-full border border-blue-400 rounded-md px-3 h-[400px] focus:outline-blue-500 p-3 text-xl text-gray-700 resize-none flex-1"
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
    </div>
  );
}

export default Contact;
