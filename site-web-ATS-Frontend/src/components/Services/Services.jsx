import React, { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/services/');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mb-5 mt-3 mx-2">
      {/* Text before the cards */}
      <div>
        <div className="text-center sm:mb-4">
          <h1 className="text-4xl text-blue-950">Nos principaux produits et services</h1>
        </div>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 place-items-center gap-5 sm:p-1">
        {services.map((data) => (
          <div
            key={data.id}
            className="rounded-md shadow-2xl pb-1 hover:scale-105 duration-200"
            data-aos="fade-up"
            data-aos-delay={data.aosDelay || (services.indexOf(data) * 200).toString()}
          >
            <div className=" flex items-center w-full h-[220px] ">
              <img
                src={data.img} // Prepend Django server URL to image path
                alt={data.titre}
                className="hover:scale-105 duration-200 object-cover mb-4 w-full h-full"
              />
            </div>
            <div className="pl-3">
              <h3 className="text-xl font-semibold text-gray-800">{data.titre}</h3>
              <p className="mt-4 text-gray-700 px-2">{data.description}</p>
              <div className="flex justify-end mt-4 mx-4 mb-2">
                <a
                  href="/services"
                  className="rounded-full py-2 px-2 text-[1.2rem] font-semibold text-white text-center bg-gradient-to-br from-blue-800 to-cyan-500 hover:scale-105 transition-all duration-200"
                >
                  En savoir plus
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;