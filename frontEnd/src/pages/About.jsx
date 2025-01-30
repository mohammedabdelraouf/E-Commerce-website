import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
function About() {
  return (
    <div className='flex flex-col pt-16 border-t border-black'>
      <header className="w-full text-center text-xl ">
        <Title text1={'ABOUT'} text2={'US'}/>
      </header>
      <main className='flex flex-col gap-20 mt-10'>
        <section className="flex flex-col-reverse gap-4 sm:flex-row">
          <div className='w-full sm:w-1/2' >
            <img className='m-auto w-2/3 sm:w-10/12' src={assets.about_img} alt="" />
          </div>
          <div className=' w-full sm:w-1/2   text-sm text-gray-500 font-normal self-center'>
            <p className=''>

              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id veritatis non 
              laudantium nostrum
              laboriosam quisquam  alias Lorem ipsum dolor sit amet consectetur 
              adipisicing elit. Qui, laudantium!lorem2
              magnam iusto velit, ad fuga,Lorem, ipsum dolor.
            </p>
            <p className='pt-6'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id veritatis non laudantium nostrum
              laboriosam quisquam ratione  nostrum vero, alias magnam iusto velit, ad fuga,
            </p>
            <p className=' pt-6 font-semibold'>
              Our Mession
            </p>
            <p className='pt-4'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id veritatis non laudantium nostrum
              laboriosam quisquam ratione  nostrum vero, alias magnam iusto velit, ad fuga,
            </p>
          </div>

        </section>
        <section className='px-5 sm:px-0'>
          <div className='text-xl my-8'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 ">
            <div className=" py-2 sm:py-20 px-5 sm:px-16 border">
              <p>
              QUALITY ASSURANCE:
              </p>
              <p className='mt-5 text-gray-600 text-sm'>
                Lorem ipsum dolor sit amet consectetur adipisicing 
                incidunt, rerum sapiente delectus voluptatem.
              </p>
            </div>
            <div className=" py-2 sm:py-20 px-5 sm:px-16 border">
              <p>
              QUALITY ASSURANCE:
              </p>
              <p className='mt-5 text-gray-600 text-sm'>
                Lorem ipsum dolor sit amet consectetur 
                incidunt, rerum sapiente delectus voluptatem.
              </p>
            </div> 
            <div className=" py-2 sm:py-20 px-5 sm:px-16 border">
              <p>
              QUALITY ASSURANCE:
              </p>
              <p className='mt-5 text-gray-600 text-sm'>
                Lorem ipsum dolor sit amet consectetur adlkldjalksd asdkajl 
                incidunt, rerum sapiente delectus voluptatem.
              </p>
            </div>
          </div>
          
        </section>
        <section className=''>
          <NewsLetterBox/>
        </section>
      </main>
    </div>
  )
}

export default About
