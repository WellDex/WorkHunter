import React from 'react';
import FriendsControl from '../components/users/UsersControl';
import UsersList from '../components/users/UsersList';
import FrameHoc from '../hoc/FrameHoc';

const UsersPage = () => {
  return (
    <div>
      <FriendsControl />
      <UsersList />
    </div>
  );
};

export default FrameHoc(UsersPage);
