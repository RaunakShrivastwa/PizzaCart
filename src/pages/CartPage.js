import {useContext,useState,useEffect} from 'react'
import { CartContext } from "../CartContext";
import './CartPage.css'
const CartPage = () => {

  const {cart,setCart}=useContext(CartContext);
 let pid=[];
 let Total=0;

 const [product,setProduct]=useState([]);

  var obj=cart.items;
  var JSON_Obj = cart.items;

    // Read key
    for (var key in JSON_Obj) {
      pid.push(key);
   }
   let uid=pid.join(',');
   const[productFetched,ToggleFetched]=useState(false)
    useEffect(()=>{

      if(!cart.items){
        return;
      }
      if(productFetched){
        return;
      }
     (async()=>{
      const  res= fetch(`http://localhost:8090/product/${uid}`);
     const jsonresponce =res.then(response=>response.json());
      const data= await jsonresponce.then(ress=>ress)
    //  console.log("data",data)
     setProduct(data)
     ToggleFetched(true)
     })()
     
     console.log(product)
     
 },[])

 
 const getQuantity=(productId) =>{
    return cart.items[productId];
 }

 const increment=(productId)=>{
    const oldQuantity=cart.items[productId];
     const _cart={...cart};
     _cart.items[productId]=oldQuantity+1;
     _cart.TotalItems+=1;
     setCart(_cart)
     
 }

 const Decrement=(productId)=>{
  const oldQuantity=cart.items[productId];
  if(oldQuantity===1){
    return;
  }
   const _cart={...cart};
   _cart.items[productId]=oldQuantity-1;
   _cart.TotalItems-=1;
   setCart(_cart)
   
}

const getPrise=(productId,prise)=>{
    const sum= prise* getQuantity(productId);
    Total+=sum;
    return sum;
}

 const handleDelete=(productId)=>{
   const _cart={...cart};
   const qty=_cart.items[productId];
   delete  _cart.items[productId];
   _cart.TotalItems-=qty;
   setCart(_cart);
   const update=product.filter((product)=> product.id !== productId);
   setProduct(update)

 }

 const handleOrder =()=>{
  window.alert("Order Placed Successfully!");
  setProduct([]);
  setCart({})
 }

  return (
    product.length ?
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
       <h1 className="my-12 font-bold">Cart items</h1>
       <ul>
           {
              product.map(product=>{
                return(
                 
                  <li className="mb-9" key={product}>
                  <div className="flex item-center justify-between">
                     <div className="flex items-center">
                          <img className="h-16 mt-10" src={`data:image/png/jpg/jpeg;base64,${product.image}`}></img>
                           <span className="font-bold ml-4 w-48">{product.name}</span>
                     </div>
                     <div className='mt-10'>
                       <button onClick={()=>Decrement(product.id)} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">-</button>
                       <b className="px-4">{getQuantity(product.id)}</b>
                       <button onClick={()=>{increment(product.id)}} className=" bg-yellow-500 px-4 py-2 rounded-full leading-none">+</button>
                     </div>
                     <span className='mt-10'>₹ {getPrise(product.id,product.prise)}</span>
                      <button onClick={()=>{handleDelete(product.id)}} className="h-10 mt-10 bg-red-500 px-4 py-1 rounded-full leading-none text-white">Delete</button>
                   </div>
                </li>
             
                )
              })
           }           
       </ul>
       <hr className="my-6"/>
       <div className="text-right">
        <b>Grand Total:</b> ₹ {Total}
       </div>
       <div className="text-right mt-6">
          <button onClick={handleOrder} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">Order Now</button>
       </div>
    </div>
      :
      <div>
        <h2 className='tx bg-yellow-500 px-4 py-2 rounded-full leading-none'>You Have No Cart Items</h2>
        <img className='img' src='empty_cart-removebg-preview.png'></img>
      </div>
  )
}

export default CartPage