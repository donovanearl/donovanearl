import PcBuilder from "../components/PcBuilder";
import React from "react";
import "../styles/Customized_Desktop.css";


export default function Customized_Desktop(){
    return (<div className="pc-builder-container">
        
                <div className="pc-builder-plate">
                    <div className="header-container">
                    <h1 className="pc-builder-header">PC Estimator</h1>
                    </div>
                        <div className="pcbuilder-component">
                            <PcBuilder/>
                        </div>
                            
                        <button className="pc-builder-booking-btn" onClick={""}>Book a Consultation</button>
                </div>
        </div>)
}