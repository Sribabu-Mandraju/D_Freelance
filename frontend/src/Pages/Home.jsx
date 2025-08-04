import React from 'react'
import HowItWorksSection from '../Components/main/HowItWorks'
import HeroSection from '../Components/main/HeroSection'
import Navbar from '../Components/main/Navbar'
import MarketSection from '../Components/main/marketSection/MarketSection'
import ActiveFreelancers from '../Components/main/ActiveFreelancers'
const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <MarketSection/>
        <ActiveFreelancers/>
        <HowItWorksSection/>
    </div>
  )
}

export default Home