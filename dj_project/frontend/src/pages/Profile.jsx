import React from "react";
import api from "../api";
import "../styles/Profile.css"
import { useEffect,useState } from "react";

export default function Profile(){
    const [userdata,setUserData]=useState({})
    const [loading,setLoading]=useState(true)
    const [formData,setFormData]=useState({name:'',address:'',email:'',phone:''})
    const [editing,setEditing] =useState(false)

    useEffect(()=>{
        const fetchdata= async ()=>{
            try{
                const res=await api.get("/api/profile/")
                setUserData(res.data)
            }catch(error){console.log("Error loading Profile",error)

            }finally{
                (setLoading(false))
            }
        };
        fetchdata();
    },[]);

        const updateProfile= async ()=>{
            try{
                const res=await api.put("/api/profile/",formData);
                setUserData(res.data)
                setEditing(false)
            }catch(error){
                console.log("Error updating profile",error)
            }
        }

        const handleChange=(e)=>{
            setFormData({...formData,[e.target.name]:e.target.value})
        }
        const handleEdit = () => {
                setFormData(userdata)
                setEditing(true)
            }

    return (<div className="profile-container">
            {editing ? (<div className="input-container">
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Name"/>
                    <input name="address" value={formData.address} onChange={handleChange} placeholder="Address"/>
                    <input name="email" value={formData.email} onChange={handleChange} placeholder="Email"/>
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone"/>
                    <button onClick={updateProfile}>Save</button>
                    <button onClick={()=>setEditing(false)}>Cancel</button>
                </div>) :
                <div>
                    <div className="name">
                        <p>Name:{userdata.name}</p>
                    </div>
                    <div className="address">
                        <p>Address:{userdata.address}</p>
                    </div>
                    <div className="email-profile">
                        <p>Email:{userdata.email}</p>
                    </div>
                    <div className="phone-profile">
                        <p>Phone:{userdata.phone}</p>
                    </div>
                        <button onClick={handleEdit}>Edit Profile</button>
                    
                </div>
            }

       
        </div>    
        

    )
}
