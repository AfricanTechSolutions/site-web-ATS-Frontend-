import React from 'react'
import {
  IoMdBulb, IoMdThumbsUp, IoMdEye, IoMdRibbon, IoMdPeople
} from 'react-icons/io'

const About = () => {
  return (
    <div className="mb-16">

      {/* Hero Banner */}
      <div className="relative w-full h-[400px] sm:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1531497865144-0464ef8fb9a1?auto=format&fit=crop&w=1600&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-800/60 to-black/70"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-10 shadow-2xl max-w-3xl">
            <h1 className="text-2xl sm:text-4xl md:text-5xl text-white font-extrabold">
              À propos de <span className="text-cyan-300">African Technologies Solution (ATS)</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
              Une entreprise innovante spécialisée dans la fourniture de solutions numériques pour les PME et grandes entreprises.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex justify-center mt-16 px-4">
        <div className="max-w-6xl space-y-20 text-gray-700">

          {/* Présentation */}
          <section className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-6">
                Présentation de l'entreprise
                <span className="block w-24 h-1 bg-cyan-500 mt-2 rounded-full"></span>
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                ATS est une entreprise d'ingénierie informatique créée en <b>2015</b> sous l'appellation <b>STC</b>. 
                Elle est devenue <b>ATS Sarl</b> en <b>2018</b> afin d’étendre ses activités en Afrique centrale.
              </p>
              <p className="text-lg leading-relaxed">
                Aujourd'hui, ATS couvre les besoins en <b>développement applicatif</b>, <b>infrastructures IT</b>, 
                <b> sécurité informatique</b>, <b>visioconférence</b>, <b>téléphonie IP</b> et plus encore.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
              alt="Équipe ATS en collaboration"
              className="rounded-2xl shadow-lg"
            />
          </section>

          {/* Vision */}
          <section className="grid md:grid-cols-2 gap-10 items-center">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80"
              alt="Vision digitale"
              className="rounded-2xl shadow-lg order-2 md:order-1"
            />
            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-semibold mb-4">Notre Vision</h2>
              <p className="text-lg leading-relaxed">
                Être un leader reconnu dans le domaine des solutions numériques en Afrique, 
                en accompagnant les entreprises vers une transformation digitale réussie, durable et innovante.
              </p>
            </div>
          </section>

          {/* Mission */}
          <section className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Notre Mission</h2>
              <p className="text-lg leading-relaxed">
                Fournir des solutions technologiques personnalisées et performantes, 
                tout en assurant un service client de qualité, 
                pour aider nos partenaires à atteindre leurs objectifs stratégiques.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
              alt="Accompagnement client"
              className="rounded-2xl shadow-lg"
            />
          </section>

          {/* CTA */}
          <div className="relative flex flex-col items-center justify-center gap-6 px-6 py-12 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl shadow-xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Vous avez des préoccupations ou souhaitez nous rencontrer ?
            </h2>
            <a
              href="/contact"
              className="px-6 py-3 bg-white rounded-full text-lg text-gray-800 font-semibold hover:bg-blue-500 hover:text-white shadow-lg transition-transform transform hover:scale-105"
            >
              Nous contacter
            </a>
          </div>

          {/* Valeurs */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Nos Valeurs
              <span className="block w-16 h-1 bg-cyan-500 mx-auto mt-2 rounded-full"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { icon: IoMdBulb, color: "text-indigo-600", title: "Innovation", text: "Toujours à la pointe des technologies." },
                { icon: IoMdThumbsUp, color: "text-green-600", title: "Engagement", text: "Une implication totale pour nos clients." },
                { icon: IoMdEye, color: "text-yellow-500", title: "Transparence", text: "Communication claire et honnête." },
                { icon: IoMdRibbon, color: "text-red-600", title: "Qualité", text: "Des standards élevés et fiables." },
                { icon: IoMdPeople, color: "text-purple-600", title: "Respect", text: "Valoriser les relations humaines." },
              ].map((val, i) => (
                <div
                  key={i}
                  className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                >
                  <val.icon className={`${val.color} mb-4`} size={56} />
                  <h3 className="text-xl font-semibold mb-2">{val.title}</h3>
                  <p className="text-gray-600">{val.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About
