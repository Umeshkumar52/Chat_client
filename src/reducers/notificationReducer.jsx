import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import instance, { multiPartInstance } from '../helper/axios'
import { toast } from 'react-toastify'
 const initialState={
    unReadNotification:''
 }
 export const userNotification=createAsyncThunk('/notification',async(_id)=>{
    try {
        const response=instance.get(`/api/notification/${_id}`)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
 })
 export const saveNotification=createAsyncThunk('/createNotification',async(data)=>{
    try {
        const response=instance.post(`/api/notification/create/${data.reciever_id}/${data.sender_id}`,data)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
 })
 export const updateNotification=createAsyncThunk('/updateNotification',async(data)=>{
    try {
        const response=instance.put(`/api/notification/update/${data}`)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
 })
 export const specificNotificationupdate=createAsyncThunk('/specificNotification',async(data)=>{
    try {
        const response=instance.put(`/api/notification/specificNotifUpdate/${data.user_id}/${data._id}`)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
 })
 export const unReadNotificationRed=createAsyncThunk('/unReadNotification',async(data)=>{
    try {
        const response=instance.get(`/api/notification/unReadNotification/${data}`)
        return (await response)
    } catch (error) {
        toast.error(error.response.data.message)
    }
 })
const notification=createSlice({
    name:'notification',
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder
        .addCase(unReadNotificationRed.fulfilled,(state,action)=>{
            if(action.payload){
                state.unReadNotification=action.payload.data.message.unReadNotification
            }
        })
        .addCase(updateNotification.fulfilled,(state,action)=>{
            if(action.payload){
                state.unReadNotification=action.payload.data.message.unReadNotification
            }
        })
       
    }
})
export const {}=notification.actions
export default notification.reducer