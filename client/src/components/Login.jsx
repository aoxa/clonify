import React, { useEffect } from 'react'
import {FcGoogle} from 'react-icons/fc'
import { app } from '../config/firebase.config'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { validateUser } from '../api'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { LoginBg } from '../assets/video'

const Login = ({setAuth}) => {
  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()
  const [{user}, dispatch] = useStateValue()
  const navigate = useNavigate()

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider)

    firebaseAuth.onAuthStateChanged((userCreds)=>{
      if(userCreds) {
        setAuth(true)
        userCreds.getIdToken().then((token=>{
          validateUser(token).then((data)=>{
            dispatch({
              type: actionType.SET_USER,
              user: data,
            })
          })
        }))
        window.localStorage.setItem('auth', 'true')
        navigate('/', {replace:true})
      } else {
        setAuth(false)
        dispatch({
          type: actionType.SET_USER,
          user: null,
        })
        window.localStorage.setItem('auth', 'false')
      }
    })
  }

  useEffect( () => {
    if('true' === window.localStorage.getItem('auth')) navigate('/', {replace:true})
  }, [])

  return (
    <div className='relative h-screen w-screen'>
      <video src={LoginBg}
        type='video/mp4'
        autoPlay
        muted
        loop 
        className='w-full h-full'/>
        <div className='absolute inset-0 bg-darkOverlay flex items-center justify-center p-4'>
            <div className='w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex justify-center'>
                <div className='flex items-center justify-center gap-2 px-4 py-2 rounded-md
                 bg-cardOverlay cursor-pointer hover:bg-card hover: shadow-md duration-100 ease-in-out transition-all'
                 onClick={loginWithGoogle}>

            <FcGoogle className=' text-xl'/>
            Sign in with Google
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login