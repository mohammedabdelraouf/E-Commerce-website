import React from 'react'
import Hero from '../components/Hero'

function home() {
  return (
    <div>
      <div className='flex content-center justify-center'>
        <h2 className='text-black font-bold'>Home </h2>
      </div>
      <Hero/>
    </div>
  )
}

export default home
