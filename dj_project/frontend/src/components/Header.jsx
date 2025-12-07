import React from "react" ;
import "../styles/Header.css"
import Logo from "../assets/Logo.png"
import Navbar from "./Navbar";

function Header(){
    return(
        <div className="header-container">
            <img src={Logo} className="logo-image"/>
            <Navbar/>
        </div>
    )
}

export default Header