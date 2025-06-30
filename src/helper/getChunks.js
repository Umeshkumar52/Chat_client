function getChunks(file) {
    const chunckSize=1024*1024
    const chunks=[]
    let start=0;
    let index=0
    while(start<file.size){
        const end=start+chunckSize
        chunks.push({
            Blob:file.slice(start,end),
            index
        })
        start=end;
        index++;
    }
    return chunks
}
export default getChunks