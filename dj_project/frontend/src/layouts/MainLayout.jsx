import React, { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import Logo1 from "/src/assets/Logo1.png"
import Cart from "/src/assets/Shopcart.svg"
import NavBar from "../components/Navbar.jsx"
import {Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { jwtDecode } from "jwt-decode"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import api from "../api"
import bg from "/src/assets/BackgroundPC.jpg"




const MainLayout=()=>{
    const navigate=useNavigate()
    const cart_click= ()=>{navigate("/cart")}
    const token = localStorage.getItem(ACCESS_TOKEN)
    let decoded = null  
        try {
            if (token) {
                decoded = jwtDecode(token)
            }
        } catch (error) {
            console.error("Invalid token found on refresh:", error)
            // If the token is corrupted or malformed, clear it out
            localStorage.removeItem(ACCESS_TOKEN)
        }


    const isExpired= decoded ? decoded.exp*1000<=Date.now():true
    const user= isExpired ? null: decoded

    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        if (!user) {
            setCartCount(0)
            return
        }

        const fetchCartCount = async () => {
            try {
                const res = await api.get('/api/cart/items/')
                const total = res.data.reduce((sum, item) => sum + item.quantity, 0)
                setCartCount(total)
            } catch (error) {
                console.log("Error fetching cart count", error)
            }
        }

        fetchCartCount()
        window.addEventListener("cart-updated", fetchCartCount)
        return () => window.removeEventListener("cart-updated", fetchCartCount)
    }, [user])

    
    const logout = ()=> {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        navigate("/")
    }
      const navItems = [
        { label: "Home", to: "/" },
        { label: "Products", children: [
            { label: "Laptops", to: "/products/laptops" },
            { label: "Custom-PC", to: "/products/customized-desktop" },
        ]},
        { label: "Services", children: [
            {label: "Hardware", to: "/services/hardware"},
            {label: "Software", to: "/services/software"}
        ]},
        { label: "Contacts", to: "/contacts" },
        ];
    
    console.log("User:",user)
    // console.log("Time-now: ",timeNow)
  
    
    return (<div className="App">
            <div className="page-bg">
                <div className="Main-Container">
                    <header className="page-Header">
                        <img src={Logo1} className="Logo1"/>
                        
                        <div className="Nav-plus">
                            <div className="customer">
                                    <button onClick={cart_click} className="Shopcartbutton">
                                        <div className="cart-icon-wrapper">
                                            <img src={Cart} alt="Shopcart" className="Shopcartimg"/>
                                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                                        </div>
                                    </button>
                                    <div className="Nav-sign">
                                        <div className="Nav-sign-in">
                                            <p>
                                            Welcome! {" "}{user? (<><Link to="/profile">{user.username}</Link>{" "}{" "}<button onClick={logout}>logout</button></>):(<Link to="/login">Sign In</Link>)}
                                            </p>
                                        </div>
                                        <p>New customer?{" "}
                                        <Link to="/register">Sign up here</Link> 
                                        </p>
                                </div>
                            </div>
                            {/* <NavList items={navItems}/> */}
                            <NavBar/>
                            </div>
                       
                    </header>
                    
                    <div className="Outlet">
                        <Outlet/>
                    </div>
                    <Footer/>
                </div>
                </div>
            </div>
    )
    }

export default MainLayout