import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
const App = () => {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>
            
      </Router>
  )
}

export default App



// import React from "react"
// import Cloudinary from "./Components/main/Cloudinary"
// const App=()=>{
//   return(
// <div>
//   <Cloudinary/>
// </div>
//   )
// }
// export default App