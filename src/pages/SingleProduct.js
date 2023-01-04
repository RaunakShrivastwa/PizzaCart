import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useContext } from "react";
import {CartContext} from '../CartContext'
import {Link, useParams,useHistory} from 'react-router-dom'

const SingleProduct = (props) => {

    const[product,setProduct]=useState([]);
    const[isAdding,setIsAdding]=useState(false)
    const { cart,setCart}= useContext(CartContext)
    
    const params=useParams();
    const history=useHistory()
    
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
    

    useEffect(()=>{
        fetch(`http://localhost:8090/products/${params.id}`)
        .then(response=>response.json()
        .then(product=>{
        setProduct(product);
        console.log(product)
        }))
     },[params.id])

  return (
    <div className='container mx-auto mt-12'>
       <Link to='/home'>
       <button  className='mb-12 font-bold' onClick={ ()=>{ history.goBack()}}>Back</button>
       </Link>
        <div className='flex mx-center'>
            <img  style={{width:"300px"}} src={`data:image/png/jpg/jpeg;base64,${product.image}`}></img>
             <div className='ml-16 mt-40'>
                <h1 className='text-xl font-bold'>{product.name}</h1>
                <div className='text-md'>{product.size}</div>
                <div className='font-bold mt-2'>₹ {product.prise}</div>
                <button disabled={isAdding} onClick={(e)=>{addToCart(e,product)}} className={`${ isAdding ? 'bg-green-500':'bg-yellow-500'} py-1 px-4 rounded-full font-bold`}>Add To Cart</button>
             </div>
        </div>
    </div>
  )
}

export default SingleProduct