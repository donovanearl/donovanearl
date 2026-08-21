
import "../styles/index.css"
import "../styles/Home.css"
import HeroImage from "../assets/HeroSection.jpg"
import LandingPageContents from "../components/LandingPageContents"
import { useNavigate } from "react-router-dom"



function Home(){
    let head1="Computer & IT Support Made Easy"
    let head2="Fast. Reliable. By Appointment."
    let par1="Slow laptop? PC won't turn on? Need upgrades or IT support?"
    let par2="Book an appointment and meet us at a convenient location for a consultation, pickup, or drop-off."
    let par3="Serving Fujairah since 2016, Pinoy-Tech provides dependable computer repair, upgrades, networking, and IT solutions." 
    let btn_book="👉 Book an Appointment"
    const navigate= useNavigate()
    
    return (
        
        <div className="contents-container">
          <title>Home</title>
     
            <div className="contents-sub-container">
                <div className="header-container">
                    <div className="home-header">
                        {head1}
                    </div>
                    <div className="home-header2">
                        {head2}
                    </div>
                    
                    
                </div>
                <div className="cta-cards">
                    <button onClick={()=>navigate("/contacts")} className="contact-button">{btn_book}</button>
                    <div className="home-par1-text">
                        {par1}
                    </div>
                     <div className="home-par2-text">     
                        {par2}<br/>
                    
                    </div>
                    <div className="home-par3-text">
                        {par3}<br/>
                        
                    </div>
                    
                    <LandingPageContents/>
                </div>
                

            </div>
         
          
        </div> 
    )
}
export default Home