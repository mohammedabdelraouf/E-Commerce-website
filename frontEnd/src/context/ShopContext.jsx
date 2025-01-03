import { createContext, useEffect, useState } from "react";
import {products} from "../assets/assets";
export const ShopContext = createContext();
const ShopContextProvidor = (props)=>{
    const currency = '$';
    const deliveryFee= 10 ;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] =useState([{}]);
    const addToCart = async (itemId, size)=>{
          let cartData = structuredClone(cartItems);
          if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size]=1
            }
            
          }
          else{
            cartData[itemId] = {}
            cartData[itemId][size]=1
        }

       setCartItems(cartData)
    }
    useEffect(()=>{
        console.log(cartItems)
    },[cartItems])
    const value={
        products, currency,deliveryFee, 
        search , setSearch, showSearch , setShowSearch
        ,addToCart , cartItems
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}  
export default ShopContextProvidor;