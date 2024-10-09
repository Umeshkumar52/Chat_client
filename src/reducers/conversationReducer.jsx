import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../helper/axios";
import { toast } from "react-toastify";
const initialState={}
export const textMessage=createAsyncThunk('/chats',async(data)=>{
    try {
        const response=instance.post(`/conversation/chat/textCom/${data.reciever_id}`,data)
        return (await response)
    } catch (error) {
       return toast.error(error.response.data.message)
    }
})
export const socialMessage=createAsyncThunk('/chats',async(message)=>{
    try {         
        const response=instance.post(`/conversation/chat/socialCom/${message.communicator.reciever_id}/${message.communicator.sender_id}`,message.data)
        return (await response)
    } catch (error) {
       return toast.error(error.response.data.message)
    }
})
export const getAllConversation=createAsyncThunk('/chats',async(data)=>{
    try {
        const response=instance.get(`/conversation/chat/${data.reciever_id}/${data.sender_id}`)
        return (await response)
    } catch (error) {
       return toast.error(error.response.data.message)
    }
})
export 
const conversationReducer=createSlice({
    name:"conversation",
    initialState,
    reducers:{}
})
export const {}=conversationReducer.actions
export default conversationReducer.reducer