import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { signUp } from '../reducers/authReducer'
import {useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer } from 'react-toastify';
export default function Register() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const form1=document.getElementById("form1")
  const form2=document.getElementById("form2")
  const form3=document.getElementById("form3")
  const form4=document.getElementById("form4")
  const form5=document.getElementById("form5")
  const form6=document.getElementById("form6")
  const[userData,setUserData]=useState({
    Email:"",
    Phone:"",
    Name:"",
    UserName:"",
    Password:"",
    avatar:""
  })
  const[Profile,setProfile]=useState()
  const[ProfileBlobUrl,setProfileBlobUrl]=useState()
  async function registerUserHandler(event) {
    event.preventDefault()
    const formData=new FormData()
    formData.append("avatar",userData.avatar)
    formData.append("Email",userData.Email)
    formData.append("Phone",userData.Phone)
    formData.append("UserName",userData.UserName)
    formData.append("Name",userData.Name)
    formData.append("Password",userData.Password)
    const response=await dispatch(signUp(formData))
    console.log(response);
     
    if(!response.payload.data){
    //  window.location.reload()
    navigate('/login')
    }else{
      navigate('/home')
    }
  }  
  function userDataHandler(event){
    event.preventDefault()
    const{name,value}=event.target
    setUserData({...userData,
      [name]:value
    })
  }
  function form1Handler(event){
    event.preventDefault()
    form1.style.left="-20rem"
    form2.style.left="0rem"
  }
  function form2Handler(event){
    event.preventDefault()
    form2.style.left="-20rem"
    form3.style.right="0rem"
  }
  function form3Handler(event){
    event.preventDefault()
    form3.style.left="-20rem"
    form4.style.right="0rem"
  }
  function form4Handler(event){
    event.preventDefault()
    form4.style.left="-20rem"
    form5.style.right="0rem"
  }
  function form5Handler(event){
    event.preventDefault()
    form5.style.left="-20rem"
    form6.style.right="0rem"
  }
  return (
    <div className='w-full h-screen px-2 flex justify-center items-center'>
        <div className='relative w-[20rem] h-[20rem] flex justify-center items-center'>
         <form name="form1" id='form1' className='w-full absolute flex flex-col gap-9'> 
         <div className='flex justify-center'>
           <h1 className='text-2xl font-semibold'>Register</h1>
           </div>
             <div className='flex flex-col'>
             <label className='font-semibold text-xl' htmlFor='Email'>Email: </label>
             <input onChange={userDataHandler} type='Email' required name='Email' className='border-2 border-black w-full p-2 font-medium ' placeholder='Enter Email'/>
             </div>
             <div className='flex justify-end'>
             <button onClick={form1Handler} className='w-28 rounded-lg  p-1.5 text-lg font-semibold text-white bg-[#1304df]'>Next</button>
             </div>
             <p className='text-xl font-semibold'>
              <span className='text-yellow-500'>I have allready a account ?</span> <Link to='/login' className='text-blue-800'>Login</Link>
              </p>
            
         </form>
         <form name="form2" id='form2' className='w-full absolute -right-[20rem] flex flex-col gap-9'> 
             <div className='flex flex-col'>
             <label className='font-semibold text-xl' htmlFor='Phone'>Phone: </label>
             <input onChange={userDataHandler} type='Phone' required name='Phone' className='border-2 border-black w-full p-2 font-medium ' placeholder='Enter Phone Number'/>
             </div>
             <div className='flex justify-end'>
             <button onClick={form2Handler} className='w-28 rounded-lg  p-1.5 text-lg font-semibold text-white bg-[#1304df]'>Next</button>
             </div>
         </form>
         <form name="form3" id='form3' className='w-full absolute -right-[20rem] flex flex-col gap-9'> 
             <div className='flex flex-col'>
             <label className='font-semibold text-xl' htmlFor='Name'>Name: </label>
             <input onChange={userDataHandler} type='text' required name='Name' className='border-2 border-black w-full p-2 font-medium ' placeholder='Enter Your Name...'/>
             </div>
             <div className='flex justify-end'>
             <button onClick={form3Handler} className='w-28 rounded-lg  p-1.5 text-lg font-semibold text-white bg-[#1304df]'>Next</button>
             </div>
            
         </form>
         <form name="form4" id='form4' className='w-full absolute -right-[20rem] flex flex-col gap-9'> 
             <div className='flex flex-col'>
             <label className='font-semibold text-xl' htmlFor='UserName'>UserName: </label>
             <input onChange={userDataHandler} type='text' required name='UserName' className='border-2 border-black w-full p-2 font-medium ' placeholder='Enter your UserName'/>
             </div>
             <div className='flex justify-end'>
             <button onClick={form4Handler} className='w-28 rounded-lg  p-1.5 text-lg font-semibold text-white bg-[#1304df]'>Next</button>
             </div>
         </form>
         <form name="form5" id='form5' className='w-full absolute -right-[20rem] flex flex-col gap-9'> 
             <div className='flex flex-col'>
             <label className='font-semibold text-xl' htmlFor='Password'>Password: </label>
             <input onChange={userDataHandler} type='password' required name='Password' className='border-2 border-black w-full p-2 font-medium ' placeholder='Enter Strong Password...'/>
             </div>
             <div className='flex justify-end'>
             <button onClick={form5Handler} className='w-28 rounded-lg  p-1.5 text-lg font-semibold text-white bg-[#1304df]'>Next</button>
             </div>
         </form>
         <form name="form6" id='form6' className='w-full absolute -right-[20rem] flex flex-col gap-9'> 
             <div className='flex flex-col items-center gap-4'>
              <label htmlFor='Profile'>
              {ProfileBlobUrl?
              <img className='w-20 h-20 border-2 border-indigo-600 cursor-pointer border-double rounded-full' src={ProfileBlobUrl}/>:
              <CgProfile className='w-20 h-20 cursor-pointer text-8xl'/>
              }
              </label>
             <input onChange={(event)=>{
              event.preventDefault()
              setProfileBlobUrl(URL.createObjectURL(event.target.files[0]))
              // setProfile(event.target.files[0])
              let img=event.target.files[0]
              setUserData({...userData,
                avatar:img
              })
             }} type='file' id='Profile' required name='Profile' className='Profile hidden border-2 border-black w-full p-2 font-medium ' placeholder='Enter your UserName'/>
             <h1 className='text-2xl font-semibold'>Profile</h1>
             </div>
             <div className='flex justify-end'>
             <button onClick={registerUserHandler} className='w-28 rounded-lg  p-1.5 text-lg font-semibold text-white bg-[#1304df]'>submit</button>
             </div>
         </form>
         </div>
         <ToastContainer/>
    </div>
  )
}
