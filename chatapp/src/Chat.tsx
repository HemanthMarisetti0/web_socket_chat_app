import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import ChatFooter from './ChatFooter';
import ChatBody from './ChatBody';

const Chat = ({ socket, userName, roomId }: { socket: any; userName: string; roomId: string }) => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<any[]>([]);

  useEffect(() => {

    socket.off("receive_message").on("receive_message", (data:any) => {

        setMessageList([...messageList, data]);
      });
  }, [socket, messageList]);



  const sendMessage = async () => {
    if (message) {
      await socket.emit('send_message', {
        room: roomId,
        message: message,
        author: userName,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      });
      setMessage('');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#075E54',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: '100%',
          maxHeight: '800px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {/* Chat Header */}
        <Box
          sx={{
            backgroundColor: '#075E54',
            color: '#fff',
            padding: 2,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Chat Room: {roomId},user : {userName}
        </Box>

        {/* Chat Body */}
        <ChatBody messageList={messageList} userName={userName} />

        {/* Chat Footer */}
      <ChatFooter message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </Paper>
    </Box>
  );
};

export default Chat;
