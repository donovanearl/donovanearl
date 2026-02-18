import React from "react"
import LaptopCards from "../components/LaptopsCards"
import "../styles/Laptops.css"
import MarketingBanner from "../components/MarketingBanner"

export default function Laptops(){
    return (<div className="laptops-page-container">
        <div className="marketing-banner-container">
            <MarketingBanner/>
        </div>
        <LaptopCards/>
        
    </div>
        
    )
}