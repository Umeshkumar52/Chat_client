import {openDB} from 'idb'
const initiateDb=async()=>{
    return openDB("ResumeDatabase",1,{
        upgrade(db){
            if(!db.objectStoreNames.contains('files')){
                db.createObjectStore("files",{keyPath:'id'})
            }
        }
    })
}
export default initiateDb