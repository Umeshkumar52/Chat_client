import axios from "axios";
 const instance= axios.create({
<<<<<<< HEAD
    // baseURL:"http://localhost:5002/api",
    baseURL:"https://chat-backend-mmyl.onrender.com/api",
=======
    baseURL:"https://chat-backend-mmyl.onrender.com/api",
    // baseURL:"https://vercel.com/umeshkumar52s-projects/chat-backend/api",
>>>>>>> be78e80853746247052b57fbc7f6071239519edf
    headers:{
        "Content-Type":"application/json"
    }
})
export const multiPartInstance= axios.create({
<<<<<<< HEAD
    // baseURL:"http://localhost:5002/api",
    baseURL:"https://chat-backend-mmyl.onrender.com/api",
=======
    baseURL:"https://chat-backend-mmyl.onrender.com//api",
>>>>>>> be78e80853746247052b57fbc7f6071239519edf
    headers:{
        "Content-Type":"multipart/form-data"
    }
})

export default instance
