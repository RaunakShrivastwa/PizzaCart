import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navigation from './componenets/Navigation';
import productPage from './pages/productPage';
import CartPage from './pages/CartPage';
import SingleProduct from './pages/SingleProduct';
import {CartContext} from './CartContext'
import { useState } from 'react';
import { useEffect } from 'react';

function App(){

    const[cart,setCart]=useState({});



    useEffect(()=>{
       const cart=  window.localStorage.getItem('cart');
       setCart(JSON.parse(cart))
       console.log(cart)
    },[])

    useEffect(()=>{
          window.localStorage.setItem('cart',JSON.stringify(cart));
     },[cart])

    return(
        <>
        
         <Router>
            <CartContext.Provider value={{ cart,setCart}}>
            <Navigation/>
            

<Switch>
    <Route path='/home' component={Home} ></Route>
    <Route path='/about' component={About} ></Route>
    <Route path='/productPage' exact component={productPage} ></Route>
    <Route path='/products/:id'  component={SingleProduct}></Route>
    <Route path='/cart' component={CartPage} ></Route>

</Switch>
            </CartContext.Provider>
         </Router>
        </>   
    )
}
export default App;