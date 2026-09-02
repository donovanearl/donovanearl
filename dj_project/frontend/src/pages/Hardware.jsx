import React from "react";
import { useState,useEffect } from "react";
import { getBaseURL } from "../api";
import axios from "axios";
import "../styles/HardwareSoftware.css"
import BookAppointmentModal from "../components/BookAppointmentModal";


export default function Hardware_page(){
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        const fetchdata=async ()=>{
            try{
                const res= await axios.get(`${getBaseURL()}/api/services/hardware/`);
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
        <div className="services-container">
            <BookAppointmentModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <div className="services-sub-container">
                <div className="header-container">
                </div>
                            {data.map((item)=>(
                                            <div key={item.id} className="items-container">
                                                    
                                                    <div className="image-wrapper">
                                                        <div className="image-container">
                                                            <img src={item.image} alt="hardware-image" className="item-image"/>
                                                        </div>
                                                    </div>
                                                    <div className="service-text">
                                                            {item.service_text}
                                                    </div>
                                                    <div className="intro-text">
                                                        {item.intro_text}
                                                    </div>
                                                    <div className="service-price">
                                                        <h2>AED 899</h2>
                                                    </div>
                                                    <div className="service-price">
                                                        <button className="booking-btn" onClick={() => setIsOpen(true)}>Book Service</button>
                                                    </div>
                                                        
                                            </div>))} 
                </div>
        </div>
            

    )
}