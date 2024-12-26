import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Products from './pages/Products'
import Signup from './pages/Signup'
import About from './pages/About'
import Collection from './pages/Collection'
import Navbar from './components/navBar'

const App = () => {
  return (
    <div className=''>
      <Navbar></Navbar>
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/placeOrder' element={<PlaceOrder />} />
        <Route path='/products' element={<Products />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  )
}

export default App
