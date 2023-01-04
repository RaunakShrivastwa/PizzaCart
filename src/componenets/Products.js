import Product from '../componenets/product'
import {useState,useEffect,useContext} from 'react'
import {CartContext} from '../CartContext'

const Products = () => {

  const {name}=useContext(CartContext);

  const [product,setProduct]=useState([]);

  useEffect(()=>{
     fetch('http://localhost:8090/product')
     .then(response=>response.json()
     .then(product=>{
     setProduct(product);
     console.log(product)
     }))
  },[])

  return (
    <div className="container mx-auto pb-14">
         <h1 className="text-lg font-bold my-8">Products {name}</h1>


       <div className="grid grid-cols-5 my-8 gap-24">
         {
          product.map(item =><Product key={product.id} product={item}/>)
         }
       </div>

    </div>

     

  )
}

export default Products;