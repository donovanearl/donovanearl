import api from "../api";
import React from "react"
import { useState,useEffect } from "react";
import "../styles/Laptops.css"

export default function LaptopCards(){
    const [laptops,setLaptops]= useState([])
    const [loading,setLoading]= useState(true)

    //Fetch Data
    useEffect(()=>{
        const fetchdata= async ()=>{
            try{const res=await api.get("/api/laptops");
                setLaptops(res.data);
            }
            catch(error){
                console.log("Error Downloading",error);
            }
            finally{
                setLoading(false);
            }
        }
        fetchdata();
},[])
if(loading){
    return <div>Loading...</div>
}


return (
    <div className="laptops-container">
        {laptops.map((laptop) => (
        <div key={laptop.id} className="laptop-header">
          <img src={laptop.laptopImage} alt={laptop.laptopName} className="laptop-image" />
          <h2 className="laptop-name">{laptop.laptopName}</h2>
      
        </div>
      ))}
    </div>
  );
//     <div className="laptops-container">
        
//     {laptops.map((laptop)=>{
//         return (
//             <div key={laptop.id} className="laptop-header">
//             <img src={laptop.image} alt={laptop.name} className="laptop-image"/>
//             </div>
//             );
//             }
//         )
//     }
// </div>)

};