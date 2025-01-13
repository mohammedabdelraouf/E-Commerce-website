import React, { useState } from 'react'
import Title from '../components/Title'

function login() {
  const [state, setState] = useState('Sign Up');
  const handelSubmit = (e)=>{
    e.preventDefault();
  }
  return (
    <form onSubmit={(e)=>handelSubmit(e)} className='w-[90%]  sm:max-w-96 m-auto  mt-14 flex flex-col gap-4 items-center text-gray-800 '>
      <div className='inline-flex gap-2 items-center mb-3'>
       <p className='text-3xl prata-regular'>{state}</p>
       <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-600'></p> 
    </div>
      {state === 'Login' ? '' : <input type="text"      className=' w-full px-3 py-2 border border-gray-800' placeholder='Name' />}
      <input type="email"     className=' w-full px-3 py-2 border border-gray-800' placeholder='Email' />
      <input type="password"  className=' w-full px-3 py-2 border border-gray-800' placeholder='Password' />
      <div className={`w-full flex  ${ state === 'Login' ? 'justify-between':'justify-end' } `}>
        {state === 'Login' ? <p className='cursor-pointer' >forgot your password?</p> :'' } 
        {state ==='Login' ? <p className='cursor-pointer' onClick={()=>{setState('Sign Up')}}>Sign Up ?</p> : <p  className='cursor-pointer'onClick={()=>{setState('Login')}}> have an account?</p>}
      </div>
      <button className='bg-black px-3 py-2  text-white'> {state}</button>
    </form>
  )
}

export default login
