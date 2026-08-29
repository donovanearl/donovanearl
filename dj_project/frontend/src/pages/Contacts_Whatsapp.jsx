import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { getBaseURL } from "../api";
import "../styles/Contacts.css"
import Contacts_Whatsapp_Us from "../components/WhatsApp_Form";
import WhatsAppLogo from "../assets/WhatsAppLogo.png"

export default function Contacts_Whatsapp(){

    return (<div className="contacts-container">
                <div className="contacts-sub-container">
                     <div className="header-container">
                    </div>
                    
                     <div className="contacts-whatsapp-form-container">
                        <img src={WhatsAppLogo} alt='WhatsAppLogo' className="WhatsAppLogo"/>
                        <Contacts_Whatsapp_Us/>
                    </div>
                    
                </div>
                
                        
        </div>
        );
}