import initiateDb from "./openIdb";
async function addFile(file) {
    const db=await initiateDb()
   const tx=db.transaction('files','readwrite')
   const store=tx.objectStore('files')
   const id=`${file.name}-${file.size}`
   await store.put({id,file})
   await tx.done   
}
export default addFile;