import React, {useEffect} from 'react';
import * as usersSelectors from '../Redux/users/usersSelectors';
import * as profileSelectors from '../Redux/profile/profileSelectors';
import {getUsersAll} from '../Redux/users/usersOperations';
import {getProfile} from '../Redux/profile/profileOperations';
import {connect} from 'react-redux';
import FriendsControl from '../components/users/UsersControl';
import UsersList from '../components/users/UsersList';
import FrameHoc from '../hoc/FrameHoc';
import {IUser} from '../Redux/users/usersReducer';

interface IUsersProps {
  users: IUser[];
  getUsersAll: () => void;
  getProfile: () => void;
  friends: string[];
}

const UsersContainer = ({
  users,
  getUsersAll,
  friends,
  getProfile,
}: IUsersProps) => {
  useEffect(() => {
    getUsersAll();
  }, []);
  return (
    <div>
      <FriendsControl />
      <UsersList users={users} friends={friends} getProfile={getProfile} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  users: usersSelectors.getUsers(state),
  friends: profileSelectors.getProfileFriends(state),
});

const mapDispatchToProps = {
  getUsersAll,
  getProfile,
};

const UsersPage = connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

export default FrameHoc(UsersPage);
