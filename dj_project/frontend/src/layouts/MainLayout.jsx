import React from "react"
import { Outlet } from "react-router-dom"
import Logo2 from "/src/assets/Logo2.png"
import Cart from "/src/assets/Shopcart.svg"
import NavBar from "../components/Navbar.jsx"
import {Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { jwtDecode } from "jwt-decode"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"




const MainLayout=()=>{
    const navigate=useNavigate()
    const cart_click= ()=>{navigate("/cart")}
    const token = localStorage.getItem(ACCESS_TOKEN)
    const decoded = token ? jwtDecode(token) : null
    const isExpired= decoded ? decoded.exp*1000<=Date.now():true
    const user= isExpired ? null: decoded

    
    const logout = ()=> {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        navigate("/")
    }
    
    console.log("User:",user)
    // console.log("Time-now: ",timeNow)
  
    
    return (<div className="App"> 
                <div className="Main-Container">
                    <header className="Header">
                        <img src={Logo2} className="Logo2"/>
                        
                        <div className="Nav-plus">
                            <button onClick={cart_click} className="Shopcartbutton">
                                <img src={Cart} alt="Shopcart" className="Shopcartimg"/>
                            </button>
                            <div className="Nav-sign">
                                <div className="Nav-sign-in">
                                    <p>
                                      Welcome! {" "}{user? (<>{user.username} <button onClick={logout}>logout</button></>):(<Link to="/login">Sign In</Link>)}
                                    </p>
                                </div>
                    
                                <p>New customer?{" "}
                                <Link to="/register">Sign up here</Link> 
                                </p>
                               
                            </div>
                                <NavBar/>
                            </div>
                       
                    </header>
                    
                    <div className="Outlet">
                        <Outlet/>
                    </div>
                    <Footer/>
                </div>
            </div>
         
    )
    }

export default MainLayout