import {Avatar} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {usersAPI} from '../../api/usersAPI';
import FrameHoc from '../../hoc/FrameHoc';

const options = {
  top: 6,
  count: true,
};

interface IFriendsProps {
  countFriends: number;
}

//check
//todo
const ProfileFriends = ({countFriends}: IFriendsProps) => {
  const [friends, setFriends] = useState<any[]>([]);
  useEffect(() => {
    usersAPI.getFriends(options).then((res) => setFriends(res));
  }, []);

  return (
    <div className="card-container">
      <NavLink to="/friends">
        Друзья
        <span className="profile-gallery-title-count">{countFriends}</span>
      </NavLink>
      <div className="profile-friends-list">
        {friends.map((friend) => (
          <NavLink
            key={friend.id}
            to={`profile/${friend.id}`}
            className="profile-friends-list-item">
            <Avatar className="profile-friends-avatar" />
            <p>{`${friend.firstName} ${friend.lastName}`}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default FrameHoc(ProfileFriends);
