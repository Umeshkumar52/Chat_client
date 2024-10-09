import axios from "axios";
 const instance= axios.create({
    baseURL:"http://localhost:5002/api",
    // baseURL:"https://vercel.com/umeshkumar52s-projects/chat-backend/api",
    headers:{
        "Content-Type":"application/json"
    }
})
export const multiPartInstance= axios.create({
    baseURL:"http://localhost:5002/api",
    headers:{
        "Content-Type":"multipart/form-data"
    }
})

export default instance