import React from 'react'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Formulaires/Login';
import Register from './components/Formulaires/Register';
import AllServices from './components/Services/AllServices';

const MesRoutes = () => {
  return (
    <>
    <Router>
      <Navbar/>
    <Routes>
    <Route path='/' element={<Hero />}/>
    <Route path='/*' element={ <h1 className='text-9xl w-full h-full text-center'>Page Not found</h1> }/>
    <Route path='/login' element={<Login />} /> 
    <Route path='/register' element={<Register />} />
    <Route path='/services' element={<AllServices />} />
      {/* <Navbar/>
      <Hero/>
      <Services/>
      <Customers/>*/}
    </Routes>
    <Footer/> 
    </Router>    
    </>

  )
}

export default MesRoutes