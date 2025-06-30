import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { checkUserName, signUp } from '../reducers/authReducer'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import SignUpSchema from '../zodSchemas/SignUpSchema'
import { ToastContainer } from 'react-toastify'
import Loader from '../components/Loader'
import UseDelay from '../helper/UseDelay'
export default function Register() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const{isSignUp}=useSelector(state=>state.auth)
  const[validationErrors,setValidationErros]=useState()
  const[userData,setUserData]=useState({
    Email:"",
    Name:"",
    UserName:"",
    Password:""
  })
  const[userNameMessage,setUserNameMessage]=useState(null)
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
  async function userNameExistance(UserName){
        const response=await dispatch(checkUserName(UserName))
        if(response?.payload?.data?.message=="available"){
          setUserNameMessage(response?.payload?.data?.message)
          setValidationErros({
            ...validationErrors,
            UserName:null
          })
        }else{        
        setValidationErros({
          ...validationErrors,
          UserName:response?.payload?.data?.message
        })
        setUserNameMessage(null)
      }
   } 
   const debounceCallBack=UseDelay((event)=>{
    userNameExistance(event?.target?.value)
    setUserData({
      ...userData,
      UserName:event?.target?.value
    })
  })
  return (
    <div className='hiddenScrollBar overflow-y-scroll h-[100vh] w-full flex items-center justify-center'>
         <div className='w-full max-w-[35rem] h-[40rem] bg-white/95 shadow-2xl py-6 md:p-8 px-2 mx-2 flex flex-col gap-2'>
          <h1 className='text-3xl font-semibold text-center text-indigo-600'>Registration</h1>
         <form id='myForm' onSubmit={registerUserHandler} noValidate className='w-full space-y-1 text-slate-700'>
         <div className='flex flex-col items-center'>
              <label htmlFor='Profile'>
              {ProfileBlobUrl?
              <img className='size-14 border-2 border-indigo-600 cursor-pointer border-double rounded-full' src={ProfileBlobUrl}/>:
              <CgProfile className='size-14 cursor-pointer text-8xl'/>
              }
              </label>
             <input onChange={profileChangeHandler} type='file' id='Profile' name='Profile' className='Profile hidden border-2 border-black w-full p-2 font-medium ' placeholder='Enter your UserName'/>
             <h1 className='h-4 text-red-600 font-semibold'>{validationErrors?.avatar}</h1>
             </div>
             <div className='flex flex-col'>
             <label className='font-semibold text-xl' htmlFor='Email'>Email: </label>
             <input onChange={userDataHandler} type='Email' name='Email' className='border-2 rounded-lg w-full p-2 font-medium outline-none' placeholder='Enter Email or Phone'/>
             <h1 className='h-4 text-red-600 font-semibold'>{validationErrors?.Email}</h1>
             </div>
             <div className='flex flex-col'>
             <label className='font-semibold text-xl' htmlFor='Name'>Name: </label>
             <input onChange={userDataHandler} type='text' name='Name' className='border-2 rounded-lg w-full p-2 font-medium outline-none' placeholder='Enter Your Name...'/>
             <h1 className='h-4 text-red-600 font-semibold'>{validationErrors?.Name}</h1>
             </div>
             <div className='flex flex-col'>
             <label className='font-semibold text-xl' htmlFor='UserName'>UserName: </label>
             <input onChange={debounceCallBack} type='text' name='UserName' className='border-2 rounded-lg w-full p-2 font-medium outline-none' placeholder='Enter your UserName'/>
             {userNameMessage?
             <h1 className='h-4 text-green-600 font-semibold'>{userNameMessage}</h1>:
             <h1 className='h-4 text-red-600 font-semibold'>{validationErrors?.UserName}</h1>             
             }
             </div>
             <div className='flex flex-col'>
             <label className='font-semibold text-xl' htmlFor='Password'>Password: </label>
             <input id='Password' onChange={userDataHandler} type='text' name='Password' className='border-2 rounded-lg w-full p-2 font-medium outline-none ' placeholder='Enter Strong Password...'/>
             <h1 className='h-4 text-red-600 font-semibold'>{validationErrors?.Password}</h1>
             </div>
               <div>
              <button type='submit' className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 text-2xl font-semibold rounded-lg">Sign-up</button>             
              </div>
              <p className='text-base '>Already have an account <Link to="/sign-in" className='text-indigo-600 hover:text-indigo-500'>Login</Link></p>
          </form>
         </div>
         {isSignUp&&<Loader/>}
         <ToastContainer/>
    </div>
  )
}
         