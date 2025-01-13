import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';
function placeOrder() {
 const [payMethod , setPayMethod] = useState('cash');
 const {navigate} = useContext(ShopContext);

  return (
    <div className='flex flex-col min-[700px]:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
       {/* Left side */}
        <section className="flex flex-col gap-4 w-full  sm:max-w-[450px] m-auto">
            <div className="text-xl sm:text-2xl my-3">
              <Title text1={'DELIVERY'} text2={'INFORMATION'} />
            </div>
            <div className='flex gap-3'>
                <input type="text" placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
                <input type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
            </div>
                <input type="email" placeholder='Email Address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
                <input type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
            <div className='flex gap-3'>
                <input type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
                <input type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
            </div>
            <div className='flex gap-3'>
                <input type="number" placeholder='Zip-Code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
                <input type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
            </div>
            <input type="number" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />


        </section>
        {/* right side */}
        <section className='mt-8' > 
          <div className='mt-8 min-w-80  ms-0 '>
            <CartTotal/>
          </div>
          {/* payment method */}
          <div className='mt-12'>
            <Title text1={"PAYMENT"} text2={'METHOD'} />
            <div className='flex gap-3 flex-col lg:flex-row'>
                <div onClick={()=>setPayMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 h-3.5 border rounded-full ${payMethod == 'stripe' ? 'bg-green-600' : '' }`}></p>
                    <img  className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                </div>
                <div onClick={()=>setPayMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 h-3.5 border rounded-full ${payMethod == 'razorpay' ? 'bg-green-600' : '' }`}></p>
                    <img className='h-5 mx-4'  src={assets.razorpay_logo} alt="" />
                </div>
                <div onClick={()=>setPayMethod('cash')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 h-3.5 border rounded-full ${payMethod == 'cash' ? 'bg-green-600' : '' }`}></p>
                    <p className="text-gray-500 text-sm font-medium mx-4">Cash On Delivery</p>
                </div>
            </div>
          </div>
          <div className="w-full text-end mt-2">
            <button onClick={()=>navigate('/orders')} className='w-1/2 px-3 py-2 bg-black text-white' >Place Order</button>
          </div>
        </section>
    </div>
  )
}

export default placeOrder
