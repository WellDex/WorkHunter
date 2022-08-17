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
import AutoSizer from 'react-virtualized-auto-sizer';
import {VariableSizeList} from 'react-window';
import NoData from '../common/NoData';

interface IMesseger {
  userId: string;
  profile: IStateProfile;
  users: IChatUser[];
  chats: IChat[];
}

interface IMessage {
  chatId: string;
  createDate: string;
  sender: string;
  text: string;
  _id: string;
}

const Messenger = ({userId, profile, users, chats}: IMesseger) => {
  const params: {id: string} = useParams();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [messageText, setMessagesText] = useState('');
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [autoHeight, setAutoHaight] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);
  const currentChat = chats.find((el) => el._id === params.id);
  const user = users.find((user) => currentChat?.members.includes(user._id));
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
    if (listRef && listRef.current) {
      listRef.current.scrollToItem(messages.length - 1, 'end');
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

  //list
  const listRef = useRef<any>({});
  const rowHeights = useRef<any>({});
  const inputRef = useRef<any>({});

  const getRowHeight = (index: any) => {
    return rowHeights.current[index] + 8 || 82;
  };

  const Row = ({index, style}: any) => {
    const rowRef = useRef<any>({});
    const message = messages[index];

    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(index, rowRef.current.clientHeight);
      }
    }, [rowRef]);

    return (
      <div style={style}>
        {message?.sender === userId ? (
          <ListItem ref={rowRef} className={'messenger-chat-list-item-right'}>
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
          <ListItem ref={rowRef} className={'messenger-chat-list-item-left'}>
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
                  {user?.name}
                  <span className={'messenger-chat-list-item-time'}>
                    {moment(message?.createDate).format('HH:mm:ss')}
                  </span>
                </>
              }
              secondary={message?.text}
            />
          </ListItem>
        )}
      </div>
    );
  };

  const setRowHeight = (index: any, size: any) => {
    listRef.current.resetAfterIndex(0);
    rowHeights.current = {...rowHeights.current, [index]: size};
  };

  useEffect(() => {
    setTotalHeight(autoHeight - inputRef.current.clientHeight);
  }, [autoHeight, inputRef.current, messageText]);

  return (
    <div className="messenger-chat">
      <AutoSizer>
        {({height, width}) => {
          setAutoHaight(height);
          return (
            <VariableSizeList
              className="messenger-chat-list customScroll"
              height={totalHeight}
              width={width}
              itemSize={getRowHeight}
              ref={listRef}
              itemCount={messages.length}>
              {Row}
            </VariableSizeList>
          );
        }}
      </AutoSizer>
      <TextField
        ref={inputRef}
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
