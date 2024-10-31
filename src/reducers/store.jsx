import { configureStore} from "@reduxjs/toolkit";
import auth from './authReducer'
import conversationReducer from "./conversationReducer";
import socialPostController from "./socialPostController";
import notificationReducer from "./notificationReducer";
const store=configureStore({
  reducer:{
    auth:auth,
    conversation:conversationReducer,
    socialPost:socialPostController,
    notification:notificationReducer
},
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
// devTools:true
})
export default store;