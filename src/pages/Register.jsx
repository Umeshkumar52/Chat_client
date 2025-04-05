import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { signUp } from '../reducers/authReducer'
import {useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import GoogleAuth from '../components/GoogleAuth'
import SignUpSchema from '../zodSchemas/SignUpSchema'
import { ToastContainer } from 'react-toastify'
export default function Register() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const[validationErrors,setValidationErros]=useState()
  const[userData,setUserData]=useState({
    Email:"",
    Name:"",
    UserName:"",
    Password:""
  })
  const[Profile,setProfile]=useState()
  const[ProfileBlobUrl,setProfileBlobUrl]=useState()
  async function registerUserHandler(event) {
    event.preventDefault()
    const validate=SignUpSchema.safeParse(userData)
    if(validate.success){
    const formData=new FormData()
    formData.append("avatar",Profile)
    formData.append("Email",validate.data.Email)
    formData.append("UserName",validate.data.UserName)
    formData.append("Name",validate.data.Name)
    formData.append("Password",validate.data.Password)
    const response=await dispatch(signUp(formData))
    if(response?.payload){
      navigate('/')
    }
  }else{
    const formated=validate.error.format()
    setValidationErros({
      Email:formated?.Email?._errors[0],
     Name:formated?.Name?._errors[0],
    UserName:formated?.UserName?._errors[0],
    Password:formated?.Password?._errors[0],
    avatar:formated?.avatar?._errors[0]
    })
  }

  }  
  function userDataHandler(event){
    event.preventDefault()
    const{name,value}=event.target
    setUserData({...userData,
      [name]:value
    })
  }
  function profileChangeHandler(event){
       event.preventDefault()
       if(event.target.files[0].type=="image/jpeg" || event.target.files[0].type=="image/png"){
       setProfile(event.target.files[0])
       setProfileBlobUrl(URL.createObjectURL(event.target.files[0]))
       }else{
        alert("Please Select only Image file ")
       }
  }     
  return (
    <div className='hiddenScrollBar overflow-y-scroll w-full h-[100vh] px-2 py-8 flex justify-center'>
         <div className='w-full max-w-[25rem] flex flex-col'>
          <h1 className='text-2xl font-medium text-center text-[#0cff86]'>Registration</h1>
         <form id='myForm' onSubmit={registerUserHandler} noValidate className='space-y-1'>
         <div className='flex flex-col items-center gap-4'>
              <label htmlFor='Profile'>
              {ProfileBlobUrl?
              <img className='w-10 h-10 border-2 border-indigo-600 cursor-pointer border-double rounded-full' src={ProfileBlobUrl}/>:
              <CgProfile className='w-10 h-10 cursor-pointer text-8xl'/>
              }
              </label>
             <input onChange={profileChangeHandler} type='file' id='Profile' name='Profile' className='Profile hidden border-2 border-black w-full p-2 font-medium ' placeholder='Enter your UserName'/>
            <h1 className='h-4 text-red-600 font-semibold'>{validationErrors?.avatar}</h1>
             </div>
             <div className='flex flex-col'>
             <label className='font-semibold text-xl' htmlFor='Email'>Email: </label>
             <input onChange={userDataHandler} type='Email' name='Email' className='border-2 border-black w-full p-2 font-medium ' placeholder='Enter Email or Phone'/>
             <h1 className='h-4 text-red-600 font-semibold'>{validationErrors?.Email}</h1>
             </div>
             <div className='flex flex-col'>
             <label className='font-semibold text-xl' htmlFor='Name'>Name: </label>
             <input onChange={userDataHandler} type='text' name='Name' className='border-2 border-black w-full p-2 font-medium ' placeholder='Enter Your Name...'/>
             <h1 className='h-4 text-red-600 font-semibold'>{validationErrors?.Name}</h1>
             </div>
             <div className='flex flex-col'>
             <label className='font-semibold text-xl' htmlFor='UserName'>UserName: </label>
             <input onChange={userDataHandler} type='text' name='UserName' className='border-2 border-black w-full p-2 font-medium ' placeholder='Enter your UserName'/>
             <h1 className='h-4 text-red-600 font-semibold'>{validationErrors?.UserName}</h1>
             </div>
             <div className='flex flex-col'>
             <label className='font-semibold text-xl' htmlFor='Password'>Password: </label>
             <input id='password' onChange={userDataHandler} type='password' name='Password' className='border-2 border-black w-full p-2 font-medium ' placeholder='Enter Strong Password...'/>
             <h1 className='h-4 text-red-600 font-semibold'>{validationErrors?.Password}</h1>
             </div>
               <div>
              <button type='submit' className='w-full mt-6 bg-green-600 hover:bg-green-700 text-white p-2 font-semibold flex justify-center text-lg'>Register</button>             
              </div>
              <p className='text-lg '>Already have an account <Link to="/sign-in" className='text-indigo-800 hover:text-indigo-900 font-medium'>Login</Link></p>
              <GoogleAuth/>
          </form>
         </div>
         <ToastContainer/>
    </div>
  )
}
