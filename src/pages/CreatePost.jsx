import React, { useRef, useState } from 'react'
import {IoIosArrowBack} from 'react-icons/io'
import { CgProfile } from "react-icons/cg";
import { MdCancel, MdOutlineCancel, MdOutlineLibraryAdd } from 'react-icons/md';
import { FaRegFileImage } from 'react-icons/fa6';
import {FaFileImage} from 'react-icons/fa6'
import MultiPostCard from '../components/MultiPostCard';
import {useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { newSocialPost } from '../reducers/socialPostController';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer } from 'react-toastify';
export default function CreatePost() {
  const {state}=useLocation()
  const user_id=useSelector((state)=>{return state.auth.user._id})
  const videoRef=useRef(null)
  const dispatch=useDispatch()
    const navigate=useNavigate()
    const[file,setFile]=useState(null)
    const[isPlaying,setIsPlaying]=useState(false)
    const[multiFiles,setMultiFiles]=useState([])
    const[blobUrl,setBlobUrl]=useState({
      type:"",
      url:""
    })
    const[description,setDescription]=useState("")
    let textAre=document.querySelector("#textArea")
    // const[multipleblobUrl,setMultipleBlobUrl]=useState([])
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
    //    function multFilesHandler(event){
    //   event.preventDefault()
    //   for(let i=0;i<event.target.files.length;i++){
    //     setMultiFiles((files)=>[...files,event.target.files[i]])
    //      let len=event.target.files[i].name.split('.')
    //     setMultipleBlobUrl((url)=>[...url,{
    //       url:URL.createObjectURL(event.target.files[i]),
    //       formate:len[len.length-1]
    //     }])
    //   }      
    // }    
    async function createPostHandler(event){
        event.preventDefault()
        const formData=new FormData()
        formData.append("file",file)
        formData.append("description",description)
        navigate(-1)  
         await dispatch(newSocialPost({user_id,formData}))
        setDescription("") 
        inputResetHandler()
        setFile(null) 
     }
      function textArea(event){
        // textAre.style.height ='25px'
        // console.log(textAre.scrollHeight);
        // textAre.style.height=textAre.scrollHeight + "px"
        
      }
     function videoPlayingHandler(){
      if(isPlaying==false){
        setIsPlaying(true)
        videoRef.current.play()
      }else{
        videoRef.current.pause()
        setIsPlaying(false)
      }
     }
  return (
    <div className='w-full h-[100%] flex flex-col gap-4'>
        <div className='flex justify-between px-2 border-b-2 py-2'>
      <div className='flex gap-2'>
         <IoIosArrowBack onClick={()=>navigate(-1) } className='text-3xl'/>
         <h2 className='font-medium text-lg'>Create post</h2>
      </div>
      <button onClick={createPostHandler} className='w-20 bg-[#0846fe] text-white font-semibold rounded-md py-1'>Post</button>
      </div>
      <div className='hiddenScrollBar space-y-6 h-[90vh] py-2 overflow-y-scroll'>
      <div className='flex flex-col gap-2'>
      <div className='px-2 flex flex-col gap-3'>
        <div className='flex items-center gap-2'>
        <div className='w-10 h-10 cursor-pointer border-2 border-[#be03ed] rounded-full'>
         {state.avatar?
         <img src={state.avatar} className='w-full h-full'/>:
          <CgProfile className='w-full h-full text-4xl'/>
          }
         </div>
          <h2 className='font-semibold text-lg'>{state.UserName}</h2>
        </div>
        <textarea onInput={textArea} onChange={(event)=>{
          event.preventDefault()
          setDescription(event.target.value)
        }} cols='auto' name='description' id='textArea' autoFocus className='text-lg text-decoration-none' placeholder='Say something about this post...'/>
      </div>
      {/* Selecting img */}
        <div className='flex flex-col gap-3'>
        {/* {blobUrl? */}
        <div className='flex justify-center items-center'>
         {blobUrl.url?
          <div className='relative p-2'>
         {blobUrl.type.split("/")[0]=="video"?
         <video ref={videoRef} onClick={videoPlayingHandler} id='videoPlayer' src={blobUrl.url} />:
         <img src={blobUrl.url}/> 
         }
          <MdOutlineCancel onClick={()=>setBlobUrl("")} className='absolute top-0 right-0 text-black hover:text-red-600 text-3xl'/>
          </div>:""}
         
        {/* <div className='flex flex-wrap'>
        {  multipleblobUrl.map((Element)=>{
            return <MultiPostCard key={Element.url} url={Element}/>
        })
        }
        </div> */}
       
        </div>  
      {/* { multipleblobUrl.length>=1?      
        <div className='flex flex-col items-center justify-center'>
        <label htmlFor='addMore' className='p-2 bg-slate-200 rounded-full'>
           <MdOutlineLibraryAdd  className='addMore text-2xl'/>
        </label>
        <h1>Add more</h1>
        <input type='file' ref={inputReset} onChange={multFilesHandler} multiple id='addMore' name="addMore" className='addMore hidden' />
        </div>:""
        } */}
      </div>
      <div className='file cursor-pointer border-b-2 border-t-2'>
      <label htmlFor='file' className='w-full flex p-2 hover:bg-slate-300'>
           <FaFileImage  className='text-2xl text-green-600'/>
         <h2>Photo/Video</h2>
        </label>
        <input type='file' accept='image/*,video/*' ref={inputReset} onChange={fileChangeHandler} multiple id='file' name="file" className='file hidden' />
        </div>
     </div>
     </div>
    </div>
  )
}
