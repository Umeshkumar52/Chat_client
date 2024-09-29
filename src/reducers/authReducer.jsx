import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import instance, { multiPartInstance } from '../helper/axios'
import { toast } from 'react-toastify'
import { act } from 'react'
import { json } from 'react-router-dom'
const initialState={
    user:JSON.parse(localStorage.getItem('user')) || {},
    isLogedIn:localStorage.getItem('isLogedIn') || false
}
export const signUp =createAsyncThunk('/signup',async(data)=>{
    try {
        const response= instance.post('/auth/createUser',data)
        toast.promise(response,{
            pending:"Wait Account Proccesing",
            success:'Account Created Successfully'
        })
        return (await response)
    } catch (error) {
        return toast.error(error.response.data.message)
    }
})
export const login=createAsyncThunk('/login',async(data)=>{
    try {
        const response=instance.post(`/auth/login`,data)
        toast.promise(response,{
            pending:"Loging...",
            success:"Login Successfully"
        })
        console.log(await response);
        
        return (await response)
    } catch (error) {
      return toast.error(error.response.data.message)
    }
})
export const logout=createAsyncThunk('/logout',async()=>{
    try {
        console.log("logout Calling");
       const response= instance.get('/auth/logout')
       toast.promise(response,{
        pending:"Logouting",
        success:"Logout"
       },{
         autoClose:1500
       })
       return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const updateUser=createAsyncThunk('/profile',async(data)=>{
 try {
    const response=multiPartInstance.put('/auth/update',data)
    toast.promise(response,{
     pending:"Loading",
     success:"SuccesFully"
    })
 } catch (error) {
    toast.error(error.response.data.message)
 }
})
export const getUserByUserName=createAsyncThunk('/chats',async(data)=>{
    try {
        const response=instance.get(`/auth/user/${data}`)
        // toast.promise(response,{
        //     loading:"Loading...",
        //     success:"successfull"
        // })
        return (await response)
    } catch (error) {
      return toast.error(error.response.data.message)
    }
})
export const userAndPosts=createAsyncThunk('/user',async(data)=>{
    try {
        const response=instance.get(`/auth/userWithAllPost/${data}`)
        return (await response)
    } catch (error) {
       return toast.error(error.response.data.message)
    }
})
export const following=createAsyncThunk('/',async(data)=>{
    try {
        const response=instance.put(`/auth/following/${data.requester}/${data.reciever}`)
        return (await response)
    } catch (error) {
       return toast.error(error.response.data.message)
    }
})
export const unfollowing=createAsyncThunk('/',async(data)=>{
    try {
        const response=instance.put(`/auth/unfollowing/${data.requester}/${data.reciever}`)
        return (await response)
    } catch (error) {
       return toast.error(error.response.data.message)
    }
})
export const userfollowing=createAsyncThunk('following',async(data)=>{
    try {
        const response=instance.get(`/auth/following/${data}`)
        return (await response)
    } catch (error) {
       return toast.error(error.response.data.message)
    }
})
export const userfollower=createAsyncThunk('following',async(data)=>{
    try {
        const response=instance.get(`/auth/follower/${data}`)
        return (await response)
    } catch (error) {
       return toast.error(error.response.data.message)
    }
})
const auth=createSlice({
    name:'auth',
    initialState,
    reducers:{
    },
    extraReducers:builder=>{
        builder
        .addCase(login.fulfilled,(state,action)=>{
            console.log(action.payload.data);
            if(action.payload.data){                
            localStorage.setItem("user",JSON.stringify(action.payload.data.message))
            localStorage.setItem("isLogedIn",true)
            state.user=action.payload.data.message
            state.isLogedIn=true
            }
        })
        .addCase(signUp.fulfilled,(state,action)=>{
            if(action.payload.data){
            localStorage.setItem("user",JSON.stringify(action.payload.data.message))
            localStorage.setItem("isLogedIn",true)
            state.user=action.payload.data.message
            state.isLogedIn=true}
        })
        .addCase(logout.fulfilled,(state,action)=>{
            console.log(action.payload.data);
            
            if(action.payload.data){
            localStorage.clear()
            state.user={}
            state.isLogedIn=false
            }else{
                return
            }
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            if(action.payload.data){
                localStorage.setItem("user",JSON.stringify(action.payload.data.message))
                state.user=action.payload.data.message
                
            }
        })
    }
})
export const {}=auth.actions
export default auth.reducer