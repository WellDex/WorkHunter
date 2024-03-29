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
import {IUser} from '../../Redux/users/usersReducer';
import {getImgUrl} from '../../utils/getImgUrl';
import NoData from '../common/NoData';

interface IFriendsProps {
  users: IUser[];
}

const FriendsList = ({users}: IFriendsProps) => {
  return (
    <List className="friends-list">
      {users.length > 0 ? (
        users.map((user, index) => (
          <div key={index}>
            <ListItem className="friends-list-item">
              <Link to={`/profile/${user.id}`} className="friends-link">
                <ListItemAvatar className="friends-list-item-avatar">
                  {user.avatar ? (
                    <Avatar
                      className="friends-avatar"
                      src={getImgUrl(user.avatar)}
                    />
                  ) : (
                    <Avatar className="friends-avatar" />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={`${user.firstName} ${user.lastName}`}
                  secondary={user.status}
                />
              </Link>
            </ListItem>
            <Divider />
          </div>
        ))
      ) : (
        <NoData />
      )}
    </List>
  );
};

export default FriendsList;
