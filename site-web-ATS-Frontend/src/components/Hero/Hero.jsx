import React from 'react'
import Slider from 'react-slick'
import img1 from '../../assets/Realisations/hospital.png';
import img2 from'../../assets/Realisations/ecommerce.jpg';
import img3 from '../../assets/Realisations/siteVitrine.jpg';
import img4 from '../../assets/Realisations/analytics.jpg';
import img5 from '../../assets/Realisations/RH.jpg';
import img6 from '../../assets/Realisations/microservices.jpg';
import image1 from '../../assets/softwares.png'
import image2 from '../../assets/coder.png'
import image3 from '../../assets/laptop.avif'
import Services from '../Services/Services'
import Customers from '../Customers/Customers'

const ImageList = [
  {
    id: 1,
    img: image1,
    title: "Nous développons des logiciels pour vous.",
    description:
      ""
  },
  {
    id: 2,
    img: image2,
    title: "Des developpeurs experimentes",
    description:
    "",
  },
  {
    id: 3,
    img: image3,
    title: "Achetez vos ordinateurs chez nous",
    description:
    "",
  }
]

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

const Hero = () => {

    var settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        pauseOnHover: false,
        pauseOnFocus: true,
    };

  return (
    <>
      <div className='relative overflow-hidden
                      min-h-[550px] sm:min-h-[650px]
                      flex items-center
                      justify-center'>
          {/* Background Pattern */}
          <div className='h-[700px] w-[700px] bg-blue-500
                    absolute rounded-3xl rotate-45 -z-9
                    -top-1/2 right-0 border-50 border-blue-300'>

          </div>
          {/* Hero Section */}
          <div className='container pb-8 sm:pb-0 shadow-md'>
              <Slider {...settings}>
                  {ImageList.map((data) => (
                      <div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 '>
                      {/* Text content section */}
                      <div className='flex flex-col justify-center gap-4 pt-12 sm:p-0 text-center sm:text-left
                      order-2 sm:order-1 relative z-10 '>
                          <h1 data-aos="zoom-out"
                          data-duration="500"
                          data-aos-once="true"
                          className='text-5xl sm:text-6xl text-gray-800 
                                        lg:text-7xl font-bold'>{data.title}</h1>
                          <p data-aos="fade-up"
                            data-duration="500"
                            data-aos-delay="100"
                          className='text-sm'>
                              {data.description}
                          </p>
                          <div data-aos="fade-up"
                            data-duration="500"
                            data-aos-delay="300"
                          >
                              <button className='bg-gradient-to-r from-blue-700 to-blue-300
                                                  hover:scale-105 duration-200
                                                  px-4 py-2 rounded-full shadow-md text-white'
                              >En savoir plus</button>
                          </div>
                      </div>
                      {/* Image section */}
                      <div className='order-1 sm:order-2
                                      relative '>
                          <div>
                              <img src={data.img} alt={data.title}
                                className='h-[300px] w-[300px] 
                                            sm:h-[450px] sm:w-[450px]
                                            sm:scale-125 object-contain 
                                            mx-auto lg:scale-120 z-10' />
                          </div>
                      </div>
                  </div>
              </div>
                  )
              )}
                  
              </Slider>
              
          </div>
      </div>    
      <Services/>

<section aria-labelledby="projects-heading" className='mx-2 my-6'>
          <h2 id="projects-heading" className="text-3xl my-3 text-center font-semibold text-gray-800">
            Nos realisations
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
                    className="w-full h-full object-cover hover:scale-105 duration-200"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-1">{p.description}</p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <a
                        href='/realisations'
                        className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full border border-gray-200 hover:shadow"
                      >
                        Voir
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

      <Customers/>
            <div className='flex backdrop-blur-md flex-col gap-12 justify-center items-center p-10 md:p-30 bg-gradient-to-br from-blue-700 to-blue-300 mx-0 mb-15 w-screen h-[200px] mt-25'>
        <h1 className=' text-white text-2xl font-bold font-serif'>
          Vous avez des preoccupations ou souhaitez nous rencontrer?
        </h1 >
        <p>
          <a className='px-4 py-2 bg-white rounded-full text-[1.5rem] text-gray-700 font-semibold hover:bg-blue-500 hover:text-white hover:outline duration-200 shadow-md'
          href="/contact">Nous contacter</a>
        </p>
      </div>
    </>

  )
}

export default Hero