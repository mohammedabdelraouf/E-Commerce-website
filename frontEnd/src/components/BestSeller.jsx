import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller , setBestSeller] = useState([]);
    useEffect(()=>{
      const bestProducts = products.filter((item)=>(item.bestseller))
      setBestSeller(bestProducts.slice(0,5))
    },[])
   
   
    
    
  return (
      <div className='my-10'>
        <div className="text-center py-8 text-3xl">
            <Title text1={'BEST'} text2={'SELLER'}/>
            <p className='font-light text-sm text-gray-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae esse officia facilis, veniam.</p>
        </div>

        {/* products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5  gap-12 sm:gap-4 gap-y-6'>
          {
            bestSeller.map((item, index)=>(
              <ProductItem key={index} id={item._id} name={item.name} image={item.image}  price={item.price}/>
            ))
          }
        </div>
      </div>
  )
}

export default BestSeller
