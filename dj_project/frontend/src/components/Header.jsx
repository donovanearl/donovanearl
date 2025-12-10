import React from "react" ;
import "../styles/Header.css"
import Logo from "../assets/Logo.png"


function Header(){
    return(
        <div className="header-container">
            <img src={Logo} className="logo-image"/> 
            
        </div>
    )
}

export default Header