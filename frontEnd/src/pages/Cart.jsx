import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import CartItem from '../components/CartItem';
import CartTotal from '../components/CartTotal';
import { ShopContext } from '../context/ShopContext'

import { use } from 'react';

function cart() {
  const {products,cartItems} = useContext(ShopContext);
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

  return (
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

      <CartTotal />
    </div>
  )
}

export default cart
