import { useState,useEffect } from "react";
import api from "../api";
import "../styles/Order_history.css"

export default function Order_history(){
    const [orderHistory,setOrderHistory]= useState([])
    const [orderItems,setOrderItems]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const fetchdata= async ()=>{
            try{
                const orderHistoryres= await api.get("/api/orders/")
                setOrderHistory(orderHistoryres.data)

                const orderItemsres= await api.get("/api/orders/items/")
                setOrderItems(orderItemsres.data)
            }catch(error){
                console.log("Error loading data", error)
            }finally{setLoading(false)}
        }
        fetchdata();
    },[]);

    if(loading){return <div>Loading...</div>}
    
    // console.log("orderHistory", orderHistory)
    // console.log("orderItems", orderItems)

    return <div className="order-history-container">
                <div className="order-history-plate">
                    
                        {orderHistory.map((order)=>{
                            return <div className="items-container"key={order.id}>
                                Order #:{order.id}
                              
                                    {orderItems.filter((item)=>item.order===order.id)
                                        .map((item)=>{
                                              return <div>
                                                        <div className="items" key={item.id}>
                                                            <div className="item-name">
                                                                Name:{item.product.name}
                                                            </div>
                                                            <div className="item-quantity">
                                                                Quantity:{item.quantity}
                                                            </div>
                                                            <div className="item-price-at-purchase">
                                                                Price at purchase:{item.price_at_purchase}
                                                            </div>
                                                            
                                                        </div>
                                                          
                                                    </div>
                                    })}
                                     <div className="total-price">
                                                                Total:{Number(order.total_price).toFixed(2)}
                                        </div>                            
                            </div>
                        
                    })} 

                </div>
        </div>
}