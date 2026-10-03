import PcBuilder from "../components/PcBuilder";
import React from "react";
import { useState } from "react";
import "../styles/Customized_Desktop.css";
import BookAppointmentModal from "../components/BookAppointmentModal";


export default function Customized_Desktop(){
    const [isOpen, setIsOpen] = useState(false);

    return (<div className="pc-builder-container">
                 <BookAppointmentModal
                                        isOpen={isOpen}
                                        onClose={() => setIsOpen(false)}
                                        defaultService="Customized PC Build"
                                    />
        
                <div className="pc-builder-plate">
                    <div className="header-container">
                         <div className="hardware-header">
                            PC Estimator
                    </div>
                    </div>
                        <div className="pcbuilder-component">
                            <PcBuilder/>
                        </div>
                            
                        <button className="booking-btn" onClick={()=>setIsOpen(true)}>Book a Consultation</button>
                </div>
        </div>)
}