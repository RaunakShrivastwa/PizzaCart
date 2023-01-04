import { Link } from "react-router-dom";
import {useContext} from 'react'
import { CartContext } from "../CartContext";
import Home from "../pages/Home";

function Navigation() {
  const {cart}=useContext(CartContext);
  return (
    <>
      <nav  id="main" className="container max-auto flex items-center justify-between py-4">

        <Link to="/home">
          <img id="logo" src="https://toppng.com/uploads/preview/pizza-png-11553999379orjd1miyt1.png"></img>

        </Link>

        <ul id="right-div" className="flex items-center ">
          <li><Link to="/home">Home</Link></li>
          <li className="ml-6"><Link to="/productPage">products</Link></li>

          <li className="ml-6">
            <Link to="/cart">
              <div id="logo-cart">
                <span> {cart.TotalItems ? cart.TotalItems:0}</span>
                <img  id="logo-cart" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Shopping_Cart_Flat_Icon_Vector.svg/512px-Shopping_Cart_Flat_Icon_Vector.svg.png?20220831032702"></img>

              </div>
            </Link> 
          </li>
        </ul>

      </nav>
    </>
  )
}
export default Navigation;