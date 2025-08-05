import React, { useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import img1 from '../../assets/Services/desktops.png'
import img2 from '../../assets/Services/web.png'
import img3 from '../../assets/servers.avif'
import img4 from '../../assets/laptop.avif'
import img5 from '../../assets/monitor.avif'
import Services from './Services'

/* Desktop images */
import desktopImg1 from '../../assets/Services/desktops/gaming.png';
import desktopImg2 from '../../assets/Services/desktops/bureau.png';
import desktopImg3 from '../../assets/Services/desktops/station.png';
import desktopImg4 from '../../assets/Services/desktops/multimedia.png';

/* Logiciel images */
import logicielImg1 from '../../assets/Services/logiciels/logiciel.png';
import logicielImg2 from '../../assets/Services/logiciels/pcApp.png';
import logicielImg3 from '../../assets/Services/logiciels/webApp.png';

/* Serveur images */
import serveurImg1 from '../../assets/Services/serveurs/fichier.png';
import serveurImg2 from '../../assets/Services/serveurs/web.png';
import serveurImg3 from '../../assets/Services/serveurs/message.png';
import serveurImg4 from '../../assets/Services/serveurs/app.png';

/* Laptop images */
import laptopImg1 from '../../assets/Services/laptops/pro.png';
import laptopImg2 from '../../assets/Services/laptops/gaming.png';
import laptopImg3 from '../../assets/Services/laptops/bureau.png';
import laptopImg4 from '../../assets/Services/laptops/leger.png';

/* Moniteur images */
import moniteurImg1 from '../../assets/Services/moniteurs/plat.png';
import moniteurImg2 from '../../assets/Services/moniteurs/curved.png';
import moniteurImg3 from '../../assets/Services/moniteurs/ultraWide.png';
import moniteurImg4 from '../../assets/Services/moniteurs/classic.png';

import { IoMdArrowDropdownCircle } from 'react-icons/io'

const desktopsImages = [desktopImg1, desktopImg2, desktopImg3, desktopImg4];
const logicielsImages = [img2, logicielImg1, logicielImg2, logicielImg3];
const serveursImages = [serveurImg1, serveurImg2, serveurImg3, serveurImg4];
const laptopsImages = [laptopImg1, laptopImg2, laptopImg3, laptopImg4];
const moniteursImages = [moniteurImg1, moniteurImg2, moniteurImg3, moniteurImg4];

const ProductsList = [
  {
    id: 1,
    title: "Desktops",
    img: img1,
    types: ["Gaming PC", "Bureautique", "Station de travail", "PC multimedia"],
    imgList: desktopsImages
  },
  {
    id: 2,
    title: "Logiciels",
    img: img2,
    types: ["Sites web", "Applications mobile", "Applications PC", "Web Apps"],
    imgList: logicielsImages
  },
  {
    id: 3,
    title: "Serveurs",
    img: img3,
    types: ["Serveurs de fichiers", "Web server", "Serveurs de messagerie", "Serveurs d'applications"],
    imgList: serveursImages
  },
  {
    id: 4,
    title: "Laptops",
    img: img4,
    types: ["Professionnel", "Gaming", "Bureautique", "Ultraportable"],
    imgList: laptopsImages
  },
  {
    id: 5,
    title: "Moniteurs",
    img: img5,
    types: ["Plat", "Incurvé", "Ultrawide", "Classique"],
    imgList: moniteursImages
  },
];

const AllServices = () => {
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [listHovered, setListHovered] = useState(false);

  React.useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const isListVisible = hoveredCardId !== null || listHovered;

  return (
    <div className="m-0 sm:p-2 w-full relative">
      <Services />
      <h1 className="text-4xl text-gray-700 text-center mb-8">Tous les Produits et Services</h1>

      {/* Grille des cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 place-items-center">
        {ProductsList.map((data, index) => (
          <div
            key={data.id}
            data-aos="fade-up"
            data-aos-delay={`${index * 100}`}
            className="group rounded-md shadow-2xl pb-4 w-full max-w-[300px] hover:scale-105 duration-200 transition-transform relative"
            onMouseEnter={() => setHoveredCardId(data.id)}
            onMouseLeave={() => !listHovered && setHoveredCardId(null)}
          >
            {/* Image */}
            <div className="h-[160px] w-full flex items-center justify-center my-4">
              <img src={data.img} alt={data.title} className="object-contain max-h-full" />
            </div>

            {/* Titre + icône */}
            <div className="pl-3 flex items-center gap-2">
              <h3 className="text-xl font-semibold text-gray-800">{data.title}</h3>
              <IoMdArrowDropdownCircle className="text-3xl text-blue-500 duration-300 transform group-hover:rotate-180" />
            </div>

            {/* Mobile : liste horizontale interne */}
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

      {/* Desktop : liste globale sous les cartes */}
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
            {ProductsList.find((p) => p.id === hoveredCardId).types.map((type, idx) => (
              <div
                key={idx}
                className="w-40 text-center group hover:bg-gray-700 rounded-md p-2 transition-colors duration-200 cursor-pointer"
              >
                <p className="text-sm font-medium group-hover:text-white text-gray-700">{type}</p>
                <img
                  src={ProductsList.find((p) => p.id === hoveredCardId).imgList[idx]}
                  alt={type}
                  className="mt-2 object-contain h-28 w-full rounded border group-hover:bg-gray-600"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllServices;
