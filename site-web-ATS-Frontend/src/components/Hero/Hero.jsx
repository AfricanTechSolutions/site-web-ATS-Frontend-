import React from 'react';
import Slider from 'react-slick';
import Services from '../Services/Services';
import Customers from '../../components/Customers/Customers'
import img1 from'../../assets/experts.jpg'
import logo33 from '../../assets/partners/logo33.png';
import logo36 from '../../assets/partners/logo36.png';
import logo47 from '../../assets/partners/logo47.png';
import logo28 from '../../assets/partners/logo28.png';
import logo37 from '../../assets/partners/logo37.png';
import logo32 from '../../assets/partners/logo32.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {BsStars} from 'react-icons/bs';
import { IoMdArrowRoundForward, IoIosSchool } from "react-icons/io";

// Mock images for demonstration
const ImageList = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
    title: 'Nous développons des logiciels pour vous.',
    description: 'Solutions technologiques innovantes adaptées à vos besoins métier spécifiques',
  },
  {
    id: 2,
    img: img1,
    title: 'Des développeurs expérimentés',
    description: "Une équipe passionnée avec plus de 10 ans d'expérience collective dans le développement",
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop',
    title: 'Achetez vos ordinateurs chez nous',
    description: 'Hardware professionnel et configurations sur mesure pour booster votre productivité',
  },
];

const projects = [
  {
    id: 1,
    title: 'Plateforme de gestion hospitalière',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
    alt: 'Capture écran de la plateforme de gestion hospitalière',
    description:
      'Solution complète pour la gestion des patients, chambres et interventions — interface d’administration réactive et tableau de bord temps réel.',
    tags: ['React', 'Node.js', 'Tailwind'],
    category: 'Healthcare',
  },
  {
    id: 2,
    title: 'Application mobile e-commerce',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    alt: "Pages produit de l'application e-commerce",
    description: 'Application mobile multi-plateformes avec tunnel d’achat optimisé et intégration paiement mobile.',
    tags: ['React Native', 'Stripe', 'API'],
    category: 'E-commerce',
  },
  {
    id: 3,
    title: 'Site vitrine entreprise',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    alt: 'Design du site vitrine pour une entreprise locale',
    description: 'Design moderne, SEO-friendly, sections portfolio et contact entièrement administrables.',
    tags: ['React', 'SEO', 'Tailwind'],
    category: 'Web Design',
  },
  {
    id: 4,
    title: 'Tableau de bord analytique',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    alt: 'Graphiques et métriques sur tableau de bord',
    description: 'Dashboards temps réel pour la visualisation des indicateurs clés, filtres et export CSV/PDF.',
    tags: ['Charts', 'WebSocket', 'Auth'],
    category: 'Analytics',
  },
  {
    id: 5,
    title: 'Portail RH & recrutement',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    alt: 'Formulaire de candidature et liste des postes',
    description: 'Système de candidature en ligne avec upload de CV, calendrier d’entretiens et workflow RH.',
    tags: ['Forms', 'S3', 'Notifications'],
    category: 'HR Tech',
  },
  {
    id: 6,
    title: 'Microservices & API',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
    alt: 'Diagramme d’architecture microservices',
    description: 'Architecture extensible en microservices, scalabilité et monitoring intégrés.',
    tags: ['Docker', 'Kubernetes', 'Monitoring'],
    category: 'DevOps',
  },
];

// Modern Services Component

