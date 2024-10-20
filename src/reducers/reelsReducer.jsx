import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import instance, { multiPartInstance } from "../helper/axios";
import { toast } from "react-toastify";
const intialState={}
export const newReel=createAsyncThunk('/createReels',async({user_id,formData})=>{
    try {
        const response=multiPartInstance.post(`/auth/reels/newReel/${user_id}`,formData)
        toast.promise(response,{
            pending:"Uploading...",
            success:"successFully"
        })
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const deleteReel=createAsyncThunk('/deleteReel',async(data)=>{
    try {
        const response=instance.delete(`/auth/reels/deleteReel/${data.reel_id}/${data.public_id}`)
        toast.promise(response,{
            pending:"Earasing Proccessing...",
            success:"Deleted Successfully"
        })
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const allReels=createAsyncThunk('/reels',async()=>{
    try {
        const response=instance.get('/auth/reels/')
        return (await response)
    } catch (error) {
      toast.error(error.response.data.message)
    }
})
export const particular_User_reels=createAsyncThunk('/UserReels',async(data)=>{
    try {
        const response=instance.get(`/auth/reels/${data}`)
        return (await response)
    } catch (error) {
         toast.error(error.response.data.message)
    }
})
export const commentReel=createAsyncThunk('/reelComments',async(data)=>{
    try {
        const response=instance.put(`/auth/reels/commentToReel/${data.post_id}`,data.inf)
        return(await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const reelComments=createAsyncThunk('/reelComment',async(post_id)=>{
    try {
        const response=instance.get(`/auth/reels/reelComment/${post_id}`)
        return (await response)
    } catch (error) {
       toast.error(error.response.data.message) 
    }
})
export const likeReel=createAsyncThunk('reelLike',async(data)=>{
try {
    const response=await instance.put(`/auth/reels/likeToReel/${data.post_id}/${data.author}`)
    return (await response)
} catch (error) {
    toast.error(error.response.data.message)
}
})
const reelSlice=createSlice({
    name:"reels",
    intialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(allReels.fulfilled,(state,action)=>{
            console.log(action);
            
        })
    }
})
export const {}=reelSlice.actions
export default reelSlice.reducer