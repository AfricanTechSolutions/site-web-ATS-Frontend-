import React, { useState, useEffect } from 'react';
import apiService from '../Services/apiService.js'; // Adjust the path to your apiService file

export default function Realisations() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeProject, setActiveProject] = useState(0);

  // Fetch realisations from the backend
  useEffect(() => {
    const fetchRealisations = async () => {
      try {
        const data = await apiService.getRealisations();
        // Map backend data to match frontend structure
        const mappedData = data.map((item) => ({
          id: item.id,
          title: item.titre,
          image: item.img,
          alt: `Capture d'écran de ${item.titre}`, // Derive alt text since not in serializer
          description: item.description, // Use description directly from API
          tags: item.technologies_names,
        }));
        setProjects(mappedData);
        setLoading(false);
      } catch (err) {
        setError(err.detail || 'Failed to load projects');
        setLoading(false);
      }
    };

    fetchRealisations();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-2xl font-semibold text-gray-700">Chargement de nos réalisations...</p>
          <p className="text-gray-500 mt-2">Découvrez nos projets les plus innovants</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-gray-50 to-red-100 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center max-w-md mx-4 border border-red-200/50">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oups ! Une erreur s'est produite</h2>
          <p className="text-red-600 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // Default image for banner if no projects are available
  const bannerImage = projects.length > 0 ? projects[2]?.image || projects[0]?.image : '../../assets/image.png';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100 text-gray-800">
      {/* Modern Banner */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center h-full scale-105 transition-transform duration-1000 hover:scale-110"
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70"></div>
        </div>
        
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-blue-500/20 backdrop-blur-sm rounded-2xl animate-pulse delay-500"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 tracking-tight">
            <span className="block">Nos</span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Réalisations
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 max-w-4xl leading-relaxed font-light">
            ATS a déjà eu à compléter plusieurs projets pour des PME et des grandes entreprises
          </p>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Project - Large Feature */}
        {projects.length > 0 && (
          <section className="mb-24">
            <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-12 lg:p-16 flex flex-col justify-center relative z-10">
                  <div className="mb-6">
                    <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold backdrop-blur-sm">
                      Projet Phare
                    </span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                    {projects[0].title}
                  </h2>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    {projects[0].description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {projects[0].tags.map((tag) => (
                      <span key={tag} className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-1">
                      Voir le projet
                    </button>
                    <button className="px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 font-bold rounded-2xl transition-all duration-300">
                      Plus d'infos
                    </button>
                  </div>
                </div>
                <div className="relative h-96 lg:h-full">
                  <img 
                    src={projects[0].image} 
                    alt={projects[0].alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-gray-900/50 lg:to-gray-900/80"></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Timeline Layout */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Notre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Parcours</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une chronologie de nos innovations et réalisations marquantes
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 h-full rounded-full"></div>
            
            <div className="space-y-24">
              {projects.slice(1).map((project, index) => (
                <div key={project.id} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:gap-16`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:pl-16'} mb-8 lg:mb-0`}>
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 relative">
                      <div className={`absolute top-8 ${index % 2 === 0 ? 'lg:-right-6' : 'lg:-left-6'} w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg`}></div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 max-w-lg">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative bg-white p-3 rounded-3xl shadow-xl">
                        <img 
                          src={project.image} 
                          alt={project.alt}
                          className="w-full h-64 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Masonry Gallery */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Galerie <span className="text-blue-600">Dynamique</span>
            </h2>
            <p className="text-gray-600 text-lg">Un aperçu créatif de nos réalisations</p>
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {projects.map((project, index) => (
              <div key={project.id} className="break-inside-avoid group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.alt}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-bold text-lg mb-2">{project.title}</h4>
                    <p className="text-sm text-gray-200 line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Showcase */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Showcase Interactif</h2>
                <p className="text-gray-600 text-lg">Explorez nos projets en détail</p>
              </div>
              
              {projects.length > 0 && (
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="space-y-4 mb-8">
                      {projects.slice(0, 4).map((project, index) => (
                        <button
                          key={project.id}
                          onClick={() => setActiveProject(index)}
                          className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                            activeProject === index 
                              ? 'bg-blue-500 text-white shadow-xl transform scale-105' 
                              : 'bg-white/80 hover:bg-white text-gray-900 hover:shadow-lg'
                          }`}
                        >
                          <h4 className="font-bold text-lg mb-2">{project.title}</h4>
                          <p className={`text-sm ${activeProject === index ? 'text-blue-100' : 'text-gray-600'}`}>
                            {project.description.substring(0, 100)}...
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative bg-white p-3 rounded-2xl shadow-2xl">
                        <img 
                          src={projects[activeProject]?.image} 
                          alt={projects[activeProject]?.alt}
                          className="w-full h-80 object-cover rounded-xl transition-all duration-500"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {projects[activeProject]?.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {projects[activeProject]?.tags.map((tag) => (
                          <span key={tag} className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-700 font-medium shadow-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Enhanced CTA */}
        <section>
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h4 className="text-3xl lg:text-4xl font-bold mb-4">
                  Vous avez un projet en tête ?
                </h4>
                <p className="text-blue-100 text-lg lg:text-xl max-w-2xl">
                  Parlons-en — nous pouvons transformer votre idée en solution concrète et innovante.
                  Notre équipe d'experts vous accompagne de A à Z.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <a
                  href="/contact"
                  className="px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  Contactez-nous
                </a>
                <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-1">
                  Portfolio complet
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}