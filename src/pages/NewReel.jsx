import React, { useEffect, useRef, useState } from 'react'
import {IoIosArrowBack} from 'react-icons/io'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer } from 'react-toastify';
import { newReel } from '../reducers/reelsReducer';
export default function NewReel() {
  const user=useSelector((state)=>{return state.auth.user})
  const videoRef=useRef(null)
  const dispatch=useDispatch()
    const navigate=useNavigate()
    const[file,setFile]=useState(null)
    const[blobUrl,setBlobUrl]=useState({
      type:"",
      url:""
    })
    const inputReset=useRef()
    function inputResetHandler(){
        if(inputReset.current){
          inputReset.current.value="";
          inputReset.current.type="text";
          inputReset.current.type="file"
        }
      }
      function fileChangeHandler(event){
        event.preventDefault()
        setFile(event.target.files[0])  
        if(event.target.files[0]){   
        setBlobUrl({
          type:event.target.files[0].type,
          url:URL.createObjectURL(event.target.files[0])
        })}
      }
    async function createPostHandler(event){
        event.preventDefault()
        const formData=new FormData()
        formData.append("reel",file)
        navigate('/') 
         await dispatch(newReel({user_id:user._id,formData}))
        inputResetHandler()
          setFile(null) 
     }
   const inputFile=useRef(null) 
   function fileTabHandler(){
    inputFile.current.click()
   }  
    useEffect(()=>{
       fileTabHandler()  
    },[file])  
   if(file){
    if(!file.type.includes("video")){
       alert("Only Video file are allowed")
    }
    document.getElementById("videoDiv").style.width="100%"
   }
  return (
    <div>
        <div className='flex justify-between px-2 border-b-2 py-2'>
        <IoIosArrowBack onClick={()=>navigate(-1) } className='text-3xl'/>
      <div className='flex w-full justify-center items-center'>
      <h2 className='font-medium text-lg'>Create Reel</h2> 
      </div>
      </div>
      {/* {(blobUrl)? */}
     <div id='videoDiv' className='relative w-[0px] h-[90vh] '>
        <input ref={inputFile} accept='video/*' onChange={fileChangeHandler} type='file' className='hidden' id='file' name='file' />
       <video autoPlay loop src={blobUrl.url}/>
       <div className='absolute right-4 top-6 h-[20rem] w-[5rem]'>

      </div>
      <div className='absolute w-full flex justify-end bottom-4 px-3 '>
       <button onClick={createPostHandler} className='bg-indigo-600  px-4 py-2 text-white text-lg font-semibold rounded-lg'>Next</button>
    </div>
     </div>
     {/* :""
    } */}
    <ToastContainer/>
    </div>
  )
}
