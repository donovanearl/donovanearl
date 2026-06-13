import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { getBaseURL } from "../api";
import "../styles/contacts.css"

export default function Contact_page(){
    const [data,setData]= useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const fetchdata= async ()=>{
            try{
                const res= await axios.get(`${getBaseURL()}/api/contact/`)
                setData(res.data)}
            catch(error){
                console.log("Error loading data",error)}
            finally{setLoading(false)}
        };
        fetchdata();
    },[])
    if(loading){
        return <div>loading...</div>
    }
    console.log("Contact Data:",data);

    return (<div className="contacts-container">
                {data.map((item)=>{
                    return ( <div className="contacts-plate">
                                <div  className="cta-cardsContacts" key={item.id}>
                                    <div className="intro-text">
                                            Have a question, need technical support, or looking for the right computer solution?<br></br>
                                            We're only a call, email, or visit away. <br></br>Contact Pinoy-Tech today and let us help you find the best solution for your needs.<br></br>
                                            Reliable Technology. Trusted Service.
                                        </div>
                                    <div className="phone">
                                       Call us! 👉 {item.phone},
                                    </div>
                                    <div className="email">
                                       Email us! 👉 {item.email}
                                    </div>
                                    <div className="location-text">
                                        <h2>Visit our location or contact us online—<br></br>we're ready to help with all your computer needs.</h2>
                                    </div>
                                    <div className="location-container">
                                        <img className="location-image" src={item.location} />
                                    </div>
                                </div>
                            </div>
                            );
                        })}
                        
        </div>
        );
}