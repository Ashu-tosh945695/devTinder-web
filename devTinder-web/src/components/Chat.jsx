import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async ()=>{
    const chat = await axios.get(BASE_URL+ "/chat/" + targetUserId,{
      withCredentials: true,
    })
    console.log(chat.data.messages)

    const chatMessages = chat?.data?.messages.map((msg)=>{

      const {senderId,text} = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    })
    setMessages(chatMessages);
  }

  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socketRef.current.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName+" :"+ text)
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          firstName,
          lastName,
          text,
        },
      ]);
    });

    return () => {
      socketRef.current.off("messageReceived");
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    // NOTE:
    // message yahan add nahi karenge
    // backend se messageReceived event aayega
    // wahi UI update karega

    setNewMessage("");
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600 text-xl font-bold">Chat</h1>

      <div className="flex-1 overflow-y-auto p-5">
        {messages.map((msg, index) => (
          <div key={index} className="chat chat-start mb-3">
            <div className="chat-header">{msg.firstName +" "+ msg.lastName}</div>

            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="p-5 border-t border-gray-600 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-500 rounded p-2"
        />

        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
// import { useParams } from "react-router-dom"
// import { useState } from "react";
// const Chat = ()=>{

//     const {targetUserId} = useParams()
//     const {messages,setMessages} = useState([{text: "Hello world"}])
//     console.log(targetUserId)
//     return (
//       <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
//         <h1 className=" p-5 border-b border-gray-600">Chat</h1>
//         <div className="flex-1 overflow-scroll p-5 ">
//          {/* chat body */}
//          {messages?.map((msg,index)=>{
//             return (
//               <div key={index} className="chat chat-start">
//                 <div className="chat-header">
//                   Ashutosh
//                   <time className="text-xs opacity-50">2 hours ago</time>
//                 </div>
//                 <div className="chat-bubble">You were the Chosen One!</div>
//                 <div className="chat-footer opacity-50">Seen</div>
//               </div>
//             );
//          })}

//         </div>
//         <div className="p-5 border-t border-gray-400 flex items-center gap-2">
//           <input className="flex-1 border border-gray-500 text-white rounded p-2"></input>
//           <button className="btn btn-secondary">Send</button>
//         </div>
//       </div>
//     );
// }

// export default Chat
