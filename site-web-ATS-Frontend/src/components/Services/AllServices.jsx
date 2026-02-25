import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import apiService from '../../components/Services/apiService'; // Adjust path as needed
import Services from '../../components/Services/Services';

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await apiService.getServices();
      setServices(data);
    } catch (err) {
      setError(err.detail || 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Banner */}
        <div className="relative w-full h-[300px] sm:h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-700"></div>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
          
          <div className="relative z-10 text-center px-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-white/30 rounded-full animate-spin border-t-white"></div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-pulse border-t-blue-300"></div>
              </div>
              <h1 className="text-white text-4xl sm:text-6xl font-bold">Chargement...</h1>
              <p className="text-blue-100 text-lg">Découverte de nos services en cours</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Erreur de chargement</h2>
            <p className="text-slate-600 mb-6">{error}</p>
            <button
              onClick={fetchServices}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative w-full h-[220px] sm:h-[320px] flex items-center justify-center overflow-hidden bg-gray-100 border-b border-gray-200">
        <div className="relative z-10 text-center px-6 sm:px-12 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4">Nos Services</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Depuis plusieurs années, <span className="font-bold text-gray-800">ATS</span> fournit des solutions innovantes,
            des logiciels performants et des infrastructures de pointe pour accompagner votre réussite.
          </p>
        </div>
      </div>

      <Services />

      {/* Services Section */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Notre Catalogue Complet
            </h2>
            <p className="text-base text-gray-500 max-w-2xl mx-auto">
              Découvrez nos solutions adaptées à tous vos besoins technologiques
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {services.map((service, index) => (
              <div
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer max-w-[220px] mx-auto"
                onMouseEnter={() => setHoveredCardId(service.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => handleServiceClick(service)}
              >
                {/* Service Image */}
                <div className="relative h-32 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {service.image ? (
                    <img 
                      src={service.image} 
                      alt={service.nom}
                      className="object-contain max-h-full max-w-full p-2 hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-300 rounded-xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <p className="text-white font-semibold">Cliquer pour plus d'infos</p>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-3">
                  <h3 className="text-[1rem] font-semibold text-gray-800 mb-1">
                    {service.nom}
                  </h3>
                  <p className="text-gray-600 text-xs mb-2">
                    {service.description}
                  </p>
                  {service.prix && (
                    <div className="flex items-center justify-between">
                      <span className="text-[0.75rem] font-medium text-gray-500">À partir de</span>
                      <span className="text-[0.95rem] font-bold text-gray-800">
                        {service.prix} FCFA
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="relative py-16 bg-gray-100 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Une Question ? Un Projet ?
          </h2>
          <p className="text-base text-gray-600 mb-8 max-w-2xl mx-auto">
            Notre équipe d'experts est là pour vous accompagner dans tous vos projets technologiques.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-gray-700 transition-all duration-200"
          >
            Contactez-nous
          </a>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-t-3xl">
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex items-center gap-6">
                {selectedService.image ? (
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.nom}
                    className="w-24 h-24 object-contain bg-white/20 rounded-2xl p-3"
                  />
                ) : (
                  <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                )}
                
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {selectedService.nom}
                  </h2>
                  {selectedService.prix && (
                    <p className="text-xl text-blue-100 font-semibold">
                      À partir de {selectedService.prix} FCFA
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Description détaillée
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {selectedService.description}
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {selectedService.categories && (
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      Catégories
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.categories.map((category, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedService.features && (
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      Fonctionnalités
                    </h4>
                    <ul className="space-y-2">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-slate-600">
                          <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-slate-200">
                <button
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold transition-colors"
                >
                  Fermer
                </button>
                <a
                  href="/contact"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold transition-colors text-center"
                >
                  Demander un devis
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AllServices;