import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import React from 'react';
import {NavLink} from 'react-router-dom';
import {IChat, IChatUser} from '../../Redux/messenger/messengerReducer';
import {MESSENGER_PATH} from '../../route/const';
import {getImgUrl} from '../../utils/getImgUrl';

interface IChatItem {
  chat: IChat;
  user: IChatUser | null;
}

const ChatItem = ({chat, user}: IChatItem) => {
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
