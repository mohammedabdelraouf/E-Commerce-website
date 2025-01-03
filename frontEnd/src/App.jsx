import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Signup from './pages/Signup'
import About from './pages/About'
import Collection from './pages/Collection'
import Navbar from './components/navBar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Product from './pages/Product'

const App = () => {
  return (
    <div className='w-[85%] md:w-11/12 lg:w-10/12 xl:w-9/12  m-auto'>
      <Navbar/>
      <SearchBar/>
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/placeOrder' element={<PlaceOrder />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
