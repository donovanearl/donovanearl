import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { getBaseURL } from "../api";
import "../styles/Contacts.css"
import Contacts_Email_Us from "../components/Email_form";
import EmailLogo from "../assets/EmailLogo.png"

export default function Contacts_Email(){
    const [data,setData]= useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const fetchdata= async ()=>{
            try{
                const res= await axios.get(`${getBaseURL()}/api/contacts/email/`)
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
                <div className="contacts-sub-container">
                     <div className="header-container">
                    </div>
                    
                        <div className="contacts-items-container">
                              
                                    <div className="contacts-email-header">
                                        Send us a message—<br></br>We're ready to help with all your computer needs.
                                    </div>
                                    
                                        <div className="contacts-email-form-container">
                                            <img src={EmailLogo} alt='EmailLogo' className="EmailLogo"/>
                                            <Contacts_Email_Us/>
                                        </div>
                           
                            </div>
                </div>
                
                        
        </div>
        );
}