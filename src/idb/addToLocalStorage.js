function addToLocalStorage(key,id){
 let exiting=localStorage.getItem(key)
 let values=exiting?JSON.parse(exiting):[]
 values.push(id)
 localStorage.setItem(key,JSON.stringify(values))
}
export default addToLocalStorage