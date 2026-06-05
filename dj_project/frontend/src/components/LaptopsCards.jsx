import api from "../api";
import axios from "axios";
import React from "react"
import { useState,useEffect } from "react";
import "../styles/Laptops.css"

export default function LaptopCards(){
    const [products,setProducts]= useState([])
    const [loading,setLoading]= useState(true)
    const [added,setAdded]=useState(false)

    //Fetch Data
    useEffect(()=>{
        const fetchdata= async ()=>{
            try{const res=await axios.get(`${getBaseURL()}/api/products/`);
                setProducts(res.data);
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

   async function handle_onClick(productId,quantity){ 
    try{
        const res=await api.post("/api/cart/items/",
        {product:productId,quantity:quantity}
    );
    setAdded(true)}
    
    catch(error){console.log("Error adding to cart",error)
    }
    }


return (
    <div className="laptops-container">
        {products.map((product) => (
        <div key={product.id} className="laptop-cards"> 
            <div className="img-wrapper">
                <img src={product.image} alt={product.name} className="laptop-image"/> 
            </div>         
            <h2 className="Product-name">{product.name}</h2>
            <p className="Product-details">{product.details}</p>
            <h2 className="price">AED {product.price}</h2>
            <button onClick={()=>handle_onClick(product.id,1)} className="cart-btn">Add to cart</button>  
        </div>
      ))}
    </div>
    )
}
