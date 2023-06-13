import React, { useState } from 'react'
import {Logo} from '../assets/img'
import { NavLink, useNavigate } from 'react-router-dom'
import {FaCrown} from 'react-icons/fa'
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'
import { useStateValue } from '../context/StateProvider'
import { motion } from 'framer-motion'

const Header = () => {
    const [{user}, dispatch] = useStateValue()
    const [showMenu, setShowMenu] = useState(false)

    const navigate = useNavigate()
    const logout = () => {
        window.localStorage.clear()
        navigate('/login', {replace: true})
    }
  
    return (
        <header className='flex items-center w-full p-4 md:py-2 md:px-6'>
            <NavLink to={'/'}>
                <img src={Logo} alt='site logo' className='w-16'/>
            </NavLink>
            <ul className='flex items-center justify-center ml-7'>
                <li className='mx-5 text-lg'><NavLink to={'/home'} className={({isActive})=>isActive? isActiveStyles : isNotActiveStyles}>Home</NavLink></li>
                <li className='mx-5 text-lg'><NavLink to={'/music'} className={({isActive})=>isActive? isActiveStyles : isNotActiveStyles}>Music</NavLink></li>
                <li className='mx-5 text-lg'><NavLink to={'/contact'} className={({isActive})=>isActive? isActiveStyles : isNotActiveStyles}>Contact us</NavLink></li>
                <li className='mx-5 text-lg'><NavLink to={'/premium'} className={({isActive})=>isActive? isActiveStyles : isNotActiveStyles}>Premium</NavLink></li>
            </ul>

            <div className='flex items-center ml-auto cursor-pointer gap-2 relative'
                onMouseEnter={()=>setShowMenu(true)}
                onMouseLeave={()=>setShowMenu(false)}>
                <img src={user?.user?.imageUrl} className="w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg" alt='user image' referrerPolicy='no-referrer'/>
                <div className='flex flex-col'>
                    <p className='text-textColor text-lg hover:text-headingColor font-semibold'>{user?.user?.name}</p>
                    <p className='flex items-center gap-2 text-xs text-gray-500 font-normal'>Premium Member. <FaCrown className='text-sm -ml-1 text-yellow-400'/></p>
                </div>
                {showMenu && <motion.div 
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y:0}}
                    exit={{opcity: 0, y: 50}}
                className='absolute z-10 flex flex-col top-12 p-3 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm'>
                    <NavLink to={'/profile'}>
                        <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Profile</p>
                    </NavLink>
                    <NavLink to={'/favs'}>
                        <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Favorites</p>
                    </NavLink>
                    <hr />
                    
                    <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out' onClick={logout}>Sign Out</p>
                    
                    
                </motion.div> }
            </div>
        </header>
    )
}

export default Header