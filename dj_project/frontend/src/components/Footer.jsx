import LogoFoot from "/src/assets/Logo1.png"
import Email from "/src/assets/emailfooter.png"
import Phone from "/src/assets/WhatsAppLogo.png"
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
                        PinoyTech.ae@gmail.com
                        </p>

                    </div>
                    <div className="phone-container">
                        <img src={Phone} className="footer-phone"/>
                        <p>
                        050-115-8864
                        </p>
                    </div>
                </div>
                <div className="copyright-container">
                    
                        &copy; 2026 Pinoy-Tech . All rights reserved. Website design by Pinoy-Tech .
                    
                </div>
            
            </div>
}