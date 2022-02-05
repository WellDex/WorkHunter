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

const GroupsList = () => {
  return (
    <List className="groups-list">
      {[
        1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4,
      ].map((el) => (
        <>
          <ListItem className="groups-list-item">
            <Link to={'/group/1'} className="groups-link">
              <ListItemAvatar className="groups-list-item-avatar">
                <Avatar className="groups-avatar" />
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

export default GroupsList;
