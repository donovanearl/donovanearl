import { CardElement,useStripe,useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import api from "../api";
import "../styles/Orders.css"

export default function CheckoutForm({total,onSuccess}){
    const stripe=useStripe()
    const elements=useElements()
    const [loading,setLoading]=useState(false)

    const handleSubmit= async(e)=>{
        e.preventDefault()
        setLoading(true)

        try{
            //get client secret from Django
            const res=await api.post('/api/create-payment-intent/',{
                amount:total
            })
            const clientSecret=res.data.client_secret
            //confirm payment with stripe
            const result = await stripe.confirmCardPayment(clientSecret,{
                payment_method:{
                    card:elements.getElement(CardElement)
                }
            })
            if(result.error){
                console.log("Payment Error",result.error.message)
            }else{
                console.log("Payment success!")
                onSuccess(result.paymentIntent.id)  // pass payment intent ID back
            }
        }catch(error){
            console.log("Error:",error)
        }finally{
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="card-element-wrapper">
                <CardElement/>
                </div>
                            <button type="submit" disabled={loading}>
                                {loading?"Processing...":"Pay NOW"}
                            </button>
                
           
          
        </form>
    )

}