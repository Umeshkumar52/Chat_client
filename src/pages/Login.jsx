import React, { useState } from 'react'
import { useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer } from 'react-toastify';
export default function Login() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
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
     const response=await dispatch(login(loginData))
     if(response.payload.data){
      navigate('/')
     }
   }   
  return (
    <div className='h-screen w-full flex justify-center items-center'>
    <form onSubmit={onLogin} className='w-[20rem] flex flex-col items-center justify-center rounded-lg p-3 gap-5'>
       <h1 className='font-bold text-3xl text-[#212ed9]'>Login</h1>
          <div className=' w-full flex flex-col items-center justify-center gap-4'>
             <input type='Email' onChange={loginDetail} name='Email' value={loginData.Email} placeholder='Enter E-mail or Phone...'  className='w-full border-2 p-3 rounded'/>
             <div className='flex w-full flex-col gap-2'>
             <input type='password' onChange={loginDetail} name='Password' value={loginData.Password} placeholder='Enter your Password...' className='w-full border-2 p-3 rounded'/>
             <Link to='/forgetpassword' className='font-extrabold text-blue-700 hover:text-blue-900'>Forget password</Link>
             </div>
             <button className=' w-full bg-green-400 hover:bg-[#1d9119f6] text-white p-3 text-xl font-extrabold rounded'>Login</button>                
              <p className='text-xl font-semi-bold'>
              <span className='text-yellow-500'>I have not a account ?</span> <Link to='/register' className='text-blue-800'>Register</Link>
              </p>
          </div>
    </form>
    <ToastContainer/>
  </div>
  )
}

