import React from "react";
import "../styles/Contents.css"


function Contents(){
    let title="Asus ROG Hyperion GR701 BTF Edition Tower E-ATX Gaming Case - Black | 90DC00F0-B39020 X-TRA"
    let description="The ROG Hyperion GR701 BTF Edition brings an X factor in both form and function that builders around the world have been craving. With support for dual 420 mm radiators, towering video cards, a fully integrated 2-way aluminum graphics card holder, 60-watt device charging and dual front USB-C connectors for compatible ROG motherboards, it is truly a PC chassis in the coveted ROG style."

    return (
    <div className="contents-container">
        <div className="text-container">
            <div className="products-title"> {title}</div>
            <div className="products-description">{description}</div>
        </div>
        <div className="products-img-container">
            <img src="/src/assets/products-img.jpg" className="content-img"/>
        </div>
    </div>
       
    )
}

export default Contents