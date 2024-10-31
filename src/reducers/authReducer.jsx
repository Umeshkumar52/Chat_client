import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import instance, { multiPartInstance } from '../helper/axios'
import { toast } from 'react-toastify'
const initialState={
    user:JSON.parse(localStorage.getItem('user')) || {},
    isLogedIn:localStorage.getItem('isLogedIn') || false,
    NewUserProfile:{}
}
export const signUp =createAsyncThunk('/register',async(data)=>{
    try {
        const response= multiPartInstance.post('/auth/createUser',data)
        toast.promise(response,{
            pending:"Wait Account Proccesing...",
            success:'Account Created Successfully'
        })
        return (await response)
    } catch (error) {
         toast.error(error.response.data.message)
    }
})
export const login=createAsyncThunk('/login',async(data)=>{
    try {
        const response=instance.post(`/auth/login`,data)
        toast.promise(response,{
            pending:"Account Loging...",
            success:"Login Successfully"
        })
        return (await response)
    } catch (error) {
       toast.error(error.response.data.message)
    }
})
export const logout=createAsyncThunk('/logout',async()=>{
    try {
       const response= instance.get('/auth/logout')
       return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const updateUser=createAsyncThunk('/profile',async(data)=>{
 try {
    const response=multiPartInstance.put('/auth/update',data)
    return (await response)
 } catch (error) {
    toast.error(error.response.data.message)
 }
})
export const SearchUsers=createAsyncThunk('/searchUsers',async(data)=>{
    try {
        const response=instance.get(`/auth/user/${data}`)
        return (await response)
    } catch (error) {
       toast.error(error.response.data.message)
    }
})
export const userAndPosts=createAsyncThunk('/user',async(data)=>{
    try {
        const response=instance.get(`/auth/userWithAllPost/${data}`)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const following=createAsyncThunk('/following',async(data)=>{
    try {
        const response=instance.put(`/auth/following/${data.requester}/${data.reciever}`)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const unfollowing=createAsyncThunk('/unfollowing',async(data)=>{
    try {
        const response=instance.put(`/auth/unfollowing/${data.requester}/${data.reciever}`)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const userfollowing=createAsyncThunk('/userFollowing',async(data)=>{
    try {
        const response=instance.get(`/auth/following/${data}`)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
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
            if(action.payload){                
            localStorage.setItem("user",JSON.stringify(action.payload.data.message))
            localStorage.setItem("isLogedIn",true)
            state.user=action.payload.data.message
            state.isLogedIn=true
            }
        })
        .addCase(signUp.fulfilled,(state,action)=>{
            if(action.payload){
            localStorage.setItem("user",JSON.stringify(action.payload.data.message))
            localStorage.setItem("isLogedIn",true)
            state.user=action.payload.data.message
            state.isLogedIn=true
        }
        })
        .addCase(logout.fulfilled,(state,action)=>{
            if(action.payload.data){
            localStorage.removeItem("user")
            localStorage.removeItem("isLogedIn")
            state.user={}
            state.isLogedIn=false
            }else{
                return
            }
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            if(action.payload){
                localStorage.setItem("user",JSON.stringify(action.payload.data.message))
                state.user=action.payload.data.message
                state.isLogedIn=true
            }
        })
        .addCase(userAndPosts.fulfilled,(state,action)=>{
            if(action.payload){
                state.NewUserProfile=action.payload.data.message
            }
        })
    }
})
export const {}=auth.actions
export default auth.reducer