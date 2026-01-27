import React from "react"
import { Outlet } from "react-router-dom"
import Logo2 from "/src/assets/Logo2.png"
import NavBar from "../components/NavBar"
import { Link } from "react-router-dom"
import { getBaseURL } from "../api";

const MainLayout=()=>{
    return (<div className="App"> 
                <div className="Main-Container">
                    <header className="Header">
                        <img src={Logo2} className="Logo2"/>
                        <div className="Nav-plus">
                            <div className="Nav-sign">
                                <p1>
                                Welcome! {" "}
                                <Link to="/login">Sign In</Link>
                                </p1>
                                <p1>New customer?{" "}
                                <Link to="/register">Sign up here</Link> 
                                </p1>
                               
                            </div>
                            
                            <NavBar/>
                        </div>
                       
                    </header>
                    
                    <div className="Outlet">
                        <Outlet/>
                    </div>
                    <footer>
                        This is the footer
                    </footer>
                </div>
            </div>
    
                
    )
    }

export default MainLayout