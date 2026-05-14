import api from "../api";
import React, { useEffect, useState } from "react";
import "../styles/Home.css"
import "../styles/index.css"


function LandingPageContents(){
    const [contents,setContents]= useState([])
    const [loading,setLoading]= useState(true)

    useEffect(()=>{
                    /*fill the products from server*/
                    const fetchContents =async ()=>{
                        try {
                            const res= await api.get("/api/landing-page/") // get everything in this path in APIview
                            setContents(res.data)
                        } catch (error) {
                            console.error("Failed to grab data", error)
                        }finally{
                            setLoading(false)
                        }
                    }
                    fetchContents();
                },[]);

if(loading){
    return <p style={{ textAlign: "center" }}>Loading ...</p>;
}
return(
    
    <div className="landing-page-contents-container">
        {contents.map((contents) => (
        <div key={contents.id} className="contents-card">
          <div className="content-image-container">
            <img src={contents.contentImage} alt={contents.contentName} className="content-image" />
            </div>
          <h2 className="content-Header">{contents.contentHeader}</h2>
          <p className="content-Text">{contents.contentText}</p>
          
        </div>
      ))}
    </div>
  );
}

export default LandingPageContents
  


