import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'

const Header = () => {
  const {user} = useSelector((state)=>
    state.auth
  
  );

  const dispatch=useDispatch();

  return (
    <nav className='flex justify-between p-4 bg-black text-white'>
      <Link to='/'>E-Shop</Link>
      <div className='space-x-4'>
        {
          user ?(
            <>
            <span>Hello,{user.name}</span>
            <button onClick={()=> dispatch(logout())}>Logout</button>
            </>
          ):
          (
            <Link to='/login'>Login</Link>
          )
        }
        
        <Link to='/cart'>Cart</Link>
      </div>
     
      
    </nav>
  )
}

export default Header