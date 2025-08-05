import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Footer from './Pages/Footer';
const App = () => {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/footer" element={<Footer/>}/> 
        </Routes>
            
      </Router>
  )
}

export default App