import {Avatar} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {usersAPI} from '../../api/usersAPI';
import FrameHoc from '../../hoc/FrameHoc';
import {FRIENDS_PATH} from '../../route/const';
import {getImgUrl} from '../../utils/getImgUrl';

const options = {
  top: 6,
  count: true,
};

interface IFriendsProps {
  id: string;
  countFriends: number;
}

const ProfileFriends = ({id, countFriends}: IFriendsProps) => {
  const [friends, setFriends] = useState<any[]>([]);
  useEffect(() => {
    usersAPI.getFriends(id, options).then((res) => setFriends(res));
  }, [id]);

  return (
    <div className="card-container">
      <NavLink to={`${FRIENDS_PATH}/${id}`}>
        Друзья
        <span className="profile-gallery-title-count">{countFriends}</span>
      </NavLink>
      <div className="profile-friends-list">
        {friends.length > 0 &&
          friends.map((friend) => (
            <NavLink
              key={friend.id}
              to={`${friend.id}`}
              className="profile-friends-list-item">
              {friend.avatar ? (
                <Avatar
                  className="profile-friends-avatar"
                  src={getImgUrl(friend.avatar)}
                />
              ) : (
                <Avatar className="profile-friends-avatar" />
              )}
              <p>{`${friend.firstName} ${friend.lastName}`}</p>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default FrameHoc(ProfileFriends);
