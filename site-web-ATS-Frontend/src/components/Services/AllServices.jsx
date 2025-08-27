import React, { useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import img1 from '../../assets/Services/desktops.png';
import img2 from '../../assets/Services/web.png';
import img3 from '../../assets/servers.avif';
import img4 from '../../assets/laptop.avif';
import img5 from '../../assets/monitor.avif';
import Services from './Services';

import desktopImg1 from '../../assets/Services/desktops/gaming.png';
import desktopImg2 from '../../assets/Services/desktops/bureau.png';
import desktopImg3 from '../../assets/Services/desktops/station.png';
import desktopImg4 from '../../assets/Services/desktops/multimedia.png';

import logicielImg1 from '../../assets/Services/logiciels/logiciel.png';
import logicielImg2 from '../../assets/Services/logiciels/pcApp.png';
import logicielImg3 from '../../assets/Services/logiciels/webApp.png';

import serveurImg1 from '../../assets/Services/serveurs/fichier.png';
import serveurImg2 from '../../assets/Services/serveurs/web.png';
import serveurImg3 from '../../assets/Services/serveurs/message.png';
import serveurImg4 from '../../assets/Services/serveurs/app.png';

import laptopImg1 from '../../assets/Services/laptops/pro.png';
import laptopImg2 from '../../assets/Services/laptops/gaming.png';
import laptopImg3 from '../../assets/Services/laptops/bureau.png';
import laptopImg4 from '../../assets/Services/laptops/leger.png';

import moniteurImg1 from '../../assets/Services/moniteurs/plat.png';
import moniteurImg2 from '../../assets/Services/moniteurs/curved.png';
import moniteurImg3 from '../../assets/Services/moniteurs/ultraWide.png';
import moniteurImg4 from '../../assets/Services/moniteurs/classic.png';

import { IoMdArrowDropdownCircle } from 'react-icons/io';

const ProductsList = [
  {
    id: 1,
    title: 'Desktops',
    img: img1,
    types: ['Gaming PC', 'Bureautique', 'Station de travail', 'PC multimedia'],
    imgList: [desktopImg1, desktopImg2, desktopImg3, desktopImg4],
    descriptions: [
      "Conçus pour le jeu intensif avec des performances élevées.",
      "Idéal pour le travail de bureau quotidien.",
      "Optimisés pour les tâches lourdes et professionnelles.",
      "Multimédia domestique : vidéos, musique, etc."
    ]
  },
  {
    id: 2,
    title: 'Logiciels',
    img: img2,
    types: ['Sites web', 'Applications mobile', 'Applications PC', 'Web Apps'],
    imgList: [img2, logicielImg1, logicielImg2, logicielImg3],
    descriptions: [
      "Développement de sites vitrines et e-commerce.",
      "Apps Android/iOS sur mesure pour tous usages.",
      "Logiciels de bureau fonctionnels et ergonomiques.",
      "Applications accessibles via navigateur web."
    ]
  },
  {
    id: 3,
    title: 'Serveurs',
    img: img3,
    types: ['Serveurs de fichiers', 'Web server', 'Serveurs de messagerie', "Serveurs d'applications"],
    imgList: [serveurImg1, serveurImg2, serveurImg3, serveurImg4],
    descriptions: [
      "Stockage et partage sécurisé de fichiers.",
      "Hébergement de sites web performants.",
      "Gestion des emails professionnels.",
      "Déploiement d'applications d'entreprise."
    ]
  },
  {
    id: 4,
    title: 'Laptops',
    img: img4,
    types: ['Professionnel', 'Gaming', 'Bureautique', 'Ultraportable'],
    imgList: [laptopImg1, laptopImg2, laptopImg3, laptopImg4],
    descriptions: [
      "Pour les pros : fiabilité et sécurité.",
      "Performance et graphisme pour gamers.",
      "Tâches simples avec efficacité.",
      "Léger et compact pour la mobilité."
    ]
  },
  {
    id: 5,
    title: 'Moniteurs',
    img: img5,
    types: ['Plat', 'Incurvé', 'Ultrawide', 'Classique'],
    imgList: [moniteurImg1, moniteurImg2, moniteurImg3, moniteurImg4],
    descriptions: [
      "Design épuré pour tous les usages.",
      "Expérience immersive avec écran incurvé.",
      "Grand angle pour le multitâche.",
      "Modèles standards abordables."
    ]
  }
];

const AllServices = () => {
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [listHovered, setListHovered] = useState(false);

  React.useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const isListVisible = hoveredCardId !== null || listHovered;

  return (
    <div className="m-0 w-screen relative">
      {/* Banner */}
     <div className="relative w-full h-[250px] sm:h-[450px] flex items-center justify-center overflow-hidden">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-400"></div>
  
  {/* Overlay for glass effect */}
  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

  {/* Content */}
  <div className="relative z-10 text-center px-6 sm:px-12">
    <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg animate-fadeInUp">
      Tous nos services
    </h1>
    <p className="mt-4 text-gray-100 max-w-2xl mx-auto text-sm sm:text-lg md:text-xl leading-relaxed animate-fadeInUp delay-200">
      Depuis plusieurs années, <span className="font-semibold text-cyan-200">ATS</span> fournit des produits de qualité,
      des logiciels performants ainsi que des ordinateurs et serveurs ultra-rapides.
    </p>
  </div>
</div>

      <Services />
      <h1 className="text-4xl text-gray-700 text-center mb-8">Tous les Produits et Services</h1>

      {/* Cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 place-items-center mx-2">
        {ProductsList.map((data, index) => (
          <div
            key={data.id}
            data-aos="fade-up"
            data-aos-delay={`${index * 100}`}
            className="group rounded-md shadow-2xl pb-4 w-full max-w-[300px] hover:scale-105 duration-200 transition-transform relative"
            onMouseEnter={() => setHoveredCardId(data.id)}
            onMouseLeave={() => !listHovered && setHoveredCardId(null)}
          >
            <div className="h-[160px] w-full flex items-center justify-center my-4">
              <img src={data.img} alt={data.title} className="object-contain max-h-full" />
            </div>

            <div className="pl-3 flex items-center gap-2">
              <h3 className="text-xl font-semibold text-gray-800">{data.title}</h3>
              <IoMdArrowDropdownCircle className="text-3xl text-blue-500 duration-300 transform group-hover:rotate-180" />
            </div>

            {/* Mobile seulement */}
            <div className="md:hidden px-3 mt-3">
              <div className="flex gap-4 overflow-x-auto">
                {data.types.map((type, idx) => (
                  <div key={idx} className="flex-shrink-0 w-36 text-center">
                    <p className="text-sm font-medium text-gray-700">{type}</p>
                    <img
                      src={data.imgList[idx]}
                      alt={type}
                      className="mt-2 object-contain h-24 w-full rounded border"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop liste types */}
      {isListVisible && hoveredCardId !== null && (
        <div
          className="hidden md:flex absolute left-0 w-full bg-white rounded shadow-lg border p-4 transition-all duration-300 z-10"
          onMouseEnter={() => setListHovered(true)}
          onMouseLeave={() => {
            setListHovered(false);
            setHoveredCardId(null);
          }}
        >
          <div className="flex gap-6 justify-center flex-wrap w-full">
            {ProductsList.find(p => p.id === hoveredCardId).types.map((type, idx) => (
              <div
                key={idx}
                className="w-48 text-center group hover:bg-gray-700 rounded-md p-2 transition duration-200 cursor-pointer"
              >
                <p className="text-sm font-medium group-hover:text-white text-gray-700">{type}</p>
                <img
                  src={ProductsList.find(p => p.id === hoveredCardId).imgList[idx]}
                  alt={type}
                  className="mt-2 object-contain h-24 w-full rounded border group-hover:bg-gray-600"
                />
                <p className="text-xs text-gray-600 mt-2 group-hover:text-white">
                  {ProductsList.find(p => p.id === hoveredCardId).descriptions[idx]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className='flex backdrop-blur-md flex-col gap-5 sm:gap-12 justify-center items-center p-10 md:p-30 bg-gradient-to-br from-blue-700 to-blue-300 mx-0 mb-15 w-screen h-[200px] mt-25'>
        <h1 className=' text-white text-2xl font-bold font-serif'>
          Vous avez des preoccupations ou souhaitez nous rencontrer?
        </h1 >
        <p>
          <a className='px-4 py-2 bg-white rounded-full text-[1.5rem] text-gray-700 font-semibold hover:bg-blue-500 hover:text-white hover:outline shadow-md'
          href="/contact">Nous contacter</a>
        </p>
      </div>
    </div>
    
  );
};

export default AllServices;
