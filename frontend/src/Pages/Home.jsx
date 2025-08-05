import React from 'react'
import HowItWorksSection from '../Components/main/HowItWorks'
import HeroSection from '../Components/main/HeroSection'
import Navbar from '../Components/main/Navbar'
import MarketSection from '../Components/main/marketSection/MarketSection'
import ActiveFreelancers from '../Components/main/ActiveFreelancers'
import Footer from '../Components/main/Footer'
import TestimonialsSection from '../Components/main/Testimonals'
const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <HowItWorksSection/>
        <MarketSection/>
        <ActiveFreelancers/>
        <TestimonialsSection/>
        <Footer/>
        
         {/* <Footer/> */}
       
    </div>
  )
}

export default Home