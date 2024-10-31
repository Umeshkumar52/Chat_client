import React, {useState } from 'react'
import SearchBar from './SearchBar'
import SearchUserList from './SearchUserList'

export default function Search() {
    const[searchUser,setSearchUser]=useState()
  return (
    <div className='space-y-4'>
      <SearchBar  updateSearchTerm={(data)=>setSearchUser(data)}/>
      <SearchUserList key={searchUser} type="toProfile" data={searchUser}/>
    </div>
  )
}
