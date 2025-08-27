import React, { useState, useEffect } from 'react';
import { BsStars } from "react-icons/bs";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Mock data for demonstration since we can't fetch from external API
  const mockServices = [
    {
      id: 1,
      titre: "Développement Web",
      description: "Création de sites web modernes et responsives avec les dernières technologies",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      titre: "Applications Mobile",
      description: "Développement d'applications iOS et Android natives et cross-platform",
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      titre: "Cloud Solutions",
      description: "Infrastructure cloud scalable et sécurisée pour votre entreprise",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      titre: "Intelligence Artificielle",
      description: "Solutions IA personnalisées pour automatiser vos processus métier",
      img: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      titre: "Cybersécurité",
      description: "Protection avancée de vos données et systèmes informatiques",
      img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      titre: "Consulting IT",
      description: "Conseils stratégiques pour optimiser votre transformation digitale",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
    }
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setServices(mockServices);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-purple-600 rounded-full animate-spin animation-delay-150"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center p-8 bg-white rounded-3xl shadow-2xl border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">Erreur de chargement</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20 mb-6">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-slate-600">Découvrez nos services</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight">
            Nos principaux produits
            <br />
            <span className="text-4xl lg:text-5xl">et services</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Des solutions technologiques innovantes pour propulser votre entreprise vers l'avenir
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 hover:border-white/40"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Image container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.titre}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating badge */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <BsStars className="text-xl text-amber-500"/> 
                </div>
              </div>

              {/* Content */}
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-800 transition-colors duration-300">
                    {service.titre}
                  </h3>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <span className="text-white text-sm">→</span>
                  </div>
                </div>
                
                <p className="text-slate-600 leading-relaxed mb-6 group-hover:text-slate-700 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Action button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-slate-500">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Service disponible</span>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>

              {/* Hover glow effect */}
              <div 
                className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${
                  hoveredCard === service.id 
                    ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-indigo-500/10 opacity-100' 
                    : 'opacity-0'
                }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA section */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:bg-white/90 transition-all duration-300 cursor-pointer group">
            <span className="text-lg font-semibold text-slate-700 mr-3">Besoin d'un service personnalisé ?</span>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm transform group-hover:translate-x-0.5 transition-transform duration-300"> <a href="/contact"> → </a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;