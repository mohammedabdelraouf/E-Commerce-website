import React, { useContext, useEffect } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
    const {totalPrice , cartItems ,clacPrice} =useContext(ShopContext)
    useEffect(()=>{
        clacPrice();
    }, [cartItems])
  return (
    <div>
        <div className="ms-auto w-1/2 mt-16">    
            <Title text1={"TOTAL"} text2={'AMOUNT'}/>
            <div className="flex flex-col">
                <p className='border-b py-2  font-medium text-lg ' >total amout {totalPrice} $ </p>
                <p className='border-b py-2  font-medium text-lg ' >shipping fee   10$ </p>
            </div>
       </div>
    </div>
  )
}

export default CartTotal
