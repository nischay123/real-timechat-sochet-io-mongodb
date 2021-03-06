import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = 'http://localhost:5000';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      console.log('Mesg', message)
      setMessages(messages => [ ...messages, message ]);
    });

    socket.on('intiLoadMessage', ({ storedMessages }) => {
      setMessages(messages => [ ...messages, ...storedMessages ]);
    })

      socket.on('roomData', ({ users }) => {
      setUsers(users);
      })
  },[]);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', {message , name ,room}, () => setMessage(''));
    }
    var elem = document.getElementById('scrollingdiv');
    console.log(elem);
    elem.scrollTop = elem.scrollHeight;
    console.log(elem.scrollHeight, elem.scrollHeight);
    
    // document.getElementById('scrollingdiv').scrollIntoView(false);

  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} room={room} setMessages={setMessages} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage}  />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
