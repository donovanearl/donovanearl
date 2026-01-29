import LogoFoot from "/src/assets/LogoFoot.jpg"
import Email from "/src/assets/email.jpg"
import Phone from "/src/assets/smartphone.jpg"
import "../styles/Footer.css"


export default function Footer(){
    return <div className="footer-container">
                <div className="footer-left-column">
                        <img src={LogoFoot} className="footer-logo"/> 
                        <p>Providing comprehensive IT solutions to keep your devices and business running smoothly.
                        </p>            
                </div>
                <div className="footer-right-column">
                    <div className="header1">
                        Contact Us
                    </div>
                    <div className="email-container">
                        <img src={Email} className="footer-email"/>
                        <p>
                        info@Pinoy-Tech.ae
                        </p>

                    </div>
                    <div className="phone-container">
                        <img src={Phone} className="footer-phone"/>
                        <p>
                        0506791454
                        </p>
                    </div>
                </div>
                <div className="copyright-container">
                    <p>
                        &copy; 2026 Pinoy-Tech . All rights reserved. Website design by <span style={{ fontSize:18,color: '#dd940c', fontWeight:"bold"}}>Pinoy-Tech</span>.
                    </p>
                </div>
            
            </div>
}