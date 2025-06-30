import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import instance, { multiPartInstance } from "../helper/axios";
import { toast } from "react-toastify";
export const newReel=createAsyncThunk('/createReels',async({user_id,formData})=>{
    try {
        const response=multiPartInstance.post(`/api/auth/reels/newReel/${user_id}`,formData)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const deleteReel=createAsyncThunk('/deleteReel',async(data)=>{
    try {
        const response=instance.delete(`/api/auth/reels/deleteReel/${data.reel_id}/${data.public_id}`)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const allReels=createAsyncThunk('/reels',async(data)=>{
    try {
        const{offset,limit}=data
        const response=instance.get(`/api/auth/reels/allReels/${offset}/${limit}`,data)
        return (await response)
    } catch (error) {
      toast.error(error.response.data.message)
    }
})
export const specificReels=createAsyncThunk('/specificReels',async(data)=>{
    try {
        const response=instance.get(`/api/auth/reels/${data}`)
        return (await response)
    } catch (error) {
      toast.error(error.response.data.message)
    }
})
export const particular_User_reels=createAsyncThunk('/UserReels',async(data)=>{
    try {
        const response=instance.get(`/api/auth/reels/${data}`)
        return (await response)
    } catch (error) {
         toast.error(error.response.data.message)
    }
})
export const commentReel=createAsyncThunk('/reelComments',async(data)=>{
    try {
        const response=instance.put(`/api/auth/reels/commentToReel/${data.post_id}`,data.inf)
        return(await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const reelComments=createAsyncThunk('/reelComment',async(post_id)=>{
    try {
        const response=instance.get(`/api/auth/reels/reelComment/${post_id}`)
        return (await response)
    } catch (error) {
       toast.error(error.response.data.message) 
    }
})
export const likeReel=createAsyncThunk('/reelLike',async(data)=>{
try {
    const response=await instance.put(`/api/auth/reels/likeToReel/${data.post_id}/${data.author}`)
    return (await response)
} catch (error) {
    toast.error(error.response.data.message)
}
})
export const disLikeReel=createAsyncThunk("/disLikeReel",async(data)=>{
    try {
        const response=await instance.put(`/api/auth/reels/disLikeToReel/${data.post_id}/${data.author}`)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
 
})
const reelsReducer=createSlice({
    name:"reelsReducer",
    initialState:{reelIsRemoving:false},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(deleteReel.pending,(state)=>{
            return{...state,reelIsRemoving:true}
        })
        .addCase(deleteReel.fulfilled,(state)=>{
            return{...state,reelIsRemoving:false}
        })
    }
})
export const {}=reelsReducer.actions
export default reelsReducer.reducer