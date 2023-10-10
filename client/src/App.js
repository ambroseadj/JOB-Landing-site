import Navbar from './components/Navbar/Navbar'
import AllRoutes from './AllRoutes.jsx'
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'

import { useEffect, useState } from 'react'



function App() {
const [slideIn,setSlideIn]= useState(false);

  
  

const handleSlideIn= () =>{
  setSlideIn(true)
}

  return (
    <div className="App">
      <Router>
        <Navbar handleSlideIn={handleSlideIn}/>

        
        <AllRoutes/>
      
        
    </Router>
    </div>
     
  )
}

export default App;
