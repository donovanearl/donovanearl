import PcBuilder from "../components/PcBuilder";
import React from "react";
import "../styles/Customized_Desktop.css";

export default function Customized_Desktop(){
    return (<div className="pc-builder-container">
        
                <div className="pc-builder-plate">
                    <div className="pc-builder-header-container">
                    <h1 className="pc-builder-header">PC Builder</h1>
                    </div>
                        <PcBuilder/>
                </div>
        </div>)
}