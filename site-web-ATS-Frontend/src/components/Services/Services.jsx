import React from 'react'
import img1 from '../../assets/desktops.avif'
import img2 from '../../assets/softwares.png'
import img3 from '../../assets/servers.avif'
import img4 from '../../assets/laptop.avif'
import img5 from '../../assets/monitor.avif'

const ProductsList = [
    { id: 1,
      title: "Desktops",
      img: img1 ,
      description: "Trouvez des desktops ultra performants pour le travail",
      aosDelay: "0",  
     },
     { id: 2,
      title: "Logiciels",
      img: img2 ,
      description: "Des logiciels pour des petites et moyennes entreprise",
      aosDelay: "200",  
     },
     { id: 3,
      title: "serveurs",
      img: img3 ,
      description: "Des serveurs Rapides avec un grand espace de stockage",
      aosDelay: "400",  
     },
     { id: 4,
      title: "Laptops",
      img: img4 ,
      description: "Laptops hautes gammes pour le travail ou pour le divertissement",
      aosDelay: "600"  
     },
     { id: 5,
      title: "Moniteurs",
      img: img5 ,
      description: "Differentes dimension d'ecrans pour vos ordinateurs",
      aosDelay: "800",  
     },
]

const Services = () => {
  return (
    <div className='mb-5 mt-3 mx-2'>
        {/* Text before the cards */}
        <div>
            <div className='text-center sm:mb-4 '>
                <h1 className='text-4xl text-blue-950'>Nos principaux produits et services</h1>
            </div>
        </div>
        {/* Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-3  lg:grid-cols-5 
                                place-items-center gap-5
                                sm:p-1 '>
            {
                ProductsList.map((data) => (
                    <div key={data.id}
                        className='rounded-md shadow-2xl 
                                   pb-1 max-w-[400px] 
                                   hover:scale-105 duration-200'
                    >
                     <div className='h-[200px] w-[220px] flex items-center'>   
                        <img src={data.img} alt={data.title} 
                            className='hover:scale-105 duration-200
                                        object-cover mb-4'
                        />
                        </div>
                        <div className='pl-3'>
                           <h3 className='text-xl font-semibold text-gray-800'
                           > {data.title}</h3>
                           <p className='mt-4  text-gray-700 px-2'>
                            {data.description}
                           </p>
                           <div className='flex justify-end mt-4 mx-4 mb-2'>
                <a href="/services" className='rounded-full py-2 px-2 text-[1.2rem] font-semibold text-white text-center bg-gradient-to-br from-blue-800 to-cyan-500 hover:scale-105 transition-all duration-200'
                >En savoir plus</a>
            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Services