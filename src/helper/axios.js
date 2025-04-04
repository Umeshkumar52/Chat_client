import axios from "axios";
const url="https://chat-backend-mmyl.onrender.com";
//  const url="http://localhost:5002"
 const instance= axios.create({
    baseURL:url,
    'withCredentials':true,
  headers:{
        "Content-Type":"application/json"
    }
})
export const multiPartInstance= axios.create({
    baseURL:url,
   'withCredentials':true,
 headers:{
        "Content-Type":"multipart/form-data"
    }
})
export default instance
