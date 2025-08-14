import React from 'react';
// Remplacez les imports d'images par vos propres chemins
import img1 from '../../assets/Realisations/hospital.png';
import img2 from'../../assets/Realisations/ecommerce.jpg';
import img3 from '../../assets/Realisations/siteVitrine.jpg';
import img4 from '../../assets/Realisations/analytics.jpg';
import img5 from '../../assets/Realisations/RH.jpg';
import img6 from '../../assets/Realisations/microservices.jpg';

export default function Realisations() {
  const projects = [
    {
      id: 1,
      title: 'Plateforme de gestion hospitalière',
      img: img1,
      alt: 'Capture écran de la plateforme de gestion hospitalière',
      description:
        "Solution complète pour la gestion des patients, chambres et interventions — interface d'administration réactive et tableau de bord temps réel.",
      tags: ['React', 'Node.js', 'Tailwind']
    },
    {
      id: 2,
      title: 'Application mobile e-commerce',
      img: img2,
      alt: "Pages produit de l'application e-commerce",
      description:
        "Application mobile multi-plateformes avec tunnel d'achat optimisé et intégration paiement mobile.",
      tags: ['React Native', 'Stripe', 'API']
    },
    {
      id: 3,
      title: 'Site vitrine entreprise',
      img: img3,
      alt: 'Design du site vitrine pour une entreprise locale',
      description:
        "Design moderne, SEO-friendly, sections portfolio et contact entièrement administrables.",
      tags: ['React', 'SEO', 'Tailwind']
    },
    {
      id: 4,
      title: 'Tableau de bord analytique',
      img: img4,
      alt: 'Graphiques et métriques sur tableau de bord',
      description:
        "Dashboards temps réel pour la visualisation des indicateurs clés, filtres et export CSV/PDF.",
      tags: ['Charts', 'WebSocket', 'Auth']
    },
    {
      id: 5,
      title: 'Portail RH & recrutement',
      img: img5,
      alt: 'Formulaire de candidature et liste des postes',
      description:
        "Système de candidature en ligne avec upload de CV, calendrier d'entretiens et workflow RH.",
      tags: ['Forms', 'S3', 'Notifications']
    },
    {
      id: 6,
      title: 'Microservices & API',
      img: img6,
      alt: "Diagramme d'architecture microservices",
      description:
        "Architecture extensible en microservices, scalabilité et monitoring intégrés.",
      tags: ['Docker', 'Kubernetes', 'Monitoring']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Banner */}
      <div className="relative w-full h-96 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center h-full"
                style={{
                  backgroundImage: `url(${img4})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              >
                <div className="bg-black w-full h-full opacity-40"></div>
              </div>
              <div className="relative z-10 flex flex-col gap-4 items-center justify-center h-full px-6 text-center">
                <h1 className="text-4xl text-white font-bold drop-shadow-lg">Nos realisations</h1>
                <p className="text-xl text-gray-100 max-w-3xl">ATS a deja ue a completer plusieurs projets pour des PME et des grande entreprises</p>
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
                    src={p.img}
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
                          className="text-xs text-center  bg-gray-100 px-2 py-1 rounded-md text-gray-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* <div className="flex gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full border border-gray-200 hover:shadow"
                      >
                        Voir
                      </button>
                    </div> */}
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
            {/* Réutiliser les images — remplacez selon vos fichiers */}
            {[img1, img2, img3, img4, img5, img6].map((src, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm ">
                <img src={src} alt={`Galerie ${i + 1}`} className="w-full h-full object-cover hover:scale-110 duration-200" loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        {/* Case studies / Full width highlight */}
        <section className="mt-12 bg-gradient-to-r from-blue-50 to-white rounded-xl p-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Étude de cas : Plateforme hospitalière</h3>
              <p className="text-gray-700 mb-4">
                Mise en place d'une plateforme complète (gestion des patients, réservation des salles,
                interventions). Interface administration, API sécurisée et monitoring. Résultats :
                réduction du temps de traitement des dossiers de 40%.
              </p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Conception UX centrée utilisateur</li>
                <li>API REST & WebSocket pour mises à jour temps réel</li>
                <li>Pipeline CI/CD et tests automatisés</li>
              </ul>
            </div>
            <div className="w-full lg:w-96 rounded-lg overflow-hidden shadow-lg">
              <img src={img1} alt="Étude de cas hôpital" className="w-full h-56 object-cover" loading="lazy" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-semibold">Vous avez un projet ?</h4>
            <p className="text-gray-600">Parlons-en — on peut transformer votre idée en solution concrète.</p>
          </div>
          <div className="flex gap-3">
            <a href='/contact' className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-gray-100 font-semibold hover:text-blue-600 outline">Contactez-nous</a>
            <button className="px-4 py-2 rounded-full border">Voir le portfolio complet</button>
          </div>
        </section>
      </main>

      
    </div>
  );
}
