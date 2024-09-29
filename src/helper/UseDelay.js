function UseDelay(cd,delay=1000){
    let timerId;
    return (...args)=>{
        clearTimeout(timerId);
        timerId=setTimeout(()=>{
            cd(...args);
        },delay)
    }
}
export default UseDelay