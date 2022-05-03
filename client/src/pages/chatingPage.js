import React, { useState, useEffect } from 'react'
import '../chat.css'
import io from 'socket.io-client'


function ChatingPage() {

    const [message, setMessage] = useState('')
    const [newMessage, setNewMessage] = useState([])
    const [room, setRoom] = useState('')

    const socket = io.connect("http://localhost:3000/")

    const joinRoom = (e) => {
        e.preventDefault();
        if (room) {
            socket.emit("join_room", room);
        }
    };

    function handleSend(e) {
        e.preventDefault();
        socket.emit("send_message", { message, room });
    };

    useEffect(() => {

        socket.on("new_message", (data) => {
            // alert("New_Message");
            setNewMessage(data.message);
        })

    }, [socket])
    return (
        <>
            <div className='display flex container'>
                <h1>Message:</h1>
                {/* {
                    
                    newMessage.map((msg) => {
                        <h4>{msg}</h4>
                    })
                } */}
                <h4>{newMessage}</h4>
            </div>

            <form id="form" action="">
                <input id="input" onChange={(event) => {
                    setMessage(event.target.value)
                }} autocomplete="off" /><button onClick={(event) => handleSend(event)}>Send</button>
                <input id='input' type="text" onChange={(event) => { setRoom(event.target.value) }} /><button onClick={(event) => joinRoom(event)}>Join Room</button>
            </form>

        </>
    )
}

export default ChatingPage