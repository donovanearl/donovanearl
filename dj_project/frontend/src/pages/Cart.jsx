import "../styles/Cart.css"
import api from "../api"
import { useEffect,useState } from "react"
import {useNavigate} from "react-router-dom"



export default function Cart(){
    const [cartItems,setCartItems]=useState([])
    // console.log("CartItems:",cartItems)
    const navigate=useNavigate()

    useEffect(()=>{
        const fetchdata = async ()=>{
            try{const res=await api.get('/api/cart/items/')
                setCartItems(res.data)
            }
                catch(error){
                console.log("Unable to load cart",error)
            }
        }
        fetchdata()
    },[])

    console.log("List of CartItems:",cartItems)
    const subTotal=(item)=>{
        const price=parseFloat(item.product.price);
        return Number((price*item.quantity).toFixed(2))}

    const Total=cartItems.reduce((acc,item)=>acc+subTotal(item),0)
    
    const deleteItem = async (itemId) => {
    try {
        await api.delete(`/api/cart/items/${itemId}/`)
        setCartItems(cartItems.filter(item => item.id !== itemId))  // remove from state
    } catch(error) {
        console.log("Error deleting item", error)
    }
}   
    const updateQuantity = async (itemId, newQuantity) => {
    if(newQuantity < 1) return  // prevent going below 1
    try {
        await api.patch(`/api/cart/items/${itemId}/`, {quantity: newQuantity})
        setCartItems(cartItems.map(item => 
            item.id === itemId ? {...item, quantity: newQuantity} : item
        ))  // update state immediately
    } catch(error) {
        console.log("Error updating quantity", error)
    }
}
    const checkOut = ()=>{
        navigate("/Orders/")
     
    }




    return <div className="cart-container">
                <div className="item-container">
                    {cartItems.map((item,index)=>{
                        return <div className="items-parent"> 
                                <div className="items"key={item.id}> 
                               
                                    <div className="items-name"> {index+1}. {item.product.name}  </div>
                                    <div>Price: ${item.product.price}</div>
                                    <div>Qty: {item.quantity} </div>
                                    <div className="subtotal">Subtotal: {subTotal(item)}</div>
                                    <div className="buttons">
                                        <button className="minus" onClick={()=>updateQuantity(item.id,item.quantity -1)}>-</button>
                                        <button className="plus" onClick={()=>updateQuantity(item.id,item.quantity+1)}>+</button>
                                        <button className="remove" onClick={() => deleteItem(item.id)}>Remove</button>  
                                    </div>
                                </div> 
                               
                            </div>           
                    })}
                </div>
                <div className="totals-container">Totals:{Total.toFixed(2)}</div>    
                <button className="check-out-button" onClick={checkOut}>Check out</button>
            </div>
}
// TODO: Check out should navigate to Orders page and api.get from there useEffect