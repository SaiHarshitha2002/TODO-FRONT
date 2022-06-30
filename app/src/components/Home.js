import React from 'react';
import {Link, Outlet} from 'react-router-dom'
import image1 from '../images/Image1.svg'
import image2 from '../images/Corosulimage2.svg'
import image3 from '../images/Corosulimage3.svg'
import image4 from '../images/Corosulimage4.svg'
import image5 from '../images/Corosulimage5.svg'
import image6 from '../images/Corosulimage6.svg'
import image7 from '../images/Corosulimage7.svg'
import { Carousel } from 'react-bootstrap';
function Home() {
  
  return ( 
   <div>
   <div className="container-md mt-3">
     <div className="row Link">
        <div className="col-sm-4" style={{minHeight:"500px"}}>
        <Carousel fade>
          <Carousel.Item interval={3000}>
          <img src={image1} alt="#" className='w-75 ' style={{minHeight:"500px"}} />  
          </Carousel.Item>
          <Carousel.Item interval={3000}>
          <img src={image2} alt="#" className='w-75 ' style={{minHeight:"500px"}} />  
          </Carousel.Item>
          <Carousel.Item interval={3000}>
          <img src={image3} alt="#" className='w-75 ' style={{minHeight:"500px"}} />  
          </Carousel.Item>
          <Carousel.Item interval={3000}>
          <img src={image4} alt="#" className='w-75 ' style={{minHeight:"500px"}} />  
          </Carousel.Item>
          <Carousel.Item interval={3000}>
          <img src={image5} alt="#" className='w-75 ' style={{minHeight:"500px"}} />  
          </Carousel.Item>
          <Carousel.Item interval={3000}>
          <img src={image6} alt="#" className='w-75 ' style={{minHeight:"500px"}} />  
          </Carousel.Item>
          <Carousel.Item interval={3000}>
          <img src={image7} alt="#" className='w-75 ' style={{minHeight:"500px"}} />  
          </Carousel.Item>
        </Carousel>
      
       </div>
       <div className="col-sm-8">
       <div className='border border-5  rounded-pill border-primary'style={{borderColor:'red'}} >
       <ul className="nav mx-auto justify-content-evenly">
  <li className="nav-item border border-white border-3">
    <Link className="nav-link " to="all">All</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link " to="work">Work</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link " to="personal">Personal</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link " to="wishlist" >Wishlists</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link " to="birthdays" >Birthdays</Link>
  </li>
  
</ul>
</div>
<div>
  <Outlet/>
</div>
       </div>
     </div>
     <div className="diaplay-1"></div>
   </div>
     
   </div>)
}

export default Home;
