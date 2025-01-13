import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import CartItem from '../components/CartItem';
import { ShopContext } from '../context/ShopContext'


function Orders() {
  const {products,cartItems ,navigate ,currency} = useContext(ShopContext);
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
    <div className="mt-12">
      <Title text1={'MY'} text2={'ORDERS'}/>
      <div className="">
       {
        cartData.map((item,index)=>{
          const productData = products.find((product)=>( product._id === item._id));
          return (
              <div className="flex flex-col sm:flex-row justify-between border-t border-b py-2 text-gray-700 " >
                  {/* image and description */}
                 <div className="flex gap-12">
                    <div>
                      <img className="w-[4.5rem]" src={productData.image[0]} alt="" />
                    </div>
                    <div className="text-gray-700 flex flex-col gap-1">
                      <p>{productData.name}</p>
                      <p className="flex gap-4"> 
                        <span>{productData.price}{currency}</span> 
                        <span> quantitiy: {item.quantity}</span>
                        <span>size: {item.size}</span>
                      </p>
                      <p className="pt-2 text-xs" > Date: 13-Jan-2025 </p>
                    </div>
                  </div>


                  <div className="flex gap-2">
                    <p className="rounded-full bg-green-600 w-2 h-2 self-center"></p> 
                    <p className ='self-center' >ready to ship</p>
                  </div>

                  <div className="flex items-start">
                    <button className="border self-center px-4 py-2" >Track Order</button>
                  </div>



              </div>

          )
        })
       }
      </div>

      
    </div>
  )
}

export default Orders
