import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance, { multiPartInstance } from "../helper/axios";
import { toast } from "react-toastify";
const initialState={}
export const textMessage=createAsyncThunk('/textMessage',async(data)=>{
    try {
        const response=instance.post(`/api/conversation/chat/textCom/${data.reciever_id}`,data)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const socialMessage=createAsyncThunk('/mediaMessage',async(message)=>{
    try {         
        const response=multiPartInstance.post(`/api/conversation/chat/socialCom/${message.communicator.reciever_id}/${message.communicator.sender_id}`,message.data)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const getAllConversation=createAsyncThunk('/Allchats',async(data)=>{
    try {
        const response=instance.get(`/api/conversation/chat/${data.reciever_id}/${data.sender_id}`)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const deleteChats=createAsyncThunk('/deleteChats',async(data)=>{
    try {
        const response=await instance.delete(`/api/conversation/chat/delete/${data.conversation_id}`,{data:data})
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
export const updateChate=createAsyncThunk('/update',async(data)=>{
    try {
        console.log(data);
        const response=await instance.delete(`/api/conversation/chat/update/${data.conversation_id}`,data)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
})
const conversationReducer=createSlice({
    name:"conversation",
    initialState,
    reducers:{
    },
   
})
export const {}=conversationReducer.actions
export default conversationReducer.reducer