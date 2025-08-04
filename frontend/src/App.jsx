// import React from 'react'
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Home from './Pages/Home';
// import cloudinary from './Components/main/cloudinary';

// const App = () => {
//   return (
//       <Router>
//         <Routes>
//             <Route path="/" element={<Home/>}/>
//             <Route path="/clodinary" element={<cloudinary/>}/>
//         </Routes>
            
//       </Router>
//   )
// }

// export default App



import React from "react"
import Cloudinary from "./Components/main/Cloudinary"
const App=()=>{
  return(
<div>
  <Cloudinary/>
</div>
  )
}
export default App