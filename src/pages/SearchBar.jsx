import UseDelay from '../helper/UseDelay';
import { MdCancel } from 'react-icons/md';
export default function SearchBar({updateSearchTerm,searching,setSearching}) {
  const debounceCallBack=UseDelay((event)=>updateSearchTerm(event.target.value))
  return (
    <div className='sticky top-2 flex gap-2 mx-2'>
     <input className=' w-full p-2 text-xl outline-none border-black border-2 rounded-lg' type='search' onChange={debounceCallBack} placeholder='Search...'/>
     <MdCancel onClick={()=>setSearching(!searching)} className='text-red-600 text-4xl'/>
    </div>
  )
}
