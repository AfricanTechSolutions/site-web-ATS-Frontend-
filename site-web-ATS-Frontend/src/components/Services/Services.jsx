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
      titre: "Maintenance",
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
      
      <div className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20 mb-6">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-slate-600">Découvrez nos services</span>
          </div>
          <h1 className="text-3xl lg:text-[3rem] font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight">
            Nos principaux produits
            <br />
            <span className="text-4xl lg:text-[2.5rem">et services</span>
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
              className="max-w-[350px] bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 mx-auto"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={service.img}
                  alt={service.titre}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col justify-between h-48">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {service.titre}
                </h3>
                <p className="text-slate-600 text-base mb-4">
                  {service.description}
                </p>
                <div className="text-xs text-green-600 font-medium mt-auto">Service disponible</div>
              </div>
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