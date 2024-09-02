import {React,useState} from 'react'

export default function MessageInput({appendmsg,socket,currentUser,user}) {
    const [message, setMessage] = useState("");
    async function sendChat(event) {
        event.preventDefault();
        const hours = new Date(Date.now()).getHours();
        let realHours;
        let newFormat;
        if (hours > 12) {
          realHours = hours - 12;
        } else if (hours < 12) {
          realHours = hours;
        } else if (hours == 12) {
          realHours = hours;
        }
    
        if (hours >= 12) {
          newFormat = "PM";
        } else {
          newFormat = "AM";
        }
        const data = {
          message: message,
          time:
            realHours + ":" + new Date(Date.now()).getMinutes() + " " + newFormat,
          userName: user,
          to: currentUser?currentUser:user,
        };
        socket.emit("private_msg",data);
        appendmsg(data, "outgoing");
        setMessage("");
      }
       
  return (
    <div>
       <form
        onSubmit={sendChat}
        className="fixed w-[81%] bottom-0 right-0"
      
        id="form"
      >
        <div className="border-2 ">
          <input
            id="input"
            type="text"
            required
            onChange={(event) => {
              event.preventDefault();
              setMessage(event.target.value);
            }}
            onKeyDown={() =>{
               socket.emit("typingStatus",{
                status:true,
                to:currentUser
              })
            }}
            onKeyUp={()=>{
              setTimeout(()=>{
                socket.emit("typingStatus",{
                  status:false,
                  to:currentUser
                })
              },500)
            }}
            onm
            value={message}
            autoFocus
            name="input"
            className="w-full border-none p-1 text-black font-semibold"
            placeholder="Messagee"
          />
          <button
         
            type="submit"
            id="button"
            className=" p-2 absolute w-16 right-0 bg-yellow-400 hover:bg-yellow-600 text-white font-semibold"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
