import { useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom'
export default function AuthGaurd({children}){
    const {isLogedIn}=useSelector((state)=>{return state.auth}) 
   return isLogedIn?children:<Navigate to='/sign-in'/>
}
