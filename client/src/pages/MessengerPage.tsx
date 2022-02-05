import {Divider} from '@mui/material';
import React from 'react';
import Messenger from '../components/messenger/Messenger';
import UsersList from '../components/messenger/UsersList';
import FrameHoc from '../hoc/FrameHoc';

const MessengerPage = () => {
  return (
    <div className="messenger">
      <UsersList />
      <Divider orientation="vertical" flexItem={true} />
      <Messenger />
    </div>
  );
};

export default FrameHoc(MessengerPage);
