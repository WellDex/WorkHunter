import {Avatar} from '@mui/material';
import React from 'react';
import {NavLink} from 'react-router-dom';
import FrameHoc from '../../hoc/FrameHoc';

const friends = [
  {name: 'asd', url: '/users/friends/1'},
  {name: 'asd', url: '/users/friends/1'},
  {name: 'asd', url: '/users/friends/1'},
  {name: 'asd', url: '/users/friends/1'},
  {name: 'asd', url: '/users/friends/1'},
  {name: 'asd', url: '/users/friends/1'},
];

const ProfileFriends = () => {
  return (
    <div className="card-container">
      <NavLink to="/users/friends">
        Друзья <span className="profile-gallery-title-count">31</span>
      </NavLink>
      <div className="profile-friends-list">
        {friends.map((el: any, index: number) => (
          <NavLink
            key={index}
            to={el.url}
            className="profile-friends-list-item">
            <Avatar className="profile-friends-avatar" />
            <p>{el.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default FrameHoc(ProfileFriends);
