import {ImageList} from '@mui/material';
import React from 'react';
import {IUser} from '../../Redux/users/usersReducer';
import UserItem from './UserItem';

interface IUsersProps {
  users: IUser[];
  getProfile: () => void;
  friends: string[];
}

const UsersList = ({users, friends, getProfile}: IUsersProps) => {
  return (
    <div className="card-container">
      {users.length > 0 && (
        <ImageList cols={4} gap={16}>
          {users.map((user) => (
            <UserItem user={user} friends={friends} getProfile={getProfile} />
          ))}
        </ImageList>
      )}
    </div>
  );
};

export default UsersList;
