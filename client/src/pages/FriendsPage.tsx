import React, {useEffect} from 'react';
import * as usersSelectors from '../Redux/users/usersSelectors';
import {connect} from 'react-redux';
import FriendsList from '../components/users/FriendsList';
import FriendsControl from '../components/users/UsersControl';
import FrameHoc from '../hoc/FrameHoc';
import {IUser} from '../Redux/users/usersReducer';
import {getFriends} from '../Redux/users/usersOperations';

interface IFriendsProps {
  users: IUser[];
  getFriends: () => void;
}

const FriendsContainer = ({users, getFriends}: IFriendsProps) => {
  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div>
      <FriendsControl />
      <FriendsList users={users} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  users: usersSelectors.getUsers(state),
});

const mapDispatchToProps = {
  getFriends,
};

const FriendsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsContainer);

export default FrameHoc(FriendsPage);
