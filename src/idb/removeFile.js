import initiateDb from "./openIdb";
async function removeFile(files) {
    const db=await initiateDb()
   const tx=db.transaction('files','readwrite')
   const store=tx.objectStore('files')
   for (const ids of files) {
    await store.put({ids})
   } 
   await tx.done   
}
export default removeFile;