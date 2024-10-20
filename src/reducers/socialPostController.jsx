import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import instance, { multiPartInstance } from "../helper/axios";
import { toast } from "react-toastify";
const initialState={
    post:[],
    story:[]
}
export const allSocialPost=createAsyncThunk('/post',async(data)=>{
try {
    const response=instance.get(`/auth/post/AllPost/${data.offset}/${data.limit}`)
    return(await response)
} catch (error) {
    toast.error(error.response.data.message)
}
})
export const post_Comments=createAsyncThunk('CommentPost',async(post_id)=>{
    try {
        const response=instance.get(`/auth/post/postComments/${post_id}`)
        return (await response)
    } catch (error) {
       toast.error(error.response.data.message) 
    }
})
export const newSocialPost=createAsyncThunk('/createPost',async({user_id,formData})=>{
    try {
        const response=multiPartInstance.post(`/auth/post/newPost/${user_id}`,formData)
        toast.promise(response,{
            pending:"Uploading...",
            success:"Successfull"
        },{
            autoClose:1500
        })
        return(await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const deletPost=createAsyncThunk('deletePost',async(data)=>{
    try {
        const response=instance.delete(`/auth/post/deletePost/${data.post_id}/${data.public_id}`)
        toast.promise(response,{
            pending:"Earasing Proccessing...",
            success:"Deleted Successfully"
        })
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const deleteStory=createAsyncThunk('deleteStory',async(data)=>{
    try {
        const response=instance.delete(`/auth/post/deletestory/${data.story_id}/${data.public_id}`)
        toast.promise(response,{
            pending:"Earasing Proccessing...",
            success:"Deleted Successfully"
        })
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const newStory=createAsyncThunk('/story',async(data)=>{
    try {
        const response=multiPartInstance.post(`/auth/post/story`,data)
        toast.promise(response,{
            pending:"Uploading...",
            success:"Successfull"
        })
        return(await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const allStories=createAsyncThunk('/',async()=>{
    try {
        const response=instance.get('/auth/post/stories')
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const updatePostInf=createAsyncThunk('/updatePost',async(data)=>{
    try {
        const response=instance.put(`/auth/post/updateToPost/${data.post_id}`,data.inf)
        return(await response)
    } catch (error) {
       toast.error(error.response.data.message)
    }
})
export const likePost=createAsyncThunk('like',async(data)=>{
try {
    const response=await instance.put(`/auth/post/likePost/${data.post_id}/${data.author}`)
    return (await response)
} catch (error) {
    toast.error(error.response.data.message)
}
})
const socialPostController=createSlice({
    name:"socialPost",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(allSocialPost.fulfilled,(state,action)=>{ 
            if(action.payload){
               state.post.push(...action.payload.data.message)
            }              
        })
        .addCase(allStories.fulfilled,(state,action)=>{ 
            if(action.payload){
               state.story.push(...action.payload.data.message)
            }              
        })
    }
})
export const {}=socialPostController.actions
export default socialPostController.reducer