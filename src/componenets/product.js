import { Link } from "react-router-dom";
import { useContext } from "react";
import {CartContext} from '../CartContext'
import { useState } from "react";

const Product = (props) => {

 const { cart,setCart}= useContext(CartContext)

 const[isAdding,setIsAdding]=useState(false)

  const addToCart=(event,product)=>{
    let arr=[]
    event.preventDefault();
     const _cart= {...cart};
 if(!_cart.items  ){
        _cart.items={}
      
     }
    
     if(_cart.items[product.id]){
   
      _cart.items[product.id]+=1;
     }else{
      _cart.items[product.id]=1;
     }

    
     if(!_cart.TotalItems){
       _cart.TotalItems=0;
     }
    _cart.TotalItems+=1;

    

    setCart(_cart)

    setIsAdding(true)
    setTimeout(()=>{
         setIsAdding(false)
    },2000)

     
  }

  const { product } = props;
  return (
    <div>
      <Link to={`/products/${product.id}`}>
      <div>
        <img src={`data:image/png/jpg/jpeg;base64,${product.image}`} />
        <div className="text-center">
          <h2>{product.name}</h2>
          <span className="bg-gray-200 py-1 rounded-full text-sm-px-4">
            {product.size}
          </span>
        </div>

        <div className="flex justify-between items-center mt-">
          <span>₹ {product.prise}</span>
          <button disabled={isAdding} onClick={(e)=>{addToCart(e,product)}} className={`${ isAdding ? 'bg-green-500':'bg-yellow-500'} py-1 px-4 rounded-full font-bold`}>
            Add{isAdding ? 'ed':''}
          </button>
        </div>
      </div>
    </Link>
    </div>
  );
};

export default Product;
