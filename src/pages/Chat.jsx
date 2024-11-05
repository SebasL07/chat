import { useEffect, useState } from "react";
import stompService from "../utils/SocketService";
import Message from "../components/Message";
import "./static/Chat.css";


const Chat = () =>{
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState("");

    const [sender, setSender] = useState('');
    const [to, setTo] = useState('');

    const { isDarkMode, toggleTheme } = useTheme();
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
        <div className={`chat-container ${isDarkMode ? "dark" : "light"}`}>

            <button onClick={toggleTheme}>
                {isDarkMode ? "Modo Claro" : "Modo Noche"}
            </button>
            <div className="messages-container">
                {messages.map((m, index) => (
                    <div
                        key={index}
                        className={m.sender === sender ? "message-sender" : "message-receiver"}
                    >
                        <Message message={m} />
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="From..."
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="To..."
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={handleSend}>Enviar</button>
            </div>
        </div>
    );
}

export default Chat;