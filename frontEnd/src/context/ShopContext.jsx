import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import {products} from "../assets/assets";
import { useNavigate } from "react-router-dom";
export const ShopContext = createContext();
const ShopContextProvidor = (props)=>{
    const currency = '$';
    const deliveryFee= 10 ;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] =useState(()=>{
        const saved = localStorage.getItem("cartItems");
        const initialValue = JSON.parse(saved);
        return initialValue || {};

    });
    const [totalPrice, setTotalPrice] = useState(0); 
    const navigate = useNavigate();

    //  cart manging functions
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
    const [pendingDeletion, setPendingDeletion] = useState(null); // To track the item pending deletion

    const requestDeleteConfirmation = (itemId, size) => {
        toast.info(
            <div className="">
                <p className="font-medium text-black mb-5">Are you sure you want to remove this item?</p>
                <button className="rounded border px-3 py-1 me-2 text-black  bg-slate-100 "  onClick={() => confirmDeletion(itemId, size)}>Yes</button>
                <button className="rounded border px-3 py-1 text-black bg-slate-100 " onClick={cancelDeletion}>No</button>
            </div>,
            { autoClose: false, closeOnClick: false, position:"bottom-center" } // Keep the notification until a choice is made
        );
    };

    const confirmDeletion = (itemId, size) => {
        deleteFromCart(itemId, size); // Call the deletion logic
        toast.dismiss(); // Close the confirmation toast
    };

    const cancelDeletion = () => {
        setPendingDeletion(null); // Reset the pending deletion state
        toast.dismiss(); // Close the confirmation toast
    };

    const deleteFromCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                delete cartData[itemId][size];
            }

            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        }

        setCartItems(cartData);
    };

   

    const clacPrice = async ()=>{
        let totalPrice_temp = 0;
        for(var item in cartItems){
            let itemPrice = products.find((product)=>( product._id === item)).price;
            for(var size in cartItems[item])
            {
                totalPrice_temp += itemPrice* cartItems[item][size]
            }
        }
        setTotalPrice(totalPrice_temp);
    }

    const updateNumberOfItems = async (itemId, size, newValue)=>{
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                try {
                    if (newValue  == '')
                        {   
                            console.log("value is empty")
                        }
                        else if(newValue>0 ){
                            
                            cartData[itemId][size] = newValue;
                            setCartItems(cartData) 
        
                        }
                } catch (error) {
                    console.log(error)
                }   
                   
            }
            
          }

    }

    const getCartCount= ()=>{
        let count = 0 ;
        for(var item in cartItems){
            for(var size in cartItems[item])
            {
                count += cartItems[item][size]
            }
        }
        return count ;
    }


    // ********************************************************************************************************//
    // handle local sorage
    useEffect(() => {
        // storing input name
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }, [cartItems]);


    // -**************************************************************************************************//
    const value={
        products, currency,deliveryFee, 
        search , setSearch, showSearch , setShowSearch
        ,addToCart , cartItems, getCartCount ,deleteFromCart ,
        requestDeleteConfirmation,updateNumberOfItems , clacPrice , totalPrice
        , navigate
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}  
export default ShopContextProvidor;