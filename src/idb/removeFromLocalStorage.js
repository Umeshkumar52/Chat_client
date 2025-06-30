function removeFromLocalStorage(key,id){
 let exiting=localStorage.getItem(key)
 let values=exiting?JSON.parse(exiting):[]
 if(values.includes){
   const newUpdatedValue= values.filter(Element=>Element!==id)
    localStorage.setItem(key,JSON.stringify(newUpdatedValue))
 }
}
export default removeFromLocalStorage