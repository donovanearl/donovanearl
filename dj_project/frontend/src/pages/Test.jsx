import { useEffect,useState } from "react";
import api from "../api";

export default function GetData(){
    const [products,setProducts]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const fetchData=async ()=>{ 
            try{ const res= await api.get("api/products")
                setProducts(res.data);}
            catch(error){
                console.error("This is an error", error) }
            finally{setLoading(false)}
            }
            fetchData();
    },[])
    if(loading){
        return
        <div>
            Loading...
        </div>
    }
    return(<div>This is the return {products.Name}</div>)
  }
