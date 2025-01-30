import React, { useContext, useEffect, useState } from 'react'
import {assets} from  '../assets/assets'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShopContext} from '../context/ShopContext';

const  Navbar = () => {
 
    let [visible, setVisible] = useState(false);
    const {setShowSearch , getCartCount ,navigate, setSide} = useContext(ShopContext);
    const location = useLocation();
    useEffect(()=>{
        setSide(visible)
    },[visible])
  return (  
    <div className={`${visible ?'static':'sticky top-0' }`}>
        <div className=" bg-white w-full flex items-center justify-between py-5 px-5 font-medium">
            <Link className='cursor-pointer' to='/'><img src={assets.logo} className='w-36 ' alt="" /></Link>
            <ul className='hidden sm:flex  gap-5 text-sm md:text-base  border-b'>
                <NavLink to='/'>
                    <p>Home</p>
                    <hr className='border-red-950  border-2 hidden'/>
                </NavLink>
                <NavLink to='/collection'>
                    <p>Collections</p>
                    <hr className='border-red-950  border-2 hidden'/>
                </NavLink>
                <NavLink to='/about'>
                    <p>About</p>
                    <hr className='border-red-950  border-2 hidden'/>
                </NavLink>
                <NavLink to='/contact'>
                    <p>Contact</p>
                    <hr className='border-red-950  border-2 hidden'/>
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                <img onClick={()=>setShowSearch(true)} src={assets.search_icon}  className={`w-5 cursor-pointer ${location.pathname.includes('collection')? '': 'hidden'  }`} />
                <div className='group relative'>
                    <img onClick={()=>navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                    <div className='group-hover:block hidden absolute dropdown-menu right-0  pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-600 rounded'>
                            <p onClick={()=>{navigate('/orders')}} className='cursor-pointer hover:text-black hover:font-bold'>My profile</p>
                            <p onClick={()=>{navigate('/orders')}} className='cursor-pointer hover:text-black hover:font-bold'>Orders</p>
                            <p onClick={()=>{navigate('/orders')}} className='cursor-pointer hover:text-black hover:font-bold'>Logout </p>
                        </div>
                    </div>
                </div>
                <Link to='/cart' className='relative'>
                <img src={assets.cart_icon}  className='w-5 min-w-3' alt="" />
                    <p className='absolute right-[-3px] bottom-[-3px] w-8/12 sm:w-8/12  text-center leading-relaxed bg-black text-white aspect-square rounded-full text-[12px] sm:text-[10px]'>
                        {getCartCount()}
                    </p> 
                </Link>
                <img onClick={()=>{setVisible(true)}} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />

            </div>
        </div>
        {/* side bar menue for small screen*/}
        <div className={`z-50 side-menue absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible? 'w-11/12 shadow-lg' : 'w-0'}`}>
            <div className="flex flex-col text-gray-600">
                <div onClick={()=>{setVisible(false)}} className="flex items-center gap-4 p-3 cursor-pointer">
                    <img  src={assets.dropdown_icon} className='w-2 m-5 me-0 rotate-180 ' alt="" />
                    <p className='hover:font-bold' >Back</p>
                </div>
                <NavLink onClick={()=>{setVisible(false)}} className='py-2 pl-6 border hover:text-black hover:font-bold' to='/collection' >Collection</NavLink>
                <NavLink onClick={()=>{setVisible(false)}}className='py-2 pl-6 border hover:text-black hover:font-bold' to='/'>Home</NavLink>
                <NavLink onClick={()=>{setVisible(false)}} className='py-2 pl-6 border hover:text-black hover:font-bold' to='/about' >About</NavLink>
                <NavLink onClick={()=>{setVisible(false)}}className='py-2 pl-6 border hover:text-black hover:font-bold' to='/contact' >Contact</NavLink>
            </div>
        </div>
    </div>
  );
}

export default  Navbar
