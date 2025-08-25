import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import image1 from '../../assets/Customers/homme.jpg'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Customers = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemoignages = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/temoignages/');
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        setTestimonials(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTemoignages();
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    pauseOnHover: false,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading testimonials...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      {/* Header Section */}
      <div className="text-center mb-12 max-w-[600px] mx-auto">
        <p className="text-sm text-blue-600 font-semibold">Ce que nos clients disent</p>
        <h1 data-aos="fade-up" className="text-3xl md:text-4xl font-bold mt-2 text-gray-800">
          Témoignages
        </h1>
      </div>
      {/* Card Section */}
      <div data-aos="zoom-in" className="px-4">
        <Slider {...settings}>
          {testimonials.length > 0 ? (
            testimonials.map((data) => (
              <div className="my-6 px-2" key={data.id}>
                <div
                  className="flex flex-col gap-4 shadow-md py-8 px-6 mx-auto rounded-xl bg-white hover:bg-blue-50 transition-colors duration-300 relative min-h-[280px] max-w-[360px]"
                >
                  <div className="flex justify-center">
                    {/* The image section */}
                    <img
                      src={data.img ? data.img : image1}
                      alt={data.nom? data.nom : 'Anonymous'}
                      className="h-16 w-16 rounded-full mb-4 object-cover border-2 border-blue-200"
                      onError={(e) => { e.target.src = '/path/to/default/image.jpg'; }}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4 text-center">
                    {/* The text section */}
                    <div className="space-y-3">
                      <p className="text-base text-gray-700 leading-relaxed line-clamp-4">
                        {data.description}
                      </p>
                      <h1 className="text-lg font-semibold text-gray-800">
                        {data.nom? data.nom : 'Anonymous'}
                      </h1>
                    </div>
                  </div>
                  {/* The background mark */}
                  <p className="text-gray-200 text-7xl font-serif absolute top-2 right-4 select-none">
                    ,,
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-600">
              No testimonials available.
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default Customers;