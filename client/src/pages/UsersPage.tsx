import React, {useEffect, useState} from 'react';
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
import {setLoading} from '../Redux/app/appOperations';

interface IUsersProps {
  users: IUser[];
  getUsersAll: () => void;
  getProfile: (id: string) => void;
  friends: string[];
  userId: string;
  setLoading: (b: boolean) => void;
}

const UsersContainer = ({
  users,
  getUsersAll,
  friends,
  getProfile,
  userId,
  setLoading,
}: IUsersProps) => {
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    getUsersAll();
  }, []);
  return (
    <div>
      <UsersControl users={users} setSearchValue={setSearchValue} />
      <UsersList
        users={users.filter((user) =>
          searchValue === ''
            ? user
            : `${user.firstName} ${user.lastName}`
                .toLowerCase()
                .includes(searchValue.toLowerCase())
        )}
        friends={friends}
        getProfile={() => getProfile(userId)}
        setLoading={setLoading}
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
  setLoading,
};

const UsersPage = connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

export default FrameHoc(UsersPage);
