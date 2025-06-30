import { configureStore} from "@reduxjs/toolkit";
import auth from './authReducer'
import socialPostController from "./socialPostController";
import notificationReducer from "./notificationReducer";
import conversation from './conversationReducer'
import audioCallReducer from './audioCallReducer'
import reelsReducer from './reelsReducer'
const store=configureStore({
  reducer:{
    auth:auth,
    conversation:conversation,
    socialPost:socialPostController,
    reels:reelsReducer,
    notification:notificationReducer,
    globalyCall:audioCallReducer
},
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false
  }),
// devTools:true
})
export default store;