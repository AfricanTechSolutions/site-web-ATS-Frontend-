import React, { useState, useEffect } from 'react';
import apiService from '../Services/apiService.js'; // Adjust the path to your apiService file

export default function Realisations() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // Default image for banner if no projects are available
  const bannerImage = projects.length > 0 ? projects[2].image : '/path/to/fallback.jpg';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Banner */}
      <div className="relative w-full h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center h-full"
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="bg-black w-full h-full opacity-40"></div>
        </div>
        <div className="relative z-10 flex flex-col gap-4 items-center justify-center h-full px-6 text-center">
          <h1 className="text-4xl text-white font-bold drop-shadow-lg">Nos réalisations</h1>
          <p className="text-xl text-gray-100 max-w-3xl">
            ATS a déjà eu à compléter plusieurs projets pour des PME et des grandes entreprises
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Projects grid */}
        <section aria-labelledby="projects-heading">
          <h2 id="projects-heading" className="sr-only">
            Projets
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <article
                key={p.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full"
              >
                <div className="h-48 sm:h-56 w-full relative">
                  <img
                    src={p.image}
                    alt={p.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-1">{p.description}</p>

                  <div className="flex items-center justify-center mt-4">
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs text-center bg-gray-100 px-2 py-1 rounded-md text-gray-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Gallery section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Galerie</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {projects.map((p, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <img
                  src={p.image}
                  alt={`Galerie ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-110 duration-200"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Case studies / Full width highlight */}
        {projects.length > 0 && (
          <section className="mt-12 bg-gradient-to-r from-blue-50 to-white rounded-xl p-6">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Étude de cas : {projects[0].title}</h3>
                <p className="text-gray-700 mb-4">
                  {projects[0].description} Résultats : réduction du temps de traitement des dossiers
                  de 40%.
                </p>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>Conception UX centrée utilisateur</li>
                  <li>API REST & WebSocket pour mises à jour temps réel</li>
                  <li>Pipeline CI/CD et tests automatisés</li>
                </ul>
              </div>
              <div className="w-full lg:w-96 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={projects[0].image}
                  alt={`Étude de cas ${projects[0].title}`}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-12 bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-semibold">Vous avez un projet ?</h4>
            <p className="text-gray-600">
              Parlons-en — on peut transformer votre idée en solution concrète.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/contact"
              className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-gray-100 font-semibold hover:text-blue-600 outline"
            >
              Contactez-nous
            </a>
            <button className="px-4 py-2 rounded-full border">Voir le portfolio complet</button>
          </div>
        </section>
      </main>
    </div>
  );
}