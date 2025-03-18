// ChatFooter.tsx
import React from 'react';
import { Box, Button, TextField } from '@mui/material';

interface ChatFooterProps {
  message: string;
  setMessage: (value: string) => void;
  sendMessage: () => void;
}

const ChatFooter: React.FC<ChatFooterProps> = ({ message, setMessage, sendMessage }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        padding: 2,
        gap: 1,
        borderTop: '1px solid #ccc',
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') sendMessage();
        }}
      />
      <Button variant="contained" sx={{backgroundColor:"#075E54"}} onClick={sendMessage}>
        Send
      </Button>
    </Box>
  );
};

export default ChatFooter;
