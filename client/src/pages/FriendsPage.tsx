import React from 'react';
import FriendsList from '../components/users/FriendsList';
import FriendsControl from '../components/users/UsersControl';
import FrameHoc from '../hoc/FrameHoc';

const FriendsPage = () => {
  return (
    <div>
      <FriendsControl />
      <FriendsList />
    </div>
  );
};

export default FrameHoc(FriendsPage);
