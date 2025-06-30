import {useState } from 'react'
import SearchBar from './SearchBar'
import SearchUserList from './SearchUserList'
import { SearchUsers } from '../reducers/authReducer'
import { useDispatch } from 'react-redux'
import { TbLoader2 } from 'react-icons/tb'
export default function Search({searching,setSearching}) {
     const[userData,setUserData]=useState([])
     const[loading,setLoading]=useState(false)
     const dispatch=useDispatch()
      async function user(data){
        if(data){
          setLoading(true)
        const response=await dispatch(SearchUsers(data))
        if(response.payload){
          setLoading(false)
         setUserData(response.payload.data.message)
        }}
      }  
  return (
    <div className='hiddenScrollBar fixed md:relative top-0 Md:top-auto md:left-auto md:right-auto md:w-[40vw] bg-white rounded-lg py-4 my-[.5rem] w-full h-[100vh]'>
      <SearchBar searching={searching} setSearching={setSearching} updateSearchTerm={(data)=>user(data)}/>
      {userData.length>0?
      <SearchUserList type="toProfile" data={userData}/>:
       <div className=' w-full h-full flex justify-center items-center'>
        {loading&&<TbLoader2 className='animate-spin  size-16'/>}
        {/* <h1>User not foond !</h1> */}
       </div>
      }
    </div>
  )
}
