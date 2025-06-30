import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import instance, { multiPartInstance } from "../helper/axios";
import { toast } from "react-toastify";
const initialState={
    post:[],
    story:[],
    fetchedPost:0,
    hasMore:false,
    postIsRemoving:false
}
export const allSocialPost=createAsyncThunk('/post',async(data)=>{
try {
    const response=instance.get(`/api/auth/post/AllPost/${data.offset}/${data.limit}`)
    return(await response)
} catch (error) {
    toast.error(error.response.data.message)
}
})
export const specificPost=createAsyncThunk('/specificPost',async(data)=>{
    try {
        const response=instance.get(`/api/auth/post/specPost/${data}`)
        return(await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
    })
export const post_Comments=createAsyncThunk('/CommentPost',async(post_id)=>{
    try {
        const response=instance.get(`/api/auth/post/postComments/${post_id}`)
        return (await response)
    } catch (error) {
       toast.error(error.response.data.message) 
    }
})
export const newSocialPost=createAsyncThunk('/createPost',async({user_id,formData})=>{
    try {
        const response=multiPartInstance.post(`/api/auth/post/newPost/${user_id}`,formData)
        return(await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const deletPost=createAsyncThunk('/deletePost',async(data)=>{
    try {
        const response=instance.delete(`/api/auth/post/deletePost/${data.post_id}/${data.public_id}`)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const deleteStory=createAsyncThunk('/deleteStory',async(data)=>{
    try {
        const response=instance.delete(`/api/auth/post/deletestory/${data.story_id}/${data.public_id}`)
        toast.promise(response,{
            pending:"Proccessing...",
            success:"Deleted Successfully"
        })
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const newStory=createAsyncThunk('/story',async(data)=>{
    try {
        const response=multiPartInstance.post(`/api/auth/post/story`,data)
        return(await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const allStories=createAsyncThunk('/userStories',async()=>{
    try {
        const response=instance.get('/api/auth/post/stories')
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const updatePostInf=createAsyncThunk('/updatePost',async(data)=>{
    try {
        const response=instance.put(`/api/auth/post/updateToPost/${data.post_id}`,data.inf)
        return(await response)
    } catch (error) {
       toast.error(error.response.data.message)
    }
})
export const likePost=createAsyncThunk('/like',async(data)=>{
try {
    const response=await instance.put(`/api/auth/post/likePost/${data.post_id}/${data.author}`)
    return (await response)
} catch (error) {
    toast.error(error.response.data.message)
}
})
export const removeLike=createAsyncThunk('/dis_like',async(data)=>{
    try {
        const response=await instance.put(`/api/auth/post/dis_Like/${data.post_id}/${data.author}`)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
    })
const socialPostController=createSlice({
    name:"socialPost",
    initialState,
    reducers:{
        prevPosts:(state,action)=>{
        // if(action?.payload){
        //   state.fetchedPage=action.payload.fetchedPost
        //    state.post.push(...new Set(action.payload.postData)) 
        // }
    }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(allSocialPost.fulfilled,(state,action)=>{ 
            if(action.payload?.data){
                state.hasMore=[...action.payload.data?.message].length<10?false:true                
            }              
        })
        .addCase(allStories.fulfilled,(state,action)=>{ 
            if(action.payload?.data?.message){
                sessionStorage.setItem("stories",JSON.stringify(action.payload.data.message))
                sessionStorage.setItem("storiesExpire",Date.now())
                state.story.push(...action.payload.data.message)
            }              
        })
          .addCase(deletPost.pending,(state)=>{
                    return{...state,postIsRemoving:true}
            })
            .addCase(deletPost.fulfilled,(state)=>{
                        return{...state,postIsRemoving:false}
                    })
    }
})
export const {prevPosts}=socialPostController.actions
export default socialPostController.reducer