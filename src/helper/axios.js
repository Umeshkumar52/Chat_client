import axios from "axios";
 const instance= axios.create({
    // baseURL:"http://localhost:5002/api",
    baseURL:"https://chat-backend-mmyl.onrender.com/api",
    headers:{
        "Content-Type":"application/json",
        'withCredentials':false,
    }
})
export const multiPartInstance= axios.create({
    // baseURL:"http://localhost:5002/api",
    baseURL:"https://chat-backend-mmyl.onrender.com/api",
    'withCredentials':false,
    headers:{
        "Content-Type":"multipart/form-data"
    }
})
export default instance
