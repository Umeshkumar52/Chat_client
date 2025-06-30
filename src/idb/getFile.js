import initiateDb from "./openIdb";
async function getFile(files) {
    const db=await initiateDb()
   const tx=db.transaction('files','readwrite')
   const store=tx.objectStore('files')
   const result=await Promise.all(files.map(id=>store.get(id)))
   await tx.done   
   return result.filter(Boolean)
}
export default getFile;