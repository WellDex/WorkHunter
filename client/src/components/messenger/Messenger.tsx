import {
  Avatar,
  Button,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from '@mui/material';
import React, {useEffect, useRef} from 'react';
import SendIcon from '@mui/icons-material/Send';

const itemData = [
  {
    img: 'https://picsum.photos/600',
    author: 'WellDex',
    name: 'WellDex',
    messege: 'Hello Anthon!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'Anthon',
    name: 'Anthon',
    messege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'WellDex',
    name: 'WellDex',
    messege: 'Hello Anthon!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'Anthon',
    name: 'Anthon',
    messege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'WellDex',
    name: 'WellDex',
    messege: 'Hello Anthon!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'Anthon',
    name: 'Anthon',
    messege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'WellDex',
    name: 'WellDex',
    messege: 'Hello Anthon!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'Anthon',
    name: 'Anthon',
    messege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'WellDex',
    name: 'WellDex',
    messege: 'Hello Anthon!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'Anthon',
    name: 'Anthon',
    messege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'WellDex',
    name: 'WellDex',
    messege: 'Hello Anthon!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'Anthon',
    name: 'Anthon',
    messege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'WellDex',
    name: 'WellDex',
    messege: 'Hello Anthon!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'Anthon',
    name: 'Anthon',
    messege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'WellDex',
    name: 'WellDex',
    messege: 'Hello Anthon!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'Anthon',
    name: 'Anthon',
    messege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'WellDex',
    name: 'WellDex',
    messege: 'Hello Anthon!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'Anthon',
    name: 'Anthon',
    messege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'WellDex',
    name: 'WellDex',
    messege: 'Hello Anthon!',
  },
  {
    img: 'https://picsum.photos/600',
    author: 'Anthon',
    name: 'Anthon',
    messege: 'Hello WellDex!',
  },
];

const Messenger = () => {
  const messagesEndRef = useRef<any>(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
    }
  };
  return (
    <div className="messenger-chat">
      <List className="messenger-chat-list customScroll">
        {itemData.map((item: any) => (
          <ListItem
            className={
              item.name === 'WellDex'
                ? 'messenger-chat-list-item-right'
                : 'messenger-chat-list-item-left'
            }>
            <ListItemAvatar>
              <Avatar
                src={item.img}
                className={'messenger-chat-list-item-avatar'}
              />
            </ListItemAvatar>
            <ListItemText primary={item.name} secondary={item.messege} />
          </ListItem>
        ))}
        <div ref={messagesEndRef} />
      </List>
      <TextField
        className="messenger-chat-field"
        variant="outlined"
        placeholder="Введите сообщение..."
        fullWidth={true}
        multiline={true}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              className="messenger-chat-field-item">
              <Avatar />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              className="messenger-chat-field-item">
              <Button variant="outlined">
                <SendIcon />
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Messenger;
