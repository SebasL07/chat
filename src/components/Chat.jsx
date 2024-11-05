import { useEffect, useState } from "react";
import stompService from "../utils/SocketService";
import Message from "./Message";

const Chat = () =>{
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState("");

    const [sender, setSender] = useState('');
    const [to, setTo] = useState('');

    useEffect(() => {
        stompService.subscribe(`/messageTo/${to}`, (newM) =>{
            console.log(newM);
            setMessages((bef) => [...bef, newM]);
        }).catch(e => console.log(e));

        return () => {
            stompService.unsubscribe(`/messageTo/${to}`);
        }
    },[to])

    const handleSend = (e) => {

        const newMsg = {
            sender : sender,
            time: Date.now(),
            type: "text",
            content : message
        }

        setMessages((bef) => [...bef, newMsg]);
        
        fetch(`http://127.0.0.1:8080/chat?to=${sender}`,
            {
                method : "POST",
                headers : {"Content-Type": "application/json"},
                body : JSON.stringify({
                    sender : sender,
                    time: Date.now(),
                    type: "text",
                    content : message
                })
            }
        ).then((response) => response.json())
        .then((data) => console.log("Mensaje guardado:", data))
        .catch((error) => console.error("Error al guardar el mensaje:", error));
        


       
    }

    const handleMessage = (e) => {  
        setMessage(e.target.value)
    }
    return (

        <>
            <div>
                <h1>Chat</h1>
                
                <input type="text" name="textSender" id="idTextSender" placeholder="From..." value={sender} onChange={(e) => {setSender(e.target.value)}}/>

                <input type="text" name="textTo" id="idTextTo" placeholder="To..." value={to} onChange={(e) => {setTo(e.target.value)}}/>

                <input type="text" name="textMessage" id="idTextMsg" placeholder="Message..." value={message} onChange={(e) => handleMessage(e)}/>

                <button onClick={(e)=> handleSend(e)}>Enviar</button>
            </div>
            <div>
                <h1>Mensajes</h1>
                {
                    messages.map((m,ind) => (
                        <Message key={ind} message={m} />
                    ))
                    
                }
            </div>
        </>
    );
}

export default Chat;