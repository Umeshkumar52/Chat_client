export default function MessagerUserList(add_item){
 let existingEntries=JSON.parse(localStorage.getItem("messager_user") || "[]")
    function existuser(){
        for(let i=0; i<existingEntries.length;i++){
            if(existingEntries[i].UserName==add_item.UserName){
                return true
            }
        }
        return false
    }
 if(!existuser(add_item)){
    existingEntries.push(add_item)
    localStorage.setItem("messager_user",JSON.stringify(existingEntries))
 }else{
    return "Allready Exist"
 }
}