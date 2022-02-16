import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import FriendsList from '../components/users/FriendsList';
import FriendsControl from '../components/users/UsersControl';
import UsersList from '../components/users/UsersList';
import FrameHoc from '../hoc/FrameHoc';

const UsersPage = () => {
  return (
    <div>
      <FriendsControl />
      <Switch>
        <Route exact path="/users/friends" component={FriendsList} />
        <Route exact path="/users/people" component={UsersList} />
        <Redirect to={'/users/friends'} />
      </Switch>
    </div>
  );
};

export default FrameHoc(UsersPage);
