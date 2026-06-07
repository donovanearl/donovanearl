import "../styles/Orders.css"
import { useEffect,useState } from "react";
import api from "../api";
import {useNavigate} from "react-router-dom"
import CheckoutForm from "../components/CheckoutForm";

export default function Orders(){
    const [cartItems,setCartItems]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const fetchdata= async ()=>{
            try{
                 const res= await api.get("/api/cart/items/")
            setCartItems(res.data);
            }catch(error){
                console.log("Error loading from Cart",error)
                }
            finally{setLoading(false)}
        }
        fetchdata();
       
    },[])

    // console.log("cartItems:",cartItems)
    
    const subTotal=(item)=>{
        const price=parseFloat(item.product.price);
        return price*item.quantity
    }

    const total=cartItems.reduce((acc,item)=>acc+subTotal(item),0).toFixed(2)

    const navigate=useNavigate()

    const placeOrder= async (paymentIntentId)=>{
        try{
            //creates the order with the order id
            const orderRes= await api.post("/api/orders/",{
                total_price:total,
                status:"pending",
                stripe_payment_intent_id:paymentIntentId
            })
            const order=orderRes.data
//2nd step
            for(const item of cartItems){
                await api.post("/api/orders/items/",{
                    order:order.id,
                    product:item.product.id,
                    quantity:item.quantity,
                    price_at_purchase:item.product.price
                })
            }

            for (const item of cartItems){
                await api.delete(`/api/cart/items/${item.id}/`)
            }
            console.log("Order placed!", order)
            navigate("/order-history")
            //navigate to order history later
        }
        catch(error){
            console.log("Error placing order",error)
        }

    }

    if(loading){return <div>Loading ...</div>}
    return (<div className="order-page-container">
                    <div className="order-page-plate">
                        <h1>
                            Orders list
                        </h1>
                        <div className="items-container">
                            {cartItems.map((item,index)=>{return(
                                <div key={item.id}>
                                    <div>
                                        {index+1}.{item.product.name}
                                    </div>
                                    <div className="items-price">
                                        Price:{item.product.price} {" "}
                                        Qty:{item.quantity}  

                                    </div>
                                    <div>
                                        Subtotal:{subTotal(item).toFixed(2)}
                                    </div>
                                </div>
                                 )}
                            )}
                            <div className="total-container">
                                        <h2>Total:{total}
                                        </h2>
                                    </div>
                        </div> 
                        <div className="check-out-form-container">
                            <CheckoutForm className="check-out-form"
                                total={total}
                                onSuccess={(paymentIntentId)=>placeOrder(paymentIntentId)}
                                />
                        </div>
                    </div>
                </div>
    ) // return closed
}

