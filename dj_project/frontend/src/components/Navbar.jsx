import React from "react";
import "../styles/Navbar.css";
import Logo from "../assets/Logo.png";

function Navbar(){
    return (
        
            <nav className="navbar">
                <ul className="navbar-links">
                <li><b href="/home">Home</b></li>
                <li><b href="/products">Products</b></li>
                <li><b href="/services">Services</b></li>
                <li><b href="/contacts">Contacts</b></li>
                </ul>
            </nav>

        
    
    )
}

export default Navbar