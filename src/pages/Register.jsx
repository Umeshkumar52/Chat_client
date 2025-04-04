import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { signUp } from '../reducers/authReducer'
import {useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer } from 'react-toastify';
import GoogleAuth from '../components/GoogleAuth'
export default function Register() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const[userData,setUserData]=useState({
    Email:"",
    Name:"",
    UserName:"",
    Password:""
  })
  const[Profile,setProfile]=useState()
  const[ProfileBlobUrl,setProfileBlobUrl]=useState()
  const myForm=document.getElementById("myForm")
  const password=document.getElementById('password')
 const passwordMessage=document.getElementById('passwordMessage')
 if(password){
  password.addEventListener("input",function(event){
    event.preventDefault()
  const passwordInput=password.value;
  const strongPasswordReg=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if(strongPasswordReg.test(passwordInput)){
    passwordMessage.style.color='green'
    passwordMessage.textContent="Sronge Password"
  }else{
    passwordMessage.style.color='red'
    passwordMessage.textContent=`
    Password must be
    at least 8 characters long,
    with uppercase,
    lowercase,
    a number, 
    and a special character
    `
  }
 })}
 if(myForm){
  myForm.addEventListener("submit",function(event){
    event.preventDefault()
    let allfieldsFilled=true
    const inputs=myForm.querySelectorAll('input'); 
    inputs.forEach((input)=>{
      if(input.value==''){
        allfieldsFilled=false;
      }
    })
    if(!allfieldsFilled){
        event.preventDefault()
        passwordMessage.style.color='red'
        passwordMessage.textContent='All feilds are mandatory!'
        return
      }
  })}
  async function registerUserHandler(event) {
    event.preventDefault()
    const formData=new FormData()
    formData.append("avatar",Profile)
    formData.append("Email",userData.Email)
    formData.append("UserName",userData.UserName)
    formData.append("Name",userData.Name)
    formData.append("Password",userData.Password)
    const response=await dispatch(signUp(formData))
    if(response.payload){
      navigate('/')
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
    <div className=' flex flex-col py-6 px-2 items-center justify-center'>
         <div className='w-full max-w-[25rem] flex flex-col'>
          <h1 className='text-2xl font-medium text-center text-[#0cff86]'>Registration</h1>
         <form id='myForm' onSubmit={registerUserHandler} noValidate className='space-y-4'>
         <div className='flex flex-col items-center gap-4'>
              <label htmlFor='Profile'>
              {ProfileBlobUrl?
              <img className='w-10 h-10 border-2 border-indigo-600 cursor-pointer border-double rounded-full' src={ProfileBlobUrl}/>:
              <CgProfile className='w-10 h-10 cursor-pointer text-8xl'/>
              }
              </label>
             <input onChange={profileChangeHandler} type='file' id='Profile' name='Profile' className='Profile hidden border-2 border-black w-full p-2 font-medium ' placeholder='Enter your UserName'/>
             </div>
         <div className='flex flex-col'>
             <label className='font-semibold text-xl' htmlFor='Email'>Email: </label>
             <input onChange={userDataHandler} type='Email' name='Email' className='border-2 border-black w-full p-2 font-medium ' placeholder='Enter Email or Phone'/>
             </div>
             <div className='flex flex-col'>
             <label className='font-semibold text-xl' htmlFor='Name'>Name: </label>
             <input onChange={userDataHandler} type='text' name='Name' className='border-2 border-black w-full p-2 font-medium ' placeholder='Enter Your Name...'/>
             </div>
             <div className='flex flex-col'>
             <label className='font-semibold text-xl' htmlFor='UserName'>UserName: </label>
             <input onChange={userDataHandler} type='text' name='UserName' className='border-2 border-black w-full p-2 font-medium ' placeholder='Enter your UserName'/>
             </div>
             <div className='flex flex-col'>
             <label className='font-semibold text-xl' htmlFor='Password'>Password: </label>
             <input id='password' onChange={userDataHandler} type='password' name='Password' className='border-2 border-black w-full p-2 font-medium ' placeholder='Enter Strong Password...'/>
             </div>
             <span id='passwordMessage' className='text-red-700 whitespace-wrap'></span>
              <button type='submit' className='w-full bg-[#0cff86] text-white p-2 font-semibold flex justify-center text-lg'>Register</button>
              <p className='text-lg '>Already have an account <Link to="/sign-in" className='text-indigo-800 hover:text-indigo-900 font-medium'>Login</Link></p>
{/*               <GoogleAuth/> */}
          </form>
         </div>
         {/* <ToastContainer/> */}
    </div>
  )
}
