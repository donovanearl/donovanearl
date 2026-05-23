import "../styles/Cart.css"
import api from "../api"
import { useEffect,useState } from "react"



export default function Cart(){
    const [cartItems,setCartItems]=useState([])
    // console.log("CartItems:",cartItems)

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


    const subTotal=(item)=>{return parseFloat(item.product.price)*item.quantity}
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
    const checkOut = async ()=>{
        try{
            const res= await api.post("/api/orders/items/")
        }catch(error){
            console.log("Error check out",error)}
        
    }




    return <div className="cart-container">
                <div className="item-container">
                    {cartItems.map((item)=>{
                        return <div key={item.id}> 
                        {item.product.id}. {item.product.name},  Price: ${item.product.price} , Qty: {item.quantity} , Subtotal: {subTotal(item)}, 
                        <button onClick={()=>updateQuantity(item.id,item.quantity -1)}>-</button>
                        <button onClick={()=>updateQuantity(item.id,item.quantity+1)}>+</button>
                        <button onClick={() => deleteItem(item.id)}>Remove</button>    </div>            
                    })}
                </div>
                <div className="totals-container">Totals:{Total}</div>    
                <button onClick={checkOut}>Check out</button>
            </div>
}
// TODO: Check out should navigate to Orders page and api.get from there useEffect