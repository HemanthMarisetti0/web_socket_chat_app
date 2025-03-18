import React from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from './Chat';
const socket = io('http://localhost:3001');

function App() {
  const [userName, setUserName] = React.useState('');
  const [roomId, setRoomId] = React.useState('');
  const [showChat, setShowChat] = React.useState(false);
  const joinRoom =async () => {
    if(userName && roomId) {
      await socket.emit('join_room', roomId);
      }
      setShowChat(true);
  }

  return (
    <div className="App">
        {!showChat ? 
          <>
          <h1>Chat App</h1>
      <input type="text" placeholder="Enter your name" onChange={(event)=>{
        setUserName(event.target.value);
      }}/>
      <input type="text" placeholder="Enter Room ID" onChange={(event)=>{
        setRoomId(event.target.value);
      }}/>
      <button onClick={joinRoom}>Join</button></>
      :<Chat socket={socket} userName={userName} roomId={roomId}/>
      }
     
      
      
    </div>
  );
}

export default App;
