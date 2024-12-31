import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {ShopContext} from '../context/ShopContext'
import { assets } from '../assets/assets';
import RealatedProducts from '../components/RealatedProducts';

const Product = () => {
    const {productId} = useParams();
    const {products , currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [img, setImg] = useState('')
    const [size, setSize] = useState('M')
    const [swapTaps, setSwap]  =useState(true)

    const fetchProductData = async ()=>{
      products.map((item)=>{
        if (item._id == productId) {
          setProductData(item);
          setImg(item.image[0]);
        }
      })
    }
    useEffect(()=>{
      fetchProductData();
    },[productId])
    
    
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100' >
      {/* product data section */}
      <section className="flex flex-col sm:flex-row  gap-12  lg:gap-0">
        {/* left side product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className='flex sm:flex-col  overflow-x-auto overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.7%] lg:w-[15.6%]'>
            {
               productData.image.map((item, index)=>(
                <img onMouseEnter={()=>setImg(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-2 cursor-pointer ' alt="" />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%] lg:w-[66%]">
            <img className='m-auto md:w-full h-auto' src={img} alt="sdasd" />
          </div>
        </div>
        {/* product info */}
        <div className="flex-1 w-full">
          <h1 className='font-semibold text-xl mt-2'>
            {productData.name}
          </h1>
          <div className='flex gap-1'>
            <img src={assets.star_icon} className='w-3 h-5' alt="" />
            <img src={assets.star_icon} className='w-3 h-5' alt="" />
            <img src={assets.star_icon} className='w-3 h-5' alt="" />
            <img src={assets.star_icon} className='w-3 h-5' alt="" />
            <img src={assets.star_dull_icon} className='w-3 h-5' alt="" />
            <p className="pl-2">(122)</p>
          </div>
          <p className='font-semibold mt-5 border-t border-b'>
            {currency} {productData.price}
          </p>
          <p className='text-gray-500 font-normal py-4 text-base lg:text-lg'>
            {productData.description}
          </p>

          <div className='flex flex-col gap-4'>
            <p>Select size:</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item,index)=>(
                  <button onClick={()=>{setSize(item)}} className={`border py-2 px-4 bg-gray-100 cursor-pointer ${size == item?'border-orange-400 border-2 bg-gray-200 font-semibold' :'hover:bg-gray-200'} hover:scale-110`} key={index}> {item}</button>
                ))
              }
            </div>
            <button onClick={()=>addToCart(productData._id, size)} className='bg-black text-white py-3 w-[40%] hover:bg-gray-800'>
              Add To Cart
            </button>
          </div>
          <hr className='mt-8'  />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
  <p>100% Original product.</p>
  <p>Cash on delivery is available on this product.</p>
  <p>Easy return and exchange policy within 7 days.</p>
</div>

        </div>
      </section>
      {/* reviews and description section */}
      <section className='mt-20'>
        <div className="flex">
          <button onClick={()=>{setSwap(true)}} className={`border px-5 py-3 text-sm ${swapTaps ? 'scale-105 bg-gray-50' : ''}`}>Description</button>
          <button onClick={()=>{setSwap(false)}} className={`border px-5 py-3 text-sm ${swapTaps ? '' : 'scale-105 bg-gray-50'}`}>Reviews</button>
        </div>
        <div className='py-6 flex flex-col gap-4  border-y px-6 text-sm text-gray-500'>
          {swapTaps && <>
           <p className='px-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, suscipit?</p>
           <p className='px-2'>Lorem, ipsum dolor Lorem, ipsum dolor.sit lorem amet consectetur adipisicing elit. Praesentium, suscipit?</p>
           <p className='px-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, suscipit?</p>
          </>}
          {
            !swapTaps && <>
              <p className='px-2'>Lorem, ipsum dolor Lorem ipsum dolor sit amet.sit amet consectetur adipisicing elit. Praesentium, suscipit?</p>
              <p className='px-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, suscipit?</p>
              <p className='px-2'>Lorem, ipsum Lorem, ipsum. dolor sit amet consectetur adipisicing elit. Praesentium, suscipit?</p>
           </>
          }
        </div>

      </section>
      <section>
        <RealatedProducts category={productData.category} subCategory={productData.subCategory} id={productData._id}/>
      </section>
    </div>
  ): null
}

export default Product
