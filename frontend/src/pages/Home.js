import React from 'react'
import Navbar from '../component/Navbar'
import './home.css'
import { Link } from 'react-router-dom';
import foodimage1 from '../assets/image1.jpg'; 
export default function Home() {
  return (
    <div><Navbar/>
    
    <div className='mm1'>
      Welcome to Food Heaven Where 
      <p>Flavor Meets Excellence!
      </p>
      <p>
        <button className='btn2' ><Link to="/fooditem" style={{ textDecoration: "none", color: "inherit" }}>
    View FoodItem
  </Link></button></p>

     <div className="food-image-container">
          <img 
            src={foodimage1} 
            alt="Delicious Food"
            className="food-image"
            height={'600px'}
          />
        </div>

    </div>
    
    
    </div>
   

  )
}
