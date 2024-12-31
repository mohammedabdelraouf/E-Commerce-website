import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem';
import { useLocation } from 'react-router-dom';

const RealatedProducts = ({category, subCategory ,id}) => {
    const {products} = useContext(ShopContext);
    const [related, setRealted] = useState([]);
    const location = useLocation();
    const shuffle = (array)=> {
        array.sort(() => Math.random() - 0.5);
      }
    const getRealted= ()=>{
        let temp = products.filter((item)=> item.category == category && item.subCategory == subCategory && item._id !== id)
        console.log(temp);
        shuffle(temp);
        setRealted(temp.slice(0,5));
    }

   
    useEffect(()=>{
        getRealted();
    },[location])
  return related ? (
    <div className='py-10 text-center text-2xl'>
        <Title  text1={"Related"} text2={"Products"}/>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5  gap-4 gap-y-6'>
            {
                related.map((item, index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image}  price={item.price}/>
                ))
            }
        </div>
    </div>
  ):(
    
    <div className='py-10 text-center text-2xl'>
        <Title  text1={"Related"} text2={"Products"}/>
        <p className='text-start text-lg'> there is no related items !!! </p>
    </div>
    )
}

export default RealatedProducts
