import React from 'react'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Formulaires/Login';
import Register from './components/Formulaires/Register';
import AllServices from './components/Services/AllServices';
import About from './components/About/About';
import Contact from './components/Formulaires/Contact';
import ApplicationForm from './components/Dashboards/applicationForm';
import UserPage from './components/Dashboards/UserPage';
import Dashboard from './components/Dashboards/Dashboard';

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
    <Route path='/about-us' element={<About />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/application-form' element={<ApplicationForm />} />
    <Route path='/user-page' element={<UserPage />} />
    <Route path='/admin' element={<Dashboard />} />
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