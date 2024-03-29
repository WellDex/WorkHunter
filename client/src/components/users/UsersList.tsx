import {ImageList} from '@mui/material';
import React from 'react';
import {IUser} from '../../Redux/users/usersReducer';
import NoData from '../common/NoData';
import UserItem from './UserItem';

interface IUsersProps {
  users: IUser[];
  getProfile: () => void;
  friends: string[];
  setLoading: (b: boolean) => void;
  setMessage: (a: any) => void;
}

const UsersList = ({
  users,
  friends,
  getProfile,
  setLoading,
  setMessage,
}: IUsersProps) => {
  return (
    <div className="card-container">
      {users.length > 0 ? (
        <ImageList cols={4} gap={16}>
          {users.map((user) => (
            <UserItem
              setMessage={setMessage}
              user={user}
              friends={friends}
              getProfile={getProfile}
              setLoading={setLoading}
            />
          ))}
        </ImageList>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default UsersList;
