import React from 'react'
import img1 from '../../assets/IT.png'
import {
  IoMdBulb,        // Innovation (light bulb)
  IoMdThumbsUp,    // Engagement (thumbs-up)
  IoMdEye,         // Transparence (eye)
  IoMdRibbon,      // Qualité (ribbon/award)
  IoMdPeople       // Respect (people)
} from 'react-icons/io'


const About = () => {
  return (
    <div className='mb-12'>
      {/* Banner with blurred background */}
      <div className='relative w-full h-96 overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover bg-center blur-[7px]'
          style={{ backgroundImage: `url(${img1})` }}
        />
        <div className='relative z-10 flex flex-col gap-4 items-center justify-center h-full px-6 text-center'>
          <h1 className='text-4xl text-white font-bold drop-shadow-lg'>
            À propos de African Technologies Solution (ATS)
          </h1>
          <p className='text-xl text-gray-900 max-w-3xl'>
            Une entreprise spécialisée dans la fourniture de solutions numériques pour les PME et les grandes entreprises
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className='flex justify-center mt-10 px-4'>
        <div className='max-w-5xl space-y-10 text-gray-700'>
          
          {/* Présentation */}
          <section>
            <h2 className='text-3xl font-semibold mb-6 text-center'>Présentation de l'entreprise</h2>
            <p className='mb-4 text-lg leading-relaxed'>
              African Technologies Solutions (ATS) est une entreprise spécialisée dans la fourniture de solutions numériques adaptées aux besoins des PME et des grandes entreprises.
            </p>
            <p className='mb-4 text-lg leading-relaxed'>
              Forte d'une expertise en développement d'applications, ATS accompagne ses clients dans la conception, la maintenance et l’optimisation de leurs systèmes informatiques.
            </p>
            <p className='mb-4 text-lg leading-relaxed'>
              L'entreprise propose également des services de conseil en technologies innovantes et en cybersécurité afin de garantir la protection et la performance des infrastructures digitales.
            </p>
            <p className='text-lg leading-relaxed'>
              Son engagement est d'offrir des solutions sur mesure pour faciliter la transformation digitale et améliorer la compétitivité de ses partenaires.
            </p>
          </section>

          {/* Notre Vision */}
          <section>
            <h2 className='text-2xl font-semibold mb-4'>Notre Vision</h2>
            <p className='text-lg leading-relaxed'>
              Être un leader reconnu dans le domaine des solutions numériques en Afrique, en accompagnant les entreprises vers une transformation digitale réussie, durable et innovante.
            </p>
          </section>

          {/* Notre Mission */}
          <section>
            <h2 className='text-2xl font-semibold mb-4'>Notre Mission</h2>
            <p className='text-lg leading-relaxed'>
              Fournir des solutions technologiques personnalisées et performantes, tout en assurant un service client de qualité, pour aider nos partenaires à atteindre leurs objectifs stratégiques.
            </p>
          </section>

<div
  className="
    relative
    flex
    flex-col
    items-center
    justify-center
    gap-6
    px-6
    py-10
    bg-gradient-to-br from-blue-700 to-blue-300
    backdrop-blur-md
    w-full
    max-w-5xl
    mx-auto
    mt-12
    mb-12
    rounded-xl
  "
>
  <h2 className="text-2xl font-bold text-white text-center">
    Vous avez des préoccupations ou souhaitez nous rencontrer ?
  </h2>
  <a
    href="/contact"
    className="
      inline-block
px-4 py-2 bg-white rounded-full text-[1.5rem] text-gray-700 font-semibold hover:bg-blue-500 hover:text-white hover:outline  shadow-md
      transition
      duration-200
    "
  >
    Nous contacter
  </a>
</div>

          {/* Nos Valeurs */}

<section>
  <h2 className="text-2xl font-semibold mb-6 text-center">Nos Valeurs</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {/* Innovation */}
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:scale-105 duration-200">
      <IoMdBulb className="text-indigo-600 mb-4" size={48} />
      <h3 className="text-xl font-semibold mb-2">Innovation</h3>
      <p className="text-gray-600">
        Toujours à la pointe des technologies pour proposer des solutions modernes et efficaces.
      </p>
    </div>

    {/* Engagement */}
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:scale-105 duration-200">
      <IoMdThumbsUp className="text-green-600 mb-4" size={48} />
      <h3 className="text-xl font-semibold mb-2">Engagement</h3>
      <p className="text-gray-600">
        Une implication totale pour la réussite des projets de nos clients.
      </p>
    </div>

    {/* Transparence */}
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:scale-105 duration-200">
      <IoMdEye className="text-yellow-500 mb-4" size={48} />
      <h3 className="text-xl font-semibold mb-2">Transparence</h3>
      <p className="text-gray-600">
        Communication claire et honnête dans toutes nos collaborations.
      </p>
    </div>

    {/* Qualité */}
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:scale-105 duration-200">
      <IoMdRibbon className="text-red-600 mb-4" size={48} />
      <h3 className="text-xl font-semibold mb-2">Qualité</h3>
      <p className="text-gray-600">
        Des standards élevés pour garantir des résultats fiables et durables.
      </p>
    </div>

    {/* Respect */}
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:scale-105 duration-200">
      <IoMdPeople className="text-purple-600 mb-4" size={48} />
      <h3 className="text-xl font-semibold mb-2">Respect</h3>
      <p className="text-gray-600">
        Valoriser les relations humaines, la diversité et l'éthique professionnelle.
      </p>
    </div>
  </div>
</section>



        </div>
      </div>
    </div>
  )
}

export default About
