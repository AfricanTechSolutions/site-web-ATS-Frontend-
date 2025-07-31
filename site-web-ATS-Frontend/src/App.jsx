import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import AOS from 'aos'
import 'aos/dist/aos.css'

const App = () => {
 React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-out',
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div>
      <Navbar/>
      <Hero/>
    </div>
  )
}

export default App