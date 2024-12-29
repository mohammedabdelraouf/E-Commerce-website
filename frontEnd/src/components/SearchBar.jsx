import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    const {search , setSearch, showSearch, setShowSearch} = useContext(ShopContext)
    const [searchState, setSearchState] = useState('');
    const [visible, setVisible] = useState(false);
    const location = useLocation();
    useEffect(()=>{
        if (location.pathname.includes('collection')) {
            setVisible(true)
        }
        else{
            setVisible(false)
        }
    },[location])
  return showSearch && visible ?(
    <div className='border-b border-t bg-gray-50 text-center'>
        <div className="inline-flex text-center my-3 mx-2 border border-gray-400 px-5 py-2  rounded-full w-3/4 sm:w-1/2">
            <input value={searchState} onChange={(e)=>setSearchState(e.target.value)} id="search-input" className='flex-1 outline-none bg-inherit text-sm ' type="text" placeholder='Search' />
            <img onClick={()=>setSearch(searchState)} className='w-4 cursor-pointer' src={assets.search_icon} alt="" />
        </div>
        <img onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
    </div>
  ) : null
}

export default SearchBar
