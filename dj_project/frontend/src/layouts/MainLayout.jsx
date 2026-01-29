import React from "react"
import { Outlet } from "react-router-dom"
import Logo2 from "/src/assets/Logo2.png"
import NavBar from "../components/NavBar"
import { Link } from "react-router-dom"
import { getBaseURL } from "../api";
import Footer from "../components/Footer"

const MainLayout=()=>{
    return (<div className="App"> 
                <div className="Main-Container">
                    <header className="Header">
                        <img src={Logo2} className="Logo2"/>
                        <div className="Nav-plus">
                            <div className="Nav-sign">
                                <div className="Nav-sign-in">
                                    <p>
                                      Welcome! {" "}
                                     <Link to="/login">Sign In</Link>
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