import React from 'react'
import image1 from '../../assets/Customers/homme.jpg'
import image2 from '../../assets/Customers/femme.png'
import image3 from '../../assets/Customers/Userx.jpg'
import Slider from "react-slick";

const CustomerList =[
    {id: '',
     img: image1,
     author: "Paddel Junior",
     text: "ATS m'a developper et deployer un logiciel pour mon entreprise et il et vraiment performant" ,   
    },
    {id: '',
     img: image2 ,
     author: "Alicia Grace" ,
      text: "Je suis completement satisfaite des mes serveurs et desktops acheter a ATS" ,     
    },
    {id: '',
     img: image3 ,
     author: "Anonimous"  ,
      text: "Tres bonne entreprise IT" ,   
    },
]

const Customers = () => {
     var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        pauseOnHover: false,
        pauseOnFocus: true,
        responsive: [
      {
        breakpoint: 10000, // large screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024, // small screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640, // medium screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    };
  return (
    <div>
      {/* Header Section*/}
      <div
        className="text-center mb-10
                            max-w-[600px] mx-auto"
      >
        <p className="text-sm text-primary">Ce que nos clients dissent</p>
        <h1 data-aos="fade-up" className="text-3xl font-bold">
          Revues des clints
        </h1>
      </div>
      {/* Card Section */}
      <div data-aos="zoom-in">
        <Slider {...settings}>
          {CustomerList.map((data) => (
            <div className="my-6  ">
              <div
                key={data.id}
                className="flex flex-col gap-4 
                           shadow-lg py-8 px-6 mx-4 rounded-xl
                           bg-blue-300 relative h-[300px]"
              >
                <div>
                  
                  {/* The image section */}
                  <img
                    src={data.img}
                    alt={data.author}
                    className="h-20 w-20 rounded-full mb-4"
                  />
                </div>
                <div className="flex flex-col items-center gap-4">
                  {/* The text section */}
                  <div className="space-y-3">
                    <p className="text-xl text-black">{data.text}</p>
                    <h1 className="text-xl font-bold text-black/80">
                      {data.author}
                    </h1>
                  </div>
                </div>
                {/* The background mark */}
                <p
                  className="text-black/20 text-9xl font-serif
                                 absolute top-0 right-0"
                >
                  ,,
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default Customers