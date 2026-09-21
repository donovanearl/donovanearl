import { CardElement,useStripe,useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import api from "../api";
import "../styles/Orders.css"

export default function CheckoutForm({total,onSuccess}){
    const stripe=useStripe()
    const elements=useElements()
    const [loading,setLoading]=useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit= async(e)=>{
        e.preventDefault()
        setLoading(true)
        setErrorMessage("")

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
                setErrorMessage(result.error.message)
            }else{
                onSuccess(result.paymentIntent.id)  // pass payment intent ID back
            }
        }catch(error){
            const backendMessage = error.response?.data?.error;
            setErrorMessage(backendMessage || "Something went wrong. Please try again.")
        }finally{
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="card-element-wrapper">
                <CardElement/>
            </div>

            {errorMessage && <p className="payment-error">{errorMessage}</p>}

            <button type="submit" disabled={loading}>
                {loading?"Processing...":"Pay NOW"}
            </button>
        </form>
    )

}