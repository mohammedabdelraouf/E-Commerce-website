import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    const footerLinks = document.querySelectorAll('.footer-link');
  
    // Add event listener to each footer link
    footerLinks.forEach(link => {
    link.addEventListener('click', event => {
        // Check if the link is on the active page
        if (window.location.pathname === event.target.pathname) {
            event.preventDefault(); // Prevent default anchor behavior
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
        }
    });
    });
  return (
    <div className='pt-10'>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text+sm">
            <div>
                 <Link className='footer-link cursor-pointer' to='/'><img  className='mb-5 w-32' src={assets.logo} alt="" /></Link>
                <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero vitae delectus cum error minus similique neque, velit quasi rerum soluta.</p>
            </div>
            <div>
                <h2 className='text-xl font-medium mb-5'>Company</h2>
                <ul className='flex flex-col gap-y-1 text-gray-600'>
                    <Link className='footer-link' to='/'>Home</Link>
                    <Link className='footer-link' to='/about' >About Us</Link>
                    <Link className='footer-link' to='/cart'>Delivry</Link>
                    <Link className='footer-link' to='/policy'>Privacy policy</Link>
                </ul>
            </div>
            <div>
                <h2 className='text-xl font-medium mb-5'>Get in touch </h2>
                <ul className='flex flex-col gap-y-1 text-gray-600'>
                    <p>+201557643211</p>
                    <p>m.abdelraouf1010@gmail.com</p>
                </ul>
            </div>
        </div>
        <div className='text-center'>
            <hr />
            <p className='py-5 text-sm'>Copyright 2024 </p>
        </div>
    </div>
  )
}

export default Footer
