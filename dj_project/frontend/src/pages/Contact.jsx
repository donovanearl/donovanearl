import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";

export default function Contact_page(){
    const [data,setData]= useState({})
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const fetchdata= async ()=>{
            try{
                const res= await axios.get("/api/Contact/")
                setData(res.data)}
            catch(error){
                console.log("Error loading data",error)}
            finally{setLoading(false)}
        };
        fetchdata();
    },[])
    console.log("Contact Data:",data)
    return (<div>
                {}
    </div>

    )

}