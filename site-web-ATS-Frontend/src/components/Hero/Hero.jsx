import React from 'react'
import Slider from 'react-slick'
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