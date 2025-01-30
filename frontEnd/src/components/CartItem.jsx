import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const CartItem = ({itemId, itemName , itemImg, size , price ,quantity}) => {

  const {requestDeleteConfirmation ,updateNumberOfItems} = useContext(ShopContext);
  return (
    <div className="grid grid-cols-[4fr_0.5fr_0.5fr] gap-2  sm:grid-cols-[4fr_2fr_0.5fr] border-b border-t justify-between py-1">
      <div className='flex items-start  gap-6'> 
        <img className='w-16 sm:w-20' src={itemImg} alt=""/>
          <div>
              <p className='text-xs sm:text-lg font-medium'>{itemName}</p>
              <div className="flex items-center gap-5 mt-2">
                <p className='mt-2' >{price} $ </p>
                <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50 shadow-sm'>{size}</p>
              </div>
          </div>
      </div>
      <div className="flex">
        <input onChange={(e)=>{updateNumberOfItems(itemId, size, parseInt(e.target.value))}} type='number' min={1} defaultValue={quantity} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 shadow-md self-center'></input>
      </div>
      <img onClick={(e)=>{requestDeleteConfirmation(itemId,size)}} src={assets.bin_icon} alt="" className=" w-4 mr-0 sm:w-5 cursor-pointer self-center" /> 
    </div>
    
  )
}

export default CartItem
