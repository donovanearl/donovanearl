import api from "../api";
import { useEffect,useState } from "react";

export default function OrderPageContents(){
    const [orderItems,setOrderItems]= useState([]);
    const [loading,setLoading]= useState(true);

    useEffect(()=>{
        const fetchdata= async ()=>{
            try{
                const res= await api.get("/api/orders/items/");
                setOrderItems(res.data);
            }
            catch(error){console.log(
                "Error loading orders",error)}
            finally{
                setLoading(false)
            }   
        };
        fetchdata();
    },[]);
    if(loading){
        return <p>Loading data</p>};

    async function handle_onClick(){
        try{
            const res= await api.post("/api/orders/items/")
        }catch(error){console.log(
            "Error Posting data",error)}
        finally{
            setLoading(false)
        }
    }

    return (<div className="order-page-container">
        {orderItems.map((item) => (
            <div className="order-page-items" key={item.id}>
            <div>{item.order}</div>
            <p>{item.product}</p>
            <p>{item.quantity}</p>
            <p>{item.price_at_purchase}</p>
            </div>)
        )}

    </div>)

}