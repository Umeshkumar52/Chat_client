import { toast } from "react-toastify"

async function handleDownload(fileUrl){
     try {      
      const file=fileUrl.split('/')
      const fileName=file[file.length-1]
      const response=await fetch(fileUrl)
      const blob=await response.blob() 
      const link =document.createElement('a')
      link.href=URL.createObjectURL(blob)
      link.download=fileName
      link.click()
      URL.revokeObjectURL(link.href)
     } catch (error) {
      toast.error("failed to download")
     }
  }
  export default handleDownload