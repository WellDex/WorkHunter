import React, {useEffect} from 'react';
import * as usersSelectors from '../Redux/users/usersSelectors';
import * as profileSelectors from '../Redux/profile/profileSelectors';
import * as appSelectors from '../Redux/app/appSelectors';
import {getUsersAll} from '../Redux/users/usersOperations';
import {getProfile} from '../Redux/profile/profileOperations';
import {connect} from 'react-redux';
import UsersList from '../components/users/UsersList';
import FrameHoc from '../hoc/FrameHoc';
import {IUser} from '../Redux/users/usersReducer';
import UsersControl from '../components/users/UsersControl';

interface IUsersProps {
  users: IUser[];
  getUsersAll: () => void;
  getProfile: (id: string) => void;
  friends: string[];
  userId: string;
}

const UsersContainer = ({
  users,
  getUsersAll,
  friends,
  getProfile,
  userId,
}: IUsersProps) => {
  useEffect(() => {
    getUsersAll();
  }, []);
  return (
    <div>
      <UsersControl />
      <UsersList
        users={users}
        friends={friends}
        getProfile={() => getProfile(userId)}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  users: usersSelectors.getUsers(state),
  userId: appSelectors.getUserId(state),
  friends: profileSelectors.getProfileFriends(state),
});

const mapDispatchToProps = {
  getUsersAll,
  getProfile,
};

const UsersPage = connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

export default FrameHoc(UsersPage);
