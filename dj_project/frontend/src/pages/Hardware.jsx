import React from "react";
import { useState,useEffect } from "react";
import { getBaseURL } from "../api";
import axios from "axios";


export default function Hardware_page(){
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const fetchdata=async ()=>{
            try{
                const res= await axios.get(`${getBaseURL()}/api/hardware/`);
                setData(res.data);
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
    return <div>loading...</div>
    }

return (
        <div>
             {data.map((item)=>(
                                <div key={item.id}>     
                                        <div className="intro_text">
                                            {item.intro_text}
                                        </div>
                                        <div className="service_text">
                                            {item.service_text}
                                        </div>
                                        <div className="image-container">
                                            <img src={item.image} alt="hardware-image"/>
                                        </div>
                                    </div>
                                ))}
               
        </div>

    )
}