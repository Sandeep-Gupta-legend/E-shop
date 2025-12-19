import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className='flex justify-between p-4 bg-black text-white'>
      <Link to='/'>E-Shop</Link>
      <div className='space-x-4'>
        <Link to='/login'>Login</Link>
        <Link to='/cart'>Cart</Link>
      </div>
     
      
    </nav>
  )
}

export default Header