import React, {useEffect} from 'react';
import * as usersSelectors from '../Redux/users/usersSelectors';
import {connect} from 'react-redux';
import FriendsList from '../components/users/FriendsList';
import UsersControl from '../components/users/UsersControl';
import FrameHoc from '../hoc/FrameHoc';
import {IUser} from '../Redux/users/usersReducer';
import {getFriends} from '../Redux/users/usersOperations';
import {useParams} from 'react-router-dom';

interface IFriendsProps {
  users: IUser[];
  getFriends: (id: string) => void;
}

const FriendsContainer = ({users, getFriends}: IFriendsProps) => {
  const params: any = useParams();
  useEffect(() => {
    getFriends(params.id);
  }, [params.id]);

  return (
    <div>
      <UsersControl />
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
