import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import BestSeller from '../components/BestSeller';
import CartItem from '../components/CartItem';
import CartTotal from '../components/CartTotal';
import { ShopContext } from '../context/ShopContext'

import { use } from 'react';
import { Navigate } from 'react-router-dom';

function cart() {
  const {products,cartItems ,navigate} = useContext(ShopContext);
  const [cartData , setCartData] = useState([]);
  useEffect(()=>{
    
    let tempData = [];
    for(var item in cartItems)
      {
        for(var s in cartItems[item]){
          tempData.push({
            _id: item,
            size: s,
            quantity:cartItems[item][s]
          })
        }
      }
    setCartData(tempData);

  },[cartItems]);

  return Object.keys(cartItems).length ? (
    <div className='mt-14'>
      <Title text1={'YOUR'} text2={'CART'}/>
      <div className="">
       {
        cartData.map((item,index)=>{
          const productData = products.find((product)=>( product._id === item._id));
          return (<CartItem key={index} itemId={item._id} itemName = {productData.name} itemImg = {productData.image[0]}  size = {item.size}  price ={productData.price}  quantity={item.quantity}/>)
        })
       }
      </div>

       <div className="flex justify-end my-10">
          <div className="w-full sm:w-1/2  shadow-[0px_2px_20px_5px] shadow-gray-300">
            <CartTotal  />
            <div className='w-full text-end px-5'>
                <button onClick={()=>navigate('/place-order')} className='bg-black active:bg-gray-700 text-white cursor-pointer px-6 py-1 mt-4 mb-2 '>
                  Proceed To Checkout
                </button>
            </div>
          </div>
       </div>
       <div>
         <BestSeller/>
       </div>
    </div>
  ): (
    <div className='mt-14'>
      <Title text1={'YOUR'} text2={'CART'}/>
      <div className="w-full text-center">
        <p className="text-xl text-red-800 border">
          No Items In Your Cart !!
        </p>
      </div>
      <div>
          <BestSeller/>
      </div>
    </div>
  )
}

export default cart
