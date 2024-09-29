import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import instance, { multiPartInstance } from "../helper/axios";
import { toast } from "react-toastify";
const intialState={}
export const newReel=createAsyncThunk('/reels',async(data)=>{
    try {
        const response=multiPartInstance.post(`/auth/reels/${data.user_id}`)
        toast.promise(response,{
            pending:"Loading",
            success:"successFully"
        })
        return (await response)
    } catch (error) {
        return toast.error(error.response.data.message)
    }
})
export const allReels=createAsyncThunk('/reels',async()=>{
    try {
        const response=instance.get('/auth/reels/')
        return (await response)
    } catch (error) {
        return toast.error(error.response.data.message)
    }
})
export const particular_User_reels=createAsyncThunk('/reels',async(data)=>{
    try {
        const response=instance.get(`/auth/reels/${data}`)
        return (await response)
    } catch (error) {
        return toast.error(error.response.data.message)
    }
})
export const commentReel=createAsyncThunk('/reelComment',async(data)=>{
    try {
        const response=instance.put(`/auth/reels/commentToReel/${data.post_id}`,data.inf)
        return(await response)
    } catch (error) {
       return toast.error(error.response.data.message)
    }
})
export const reelComments=createAsyncThunk('/reel',async(post_id)=>{
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