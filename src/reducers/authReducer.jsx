import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import instance, { multiPartInstance } from '../helper/axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
const initialState={    
    user:Cookies.get("auth")?JSON.parse(Cookies.get("auth")):null,
    isLogedIn:Cookies.get("auth")?true:false,
    NewUserProfile:{}
}
export const signUp =createAsyncThunk('/register',async(data)=>{
    try {
        const response= multiPartInstance.post('/api/auth/createUser',data)
        toast.promise(response,{
            pending:"Wait Account Proccesing...",
            success:'Account Created Successfully'
        })
        return (await response)
    } catch (error) {
         toast.error(error.response.data.message)
    }
}) 
export const googleAuth =createAsyncThunk('/googleAuth',async(data)=>{
    try {
        const response= multiPartInstance.post('/api/auth/googleAuth',data)
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
        const response=instance.post(`/api/auth/login`,data)
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
       const response= instance.get('/api/auth/logout')
       return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const updateUser=createAsyncThunk('/profile',async(data)=>{
 try {
    const response=multiPartInstance.put('/api/auth/update',data)
    return (await response)
 } catch (error) {
    toast.error(error.response.data.message)
 }
})
export const SearchUsers=createAsyncThunk('/searchUsers',async(data)=>{
    try {
        const response=instance.get(`/api/auth/user/${data}`)
        return (await response)
    } catch (error) {
       toast.error(error.response.data.message)
    }
})
export const userAndPosts=createAsyncThunk('/user',async(data)=>{
    try {
        const response=instance.get(`/api/auth/userWithAllPost/${data}`)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const following=createAsyncThunk('/following',async(data)=>{
    try {
        const response=instance.put(`/api/auth/following/${data.requester}/${data.reciever}`)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const unfollowing=createAsyncThunk('/unfollowing',async(data)=>{
    try {
        const response=instance.put(`/api/auth/unfollowing/${data.requester}/${data.reciever}`)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const userfollowing=createAsyncThunk('/userFollowing',async(data)=>{
    try {
        const response=instance.get(`/api/auth/following/${data}`)
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
                Cookies.set('auth',JSON.stringify(action.payload.data.message),{expires:7})
                return{...state,user:action.payload.data.message,isLogedIn:true}
            }
        })
        .addCase(signUp.fulfilled,(state,action)=>{
            if(action.payload){
                Cookies.set('auth',JSON.stringify(action.payload.data.message),{expires:7})
                return{...state,user:action.payload.data.message,isLogedIn:true}
            }
        })
        .addCase(logout.fulfilled,(state,action)=>{
            if(action.payload.data){
                Cookies.remove("auth")
                return{...state,user:null,isLogedIn:false}
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