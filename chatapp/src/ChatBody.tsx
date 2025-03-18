// ChatBody.tsx
import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface ChatBodyProps {
  messageList: { author: string; message: string; time: string }[];
  userName: string;
}

const ChatBody: React.FC<ChatBodyProps> = ({ messageList, userName }) => {
  return (
    <Box
      sx={{
        flex: 1,
        padding: 2,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        backgroundColor: '#f5f5f5',
      }}
    >
      {messageList.map((msg, index) => (
        <Card
          key={index}
          sx={{
            backgroundColor: msg.author === userName ? '#e3f2fd' : '#fff',
            alignSelf: msg.author === userName ? 'flex-end' : 'flex-start',
            maxWidth: '80%',
          }}
        >
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              {msg.author}
            </Typography>
            <Typography variant="body1">{msg.message}</Typography>
            <Typography variant="caption" color="textSecondary">
              {msg.time}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ChatBody;
