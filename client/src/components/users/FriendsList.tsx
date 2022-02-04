import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';

const FriendsList = () => {
  return (
    <List className="friends-list">
      {[
        1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4,
      ].map((el) => (
        <>
          <ListItem className="friends-list-item">
            <Link to={'/'} className="friends-link">
              <ListItemAvatar className="friends-list-item-avatar">
                <Avatar className="friends-avatar" />
              </ListItemAvatar>
              <ListItemText primary="name" secondary="status" />
            </Link>
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
};

export default FriendsList;
