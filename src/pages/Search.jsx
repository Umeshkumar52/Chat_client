import React, {useState } from 'react'
import SearchBar from './SearchBar'
import SearchUserList from './SearchUserList'
import { SearchUsers } from '../reducers/authReducer'
import { useDispatch } from 'react-redux'
export default function Search({searching,setSearching}) {
     const[userData,setUserData]=useState([])
     const dispatch=useDispatch()
      async function user(data){
        const response=await dispatch(SearchUsers(data))
        if(response.payload){
         setUserData((prev)=>[...prev,...response.payload.data.message])
        }
      }  
  return (
    <div className='hiddenScrollBar bg-white py-4 fixed top-0 Md:top-auto md:left-auto md:right-auto md:w-[40vw] w-full h-screen space-y-4'>
      <SearchBar searching={searching} setSearching={setSearching} updateSearchTerm={(data)=>user(data)}/>
      <SearchUserList type="toProfile" data={userData}/>
    </div>
  )
}
