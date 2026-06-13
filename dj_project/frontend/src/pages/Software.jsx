import React from "react";
import { useState,useEffect } from "react";
import { getBaseURL } from "../api";
import axios from "axios";


export default function Software_page(){
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const fetchdata=async ()=>{
            try{
                const res= await axios.get(`${getBaseURL()}/api/software/`);
                setData(res.data);
            }catch(error){
                console.log("Error loading data",error)
                }
            finally{
                setLoading(false)
            }
          }
        },[]);

if(loading){
    return <div>loading...</div>
    }

return (
        <div>
             {data.map((item)=>{return
                <div key={item.id}>     
                        <div className="intro_text">
                            {item.intro_text}
                        </div>
                        <div className="service_text">
                            {item.service_text}
                        </div>
                        <div className="image-container">
                            {item.image}
                        </div>
                    </div>
                    }
                    
                )}
               
        </div>

    )
}