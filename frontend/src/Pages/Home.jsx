import React from 'react'
import HowItWorksSection from '../Components/main/HowItWorks'
import HeroSection from '../Components/main/HeroSection'
import MarketSection from '../Components/main/marketSection/MarketSection'
import Navbar from '../Components/Navbar'
import ActiveFreelancers from '../Components/main/ActiveFreelancers'
import Footer from '../Components/Footer'
import TestimonialsSection from '../Components/main/Testimonals'
import PopularCategories from '../Components/main/PopularCategories'
const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <HowItWorksSection/>
        {/* <MarketSection/> */}
        <PopularCategories/>
        <ActiveFreelancers/>
        <TestimonialsSection/>
        <Footer/>
        
         {/* <Footer/> */}
       
    </div>
  )
}

export default Home