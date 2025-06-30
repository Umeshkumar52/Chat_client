import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {userfollowing} from '../reducers/authReducer'
import UserFollowerCard from '../components/UserFollowerCard'
import UserFollowingCard from '../components/UserFollowingCard'
import FriendsSkelenton from '../skeletons/FriendsSkelenton'
 const FriendRequests=()=>{
  const user_id=useSelector((state)=>{
    return state.auth.user._id
  })     
  const dispatch=useDispatch()
  const[isLoading,setIsloading]=useState(false)
  const[followingData,setFollowing]=useState([])
  const[followerData,setFollower]=useState([]) 
  const url= window.location.pathname.split('/')
  async function user_following(){
    setIsloading(!isLoading)
    const response=await dispatch(userfollowing(user_id))
    if(response?.payload){
      setFollower((friends)=>[...friends,...response.payload?.data?.message?.Followers])
      setFollowing((friends)=>[...friends,...response.payload?.data?.message?.Following])
      setIsloading(false)
    }
  }
  useEffect(()=>{
    user_following()
  },[])  
  return (
    <div className={`${url[url.length-1]=="friendRequest"&&"lg:pr-[14rem]"}`}>
    <div className='hiddenScrollBar bg-white w-full h-screen space-y-2 overflow-y-scroll'>
      <fieldset className='w-full space-x-2 space-y-6 py-2'>
      <input id='following' defaultChecked className='peer/following hidden' name='status' type="radio" />
      <label htmlFor="following" className='peer-checked/following:text-sky-500 text-lg px-6 font-semibold '>Following <span>{followingData.length}</span></label>
      <input id='follow' className='peer/follow hidden' name='status' type="radio" />
      <label htmlFor="follow" className='peer-checked/follow:text-sky-500 text-lg  font-semibold'>Followers <span>{followerData.length}</span></label>
     <div className='hidden peer-checked/following:block'>
     {followingData?.length>0?
       followingData.map((Element,index)=>{
            return <UserFollowingCard key={index} data={Element}/>
       }):<div className='flex flex-col gap-2'>
       {
        isLoading? 
        <div className='flex flex-col gap-4'>
       <FriendsSkelenton/>
       <FriendsSkelenton/>
        </div>:
        <p className='flex justify-center'>No Following</p>
       }
        
       </div>
     }
     </div>
     <div className='hidden peer-checked/follow:block'>
     {followerData?.length>0?
       followerData.map((Element,index)=>{        
            return <UserFollowerCard key={index} data={Element}/>
       }):
       <div className='flex flex-col gap-2'>
       {
        isLoading? 
        <div className='flex flex-col gap-4'>
       <FriendsSkelenton/>
       <FriendsSkelenton/>
        </div>:
        <p className='flex justify-center'>No Following</p>
       }
        
       </div>
     }
     </div>
     </fieldset>
    </div>
    </div>
  )
}
export default FriendRequests
