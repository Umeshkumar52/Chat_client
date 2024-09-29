import { configureStore} from "@reduxjs/toolkit";
import auth from './authReducer'
import conversationReducer from "./conversationReducer";
import socialPostController from "./socialPostController";
const store=configureStore({
  reducer:{
    auth:auth,
    conversation:conversationReducer,
    socialPost:socialPostController
},
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
// devTools:true
})
export default store;