
import "../styles/index.css"
import "../styles/Home.css"
import HeroImage from "../assets/HeroSection.jpg"
import LandingPageContents from "../components/LandingPageContents"



function Home(){
    let head1="Computer & IT Support Made Easy"
    let head2="Fast. Reliable. Right at Your Doorstep."
    let par1="Slow laptop? PC won't turn on? Need upgrades or IT support?Pinoy-Tech provides computer repair and IT services anywhere in Fujairah—so you don't have to go out to find help. Serving Fujairah since 2016, we deliver affordable, dependable solutions backed by our No Fix - No Pay guarantee."
    let btn_book="👉 Book Your Service Today"
    return (
        
        <div className="contents-container">
          <title>Home</title>
     
            <div className="contents-sub-container">
                <h1>
                {head1}
                </h1>
                <h2>
                    {head2}
                </h2>
                <p>
                    {par1}
                </p>
                <div className="cta-cards">
                    <button className="contact-button">👉 Get Your Computer Fixed Today</button>
                    <LandingPageContents/>
                </div>
                

            </div>
         
          
        </div> 
    )
}
export default Home