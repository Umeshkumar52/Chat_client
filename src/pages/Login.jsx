import React, { Suspense, useState } from 'react'
import { useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import GoogleAuth from '../components/GoogleAuth';
import { ToastContainer } from 'react-toastify';
import SignInSchema from '../zodSchemas/SignInSchema';
export default function Login() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[validationError,setValidationError]=useState()
  const [loginData,setloginData]=useState({
    Email:'',
    Password:''
  })
  async function loginDetail(event){
     const {name,value}=event.target;
     setloginData({
     ...loginData,
     [name]:value  
    })}
   async function onLogin(event){
      event.preventDefault();
      const validate=SignInSchema.safeParse(loginData)      
      if(validate.success){
     const response=await dispatch(login({
       Email:validate.data.Email,
       Password:validate.data.Password
     }))
       if(response.payload){
        navigate('/')
       } 
      } else{
        const formated=validate.error.format()
        setValidationError({
         Email:formated?.Email?._errors[0],
         Password:formated?.Password?._errors[0],
        })
      }   
   }   
  return (
    <div className='flex flex-col justify-center items-center py-6 px-2'>
    <form onSubmit={onLogin} className='w-full max-w-[25rem] flex flex-col items-center justify-center rounded-lg p-3 gap-5'>
       <h1 className='font-bold text-3xl text-[#212ed9]'>Login</h1>
          <div className='w-full flex flex-col gap-4'>
              <div>
             <input type='Email' onChange={loginDetail} name='Email' value={loginData.Email} placeholder='Enter E-mail or Phone...'  className='w-full outline-none border-2 border-black p-3 rounded'/>
             <h1 className='h-4 text-red-600 font-semibold'>{validationError?.Email}</h1>
             </div>
             <div className='flex w-full flex-col gap-2'>
             <input type='password' onChange={loginDetail} name='Password' value={loginData.Password} placeholder='Enter your Password...' className='w-full outline-none border-2 border-black p-3 rounded'/>
              <h1 className='h-4 text-red-600 font-semibold'>{validationError?.Password}</h1>
             <Link to='/forgetpassword' className='font-bold text-blue-700 hover:text-blue-900'>Forget password</Link>
             </div>
             <button className=' w-full bg-green-700 hover:bg-[#1d9119f6] text-white p-3 text-xl font-extrabold rounded'>Login</button>                
              <p className='text-xl font-semi-bold'>
              <span className='text-yellow-500'>I have not a account ?</span> <Link to='/sign-up' className='text-blue-800'>Register</Link>
              </p>
              {/* <GoogleAuth/> */}
          </div>
    </form>
    <ToastContainer/>
  </div>
  )
}

