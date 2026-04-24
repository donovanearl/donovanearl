import "../styles/Cart.css"


export default function Cart(){

    const cartItems=[{id:1,name:"Corei7 proc",price:780.00 ,qty:1},{id:2,name:"Samsung SSD 500gb",price:350.00 ,qty:3}]

    const subTotal=(item)=>{return item.price*item.qty}
    const Total=cartItems.reduce((acc,item)=>acc+subTotal(item),0)
    // const Total=(items)=>{return items.reduce((acc,item)=>{return acc+subTotal(item)},0)}




    return <div className="cart-container">
                <div className="item-container">
                    {cartItems.map((item)=>{
                        return <div>{item.id}. {item.name},  Price: ${item.price} , Qty: {item.qty} , Subtotal: {subTotal(item)}, </div>
                               
                    })}
                    <div>Totals:{Total}</div>                
                </div>
            </div>
}