// Modern Customers Component
const Partenaires = () => {
  const customers = [
    { id: 1, name: 'ASCENCIA', logo: logo33 },
    { id: 2, name: 'KEYCE', logo: logo36 },
    { id: 3, name: 'LA SOURCE', logo: logo47 },
    { id: 4, name: 'ARTHUR', logo: logo28 },
    { id: 5, name: 'Digital College', logo: logo37 },
    { id: 6, name: 'Paris Sante', logo: logo32 },
  ];

  return (
    <div className="py-8 sm:py-16 md:py-15 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl md:text-2xl font-extrabold text-slate-800 mb-3 sm:mb-4">
            Ils nous font confiance
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-slate-600">
            Plus de 20+ entreprises qui nous font confiance
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="flex animate-scroll gap-4 sm:gap-6 md:gap-8">
            {[...customers, ...customers].map((customer, index) => (
              <div
                key={`${customer.id}-${index}`}
                className="flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64 p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:scale-105"
              >
                <div className="flex flex-col items-center">
                  <div className="text-2xl sm:text-3xl md:text-2xl mb-3 sm:mb-4 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                   <img src={customer.logo} alt={customer.name} className="h-12 w-auto object-contain" onError={(e) => { e.currentTarget.src = img1; }} />
                  </div>
                  <span className="text-sm sm:text-base md:text-sm font-medium text-slate-700 text-center">
                    {customer.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-scroll {
          display: flex;
          animation: scroll 20s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .animate-scroll {
            animation: scroll 15s linear infinite;
          }
        }
      `}</style>
    </div>
  );
};

// Hero Component
const Hero = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <>
      <div className="relative overflow-hidden min-h-[600px] sm:min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/30 flex items-center justify-center">

        <div className="container relative z-10 pb-6 sm:mb-2 sm:pb-0 px-4 sm:px-2 h-full w-full">
          <Slider {...settings}>
            {ImageList.map((data) => (
              <div key={data.id} className='w-full object-cover px-2'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center min-h-[500px] sm:min-h-[600px] w-full">
                  <div className="flex flex-col justify-center gap-8 pt-12 lg:p-0 text-center lg:text-left order-2 lg:order-1 relative z-10">
                    <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20 mb-4 self-center lg:self-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      <span className="text-sm font-medium text-slate-600">Inspiring • Solutions </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-400 via-blue-800 to-cyan-500 bg-clip-text text-transparent leading-tight">
                      {data.title}
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
                      {data.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <a href='#'
                        aria-label="En savoir plus"
                        className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-cyan-700 text-white rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                      >
                        <span className="flex items-center space-x-2">
                          <span>En savoir plus</span>
                          <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </span>
                      </a>

                      <a href='/realisations'
                        aria-label="Voir nos réalisations"
                        className="px-8 py-4 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-700 rounded-2xl font-semibold border border-white/20 hover:border-slate-300 transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        Nos réalisations
                      </a>
                    </div>
                  </div>

                {/* Image Section */}
                  <div className="order-1 lg:order-2 relative">
                    <div className="relative group">
                      {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-2xl transform group-hover:scale-110 transition-transform duration-700"></div> */}

                      <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/20">
                        <img
                          src={data.img}
                          alt={data.title}
                          className="w-full h-[200px] sm:h-[300px] lg:h-[400px] object-cover transform group-hover:scale-110 transition-all duration-700"
                          loading="lazy"
                        />
                        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div> */}
                      </div>

                      <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-xl opacity-90 group-hover:scale-110 transition-transform duration-300">
                        <BsStars className="text-3xl text-yellow-400"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                rgba(255, 255, 255, 0.1),
                rgba(255, 255, 255, 0.1) 10px,
                transparent 10px,
                transparent 20px
              )
            `,
            opacity: 0.3,
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto p-6 py-16">
          <div className="text-center space-y-6 flex flex-col">
            <h2 className="text-3xl font-bold">Prêt à transformer vos idées en réalité ?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Découvrez tous nos services et produits pour propulser votre entreprise
            </p>
            <Services />
            <div className="group px-2 py-2 w-max md:w-1/2 place-self-end flex justify-center bg-white text-gray-600 rounded-2xl font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            <a href='/services' className=''
              aria-label="Voir tous les services et produits"  
            >
              <span className="flex items-center space-x-2">
                <span>Tous les services & produits</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300"><IoMdArrowRoundForward /></span>
              </span>
            </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Projects Section */}
      <section aria-labelledby="projects-heading" className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-cyan-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-slate-600">Portfolio</span>
            </div>

            <h2 id="projects-heading" className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-4">
              Nos Réalisations
            </h2>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Découvrez quelques-uns de nos projets les plus marquants et les solutions innovantes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 hover:border-white/40 flex flex-col h-full"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.alt}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 shadow-lg">
                    {project.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-800 transition-colors duration-300 mb-3">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4 flex-1 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium border border-blue-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      aria-label={`Voir plus sur ${project.title}`}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 hover:scale-105"
                      onClick={() => console.log(`View more about ${project.title}`)}
                    >
                      Voir plus
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                rgba(255, 255, 255, 0.05),
                rgba(255, 255, 255, 0.05) 10px,
                transparent 10px,
                transparent 20px
              )
            `,
            opacity: 0.3,
          }}
        ></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-2xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-6 text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
              <span className="text-white/90 text-sm font-medium">Contact</span>
            </div>

            <h2 className="text-[1.8rem] font-bold mb-6">Vous avez des préoccupations ou souhaitez nous rencontrer ?</h2>

            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Notre équipe d'experts est là pour vous accompagner dans tous vos projets technologiques
            </p>

            <button
              aria-label="Nous contacter"
              className="group px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <a href='/contact'
              className="flex items-center space-x-2">
                <span>Nous contacter</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </button>
          </div>
        </div>
      </div>
      {/* Modern Customers Section */}
      <Partenaires />
      <Customers />
      
    </>
  );
};

export default Hero;