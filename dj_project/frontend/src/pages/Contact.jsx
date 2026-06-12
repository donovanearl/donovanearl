import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { getBaseURL } from "../api";

export default function Contact_page(){
    const [data,setData]= useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const fetchdata= async ()=>{
            try{
                const res= await axios.get("/api/contact/")
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

    return (<div>
                {/* {data.map((item)=>{
                    return (<div key={item.id}>
                                {item.phone}
                            </div>
                            );
                        })}
                        TEST */}
                        {data.phone}
        </div>
        );
}