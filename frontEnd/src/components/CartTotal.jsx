import React, { useContext, useEffect } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
    const {totalPrice , cartItems ,clacPrice , currency, deliveryFee } =useContext(ShopContext)
    useEffect(()=>{
        clacPrice();
    }, [cartItems])
  return (
    <div className='w-full  pt-2 my-2'>
        <div className='text-lg md:text-xl'>
            <Title text1={"CART"} text2={'TOTAL'}/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className='' > {totalPrice}.00 {currency} </p>
            </div>
            <hr/>
            <div className="flex justify-between">
              <p>Shipping Fee</p>
              <p className='' > {totalPrice === 0 ? 0 : deliveryFee}.00 {currency} </p>
            </div>
            <hr className='border-[3px]'/>
            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p className='' > {totalPrice === 0 ? 0 :  totalPrice + deliveryFee}.00 {currency} </p>
            </div>
            <hr/>
        </div>
        
    </div>
  )
}

export default CartTotal
