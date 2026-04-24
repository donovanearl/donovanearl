import React from "react"
import { Outlet } from "react-router-dom"
import Logo2 from "/src/assets/Logo2.png"
import Cart from "/src/assets/Shopcart.svg"
import NavBar from "../components/NavBar"
import {Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getBaseURL } from "../api";
import Footer from "../components/Footer"
import { jwtDecode } from "jwt-decode"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import { removeItem } from "framer-motion"


const MainLayout=()=>{
    const navigate=useNavigate()
    const cart_click= ()=>{navigate("/cart")}
    const token = localStorage.getItem(ACCESS_TOKEN)
    const user = token ? jwtDecode(token) : null
    const logout = ()=> {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        navigate("/login")
    }
    console.log(user)

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