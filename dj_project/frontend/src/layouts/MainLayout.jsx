import React from "react"
import {Outlet} from "react-router-dom"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import "../styles/MainLayout.css"


export default function MainLayout(){
    return(
    <div className="main-container">
        <Header/>
        <Navbar/>
        <div className="hero-container">
            <Outlet/>
        </div>
          <div className="footer">
            &copy; 2025 All Rights Reserved, Pinoy-Tech
        </div>
    </div>
    )

}
