import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {IChat, IChatUser} from '../../Redux/messenger/messengerReducer';
import {MESSENGER_PATH} from '../../route/const';
import {getImgUrl} from '../../utils/getImgUrl';

interface IChatItem {
  chat: IChat;
  userId: string;
  user: IChatUser;
  getUser: (id: string) => void;
}

const ChatItem = ({chat, userId, user, getUser}: IChatItem) => {
  useEffect(() => {
    const friendId = chat.members.find((id) => id !== userId);
    friendId && getUser(friendId);
  }, []);

  return (
    <>
      {user && (
        <NavLink
          activeClassName="messenger-chatsList-link-active"
          to={`${MESSENGER_PATH}/${chat._id}`}>
          <ListItemButton style={{backgroundColor: 'inherit'}}>
            <ListItemAvatar>
              {user?.avatar ? (
                <Avatar
                  src={getImgUrl(user?.avatar)}
                  className="messenger-chatsList-avatar"
                />
              ) : (
                <Avatar className="messenger-chatsList-avatar" />
              )}
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItemButton>
        </NavLink>
      )}
    </>
  );
};

export default ChatItem;
