import React from 'react'
import {Link, useNavigate} from'react-router-dom'

 import search from "../../assests/search-solid.svg"
import {useSelector, useDispatch} from  "react-redux"

 import './Navbar.css'
import { useEffect } from 'react'
import { setCurrentUser } from '../../actions/currentUser'
import decode from 'jwt-decode'


 const Navbar = ({handleSlideIn}) => {
  


 
  const navigate = useNavigate();

  const dispatch= useDispatch()
    var User= useSelector((state) => (state.currentUserReducer));

    useEffect(() => {

      const token = User?.token;
      if (token) {
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          handleLogout();
        }
      }
  

      dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
    },[dispatch]);

    const handleLogout = () => {
      dispatch({ type: "LOGOUT" });
      navigate("/");
      dispatch(setCurrentUser(null));
    };


   return (
    <nav className='main-nav'>
     <div className='navbar'>
      
   
   
       <Link to ="/" className='nav-item nav-btn'>About</Link>
       <Link to ="/" className='nav-item nav-btn'>Products</Link>
       <Link to ="/" className='nav-item nav-btn'>For Teams</Link>
      <form>
        <input type="text" placeholder="Search...." />
        <img src={search} alt="search" className='search-icon' width="18"/>
      </form>
        {User === null ?
            <Link to="/Auth" className='nav-item nav-links'>Log in</Link>:
        <>
 

        <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
        </>
        }
     </div>
     </nav>
   )
 }
 
 export default Navbar
 