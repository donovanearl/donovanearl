import React from "react"
import "../styles/Contents.css"

function Home_contents(){
    let image1= "/src/assets/products-img1.jpg"
    let image2= "/src/assets/products-img2.jpg"
    return(
        <div className="contents-container">
            <img src={image1} className="home-image"/>
        </div>
    )

}
export default Home_contents