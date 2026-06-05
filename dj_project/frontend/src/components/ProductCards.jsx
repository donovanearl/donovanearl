import api from "../api";
import React, { useEffect, useState } from "react";
import "../styles/ProductCards.css"
import "../styles/index.css"
import axios from "axios";


function ProductCards(){
    const [products,setProducts]= useState([])
    const [loading,setLoading]= useState(true)

    useEffect(()=>{
                    /*fill the products from server*/
                    const fetchProducts =async ()=>{
                        try {
                            const res= await axios.get(`${getBaseURL()}/api/product/`) // get everything in this path in APIview
                            setProducts(res.data)
                        } catch (error) {
                            console.error("Failed to grab data", error)
                        }finally{
                            setLoading(false)
                        }
                    }
                    fetchProducts();
                },[]);

if(loading){
    return <p style={{ textAlign: "center" }}>Loading products...</p>;
}
return(
    <div className="product-container">
        {products.map((products) => (
        <div key={products.id} className="product-card">
          <img src={products.productImage} alt={products.productName} className="product-image" />
          <h2 className="product-name">{products.productName}</h2>
          <p className="product-description">{products.productDetails}</p>
          <p className="product-price">{products.productPrice}</p>
         
          <button className="buy-button">Buy Now</button>
        </div>
      ))}
    </div>
  );
}

export default ProductCards
  


