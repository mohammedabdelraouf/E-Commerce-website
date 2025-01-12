import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

function contact() {
  return (
    <div className='flex flex-col pt-16 border-t border-black'>
      <header className="w-full text-center text-xl ">
        <Title text1={'CONTACT'} text2={'US'}/>
      </header>
      <main className='flex flex-col gap-20  mt-10'>
        <section className="flex flex-col-reverse gap-4 sm:flex-row">
          <div className='w-full sm:w-1/2' >
            <img className='m-auto w-2/3 sm:w-10/12' src={assets.contact_img} alt="" />
          </div>
          <div className=' w-full sm:w-1/2   text-gray-500 font-normal self-center'>
            <p className='font-semibold text-black'>
            OUR STORE
            </p>
            <div className='pt-6'>
              <p >
                54709 willms Station
              </p>
              <p className=''>
              Suite 350, Washignton, USA
              </p>
            </div>
            <div className='pt-6'>
              <p >
                Tel : +20102150911
              </p>
              <p className=''>
                Email: m.abelraouf1010@gmail.com
              </p>
            </div>
            <p className=' pt-6 font-semibold text-black'>
              CAREERS AT MOSHOP
            </p>
            <p className='pt-4'>
            Learn more about our teams and job openings
            </p>
          </div>

        </section>
       
        <section className=''>
          <NewsLetterBox/>
        </section>
      </main>
    </div>
  )
}

export default contact
