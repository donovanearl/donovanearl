import React from "react";
import { useState,useEffect } from "react";
import { getBaseURL } from "../api";
import axios from "axios";
import "../styles/HardwareSoftware.css"


export default function Software_page(){
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const fetchdata=async ()=>{
            try{
                const res= await axios.get(`${getBaseURL()}/api/services/software/`);
                setData(res.data);
                console.log("ResData",res.data)
            }catch(error){
                console.log("Error loading data",error)
                }
            finally{
                setLoading(false)
            }
          }
          fetchdata();
        },[]);

if(loading){
    return <div>loading... (first render takes 60 secs)</div>
    }

return (
        <div>
             {data.map((item)=>(
                    <div key={item.id} className="items-container">
                            
                                <div className="intro_text">
                                    {item.intro_text}
                                </div>
                                <div className="service_text">
                                    {item.service_text}
                                </div>
                                <div className="image-container">
                                    <img src={item.image} alt="Software-image"/>
                                </div>
                            
                        </div>
                        )
                    
                )}
               
        </div>

    )
}