import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { resetPassword } from '../reducers/authReducer'
import ResetPasswordSchema from '../zodSchemas/ResetPasswordSchema'
import LoadingSpinner from '../components/LoadingSpinner'
export default function ResetPassword() {
   const dispatch=useDispatch()
   const navigate=useNavigate()
   const[passSaveInProgress,setPassSaveInProgress]=useState(false)
   const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
   const[passwordData,setPasswordData]=useState({
      NewPassword:"",
      ConfirmPassword:""
   })
   const[validateErr,setValidateErr]=useState({
      NewPasswordErr:"",
      ConfirmPasswordErr:""
   })
   function inputHandler(event){
      event.preventDefault()
      const {name,value}=event.target
      setPasswordData({
        ...passwordData,
         [name]:value
      })
   }
   async function resetPasswordHandler(event) {
      event.preventDefault()
     const validate=ResetPasswordSchema.safeParse(passwordData)
     const passwordMatch=passwordData.NewPassword==passwordData.ConfirmPassword
       if(validate.success && passwordMatch ){
         setPassSaveInProgress(true)
           const response=await dispatch(resetPassword({forgetPasswordToken:token,newPassword:passwordData.ConfirmPassword}))
           if(response?.payload?.data?.success){
            setTimeout(()=>{
               navigate('/sign-in')
            },500)
           }else{
           setPassSaveInProgress(false)
           }
      }else{
         const formatErr=validate?.error?.format()
         setValidateErr({
             NewPasswordErr: formatErr?.NewPassword?._errors[0],
            ConfirmPasswordErr:!passwordMatch&&"Password does not match"
         })
         
      }
   }
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
       <div className='shadow-lg rounded-xl px-10 py-14  w-full max-w-[30rem] flex flex-col gap-8'>
        <div className='flex flex-col items-center'>
            <h1 className='text-3xl font-semibold'>Reset Password</h1>
            <h5 className='text-sm text-slate-600'>Please enter your new password</h5>
        </div>
      <form onSubmit={resetPasswordHandler} className='space-y-4'>
         <div className='flex flex-col'>
            <label htmlFor='Newpassword' className='text-lg font-medium'>New Password <span className='text-red-600'>*</span></label>
            <input type='text' onChange={inputHandler} className='text-lg p-2 rounded-lg outline-none border-2' name='NewPassword' placeholder='Create new password'/>
           <p className='text-red-600 text-sm'>{validateErr?.NewPasswordErr}</p>
         </div>
         <div className='flex flex-col'>
            <label htmlFor='ConfirmPassword' className='text-lg font-medium'>Re-enter Password <span className='text-red-600'>*</span></label>
            <input type='text' onChange={inputHandler} className='text-lg p-2 rounded-lg outline-none border-2' name='ConfirmPassword' placeholder='Confirm your password'/>
           <p className='text-red-600 text-sm'>{validateErr?.ConfirmPasswordErr}</p>
         </div>
         <button type='submit' className='w-full bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-medium p-2 rounded-lg'>Reset Password</button>
      </form>
      </div>
       {passSaveInProgress && <LoadingSpinner />}
       <ToastContainer/>
    </div>
  )
}
