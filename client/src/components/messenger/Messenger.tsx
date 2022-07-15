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
import React, {useEffect, useRef, useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import {useParams} from 'react-router-dom';
import {messengerAPI} from '../../api/messengerAPI';
import {IStateProfile} from '../../Redux/profile/profileReducer';
import {getImgUrl} from '../../utils/getImgUrl';
import {IChat, IChatUser} from '../../Redux/messenger/messengerReducer';
import moment from 'moment';
import io from 'socket.io-client';

interface IMesseger {
  userId: string;
  profile: IStateProfile;
  user: IChatUser;
  chats: IChat[];
}

interface IMessage {
  chatId: string;
  createDate: string;
  sender: string;
  text: string;
  _id: string;
}

const Messenger = ({userId, profile, user, chats}: IMesseger) => {
  const params: {id: string} = useParams();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [messageText, setMessagesText] = useState('');
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const currentChat = chats.find((el) => el._id === params.id);
  const messagesEndRef = useRef<any>(null);
  const socket = useRef<any>(null);

  useEffect(() => {
    socket.current = io('ws://localhost:8080');
    socket?.current?.on('getMessage', (data: any) =>
      setArrivalMessage({
        chatId: params.id,
        sender: data.senderId,
        text: data.text,
        createDate: new Date().toString(),
      })
    );
    return () => socket?.current?.disconnect();
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (userId) {
      socket.current.emit('addUser', userId);
    }
  }, [userId]);

  useEffect(() => {
    const getMessages = async () => {
      await messengerAPI
        .getMessegesByChat(params.id)
        .then((res) => setMessages(res));
    };
    getMessages();
  }, [params.id]);

  useEffect(() => {
    if (messages.length > 0) {
      if (isFirstLoad) {
        scrollToBottom({});
        setIsFirstLoad(false);
        return;
      }
      scrollToBottom({behavior: 'smooth'});
    }
  }, [messages]);

  const scrollToBottom = (params: object) => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView(params);
    }
  };

  const sendMessage = async () => {
    const receiverId = currentChat?.members.find((member) => member !== userId);
    socket.current.emit('sendMessage', {
      senderId: userId,
      receiverId,
      text: messageText,
    });
    messengerAPI
      .createMessege({text: messageText, chatId: params.id})
      .then((res) => {
        setMessages([...messages, res]);
        setMessagesText('');
      });
  };

  return (
    <div className="messenger-chat">
      <List className="messenger-chat-list customScroll">
        {messages.length > 0 &&
          messages.map((message, index) =>
            message?.sender === userId ? (
              <ListItem
                key={index}
                className={'messenger-chat-list-item-right'}>
                <ListItemAvatar>
                  {profile.avatar ? (
                    <Avatar
                      src={getImgUrl(profile.avatar)}
                      className={'messenger-chat-list-item-avatar'}
                    />
                  ) : (
                    <Avatar className={'messenger-chat-list-item-avatar'} />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      {`${profile.firstName} ${profile.lastName}`}{' '}
                      <span className={'messenger-chat-list-item-time'}>
                        {moment(message.createDate).format('HH:mm:ss')}
                      </span>
                    </>
                  }
                  secondary={message.text}
                />
              </ListItem>
            ) : (
              <ListItem key={index} className={'messenger-chat-list-item-left'}>
                <ListItemAvatar>
                  {user?.avatar ? (
                    <Avatar
                      src={getImgUrl(user?.avatar)}
                      className={'messenger-chat-list-item-avatar'}
                    />
                  ) : (
                    <Avatar className={'messenger-chat-list-item-avatar'} />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      {user?.name}{' '}
                      <span className={'messenger-chat-list-item-time'}>
                        {moment(message?.createDate).format('HH:mm:ss')}
                      </span>
                    </>
                  }
                  secondary={message?.text}
                />
              </ListItem>
            )
          )}
        <div ref={messagesEndRef} />
      </List>
      <TextField
        className="messenger-chat-field"
        variant="outlined"
        placeholder="Введите сообщение..."
        fullWidth={true}
        multiline={true}
        value={messageText}
        onChange={(e: any) => setMessagesText(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              className="messenger-chat-field-item">
              {profile.avatar ? (
                <Avatar src={getImgUrl(profile.avatar)} />
              ) : (
                <Avatar />
              )}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              className="messenger-chat-field-item">
              <Button variant="outlined" onClick={sendMessage}>
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
