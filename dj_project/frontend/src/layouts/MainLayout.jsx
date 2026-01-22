import React from "react"
import { Outlet } from "react-router-dom"
import Logo2 from "/src/assets/Logo2.png"
import NavBar from "../components/NavBar"

const MainLayout=()=>{
    return (<div className="App"> 
                <div className="Main-Container">
                    <header className="Header">
                        <img src={Logo2} className="Logo2"/>
                        <NavBar/>
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