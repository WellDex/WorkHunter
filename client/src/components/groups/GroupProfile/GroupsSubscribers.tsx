import {Avatar} from '@mui/material';
import React from 'react';
import {NavLink} from 'react-router-dom';
import FrameHoc from '../../../hoc/FrameHoc';

const friends = [
  {name: 'asd', url: '/profile'},
  {name: 'asd', url: '/profile'},
  {name: 'asd', url: '/profile'},
  {name: 'asd', url: '/profile'},
  {name: 'asd', url: '/profile'},
  {name: 'asd', url: '/profile'},
];

const GroupsSubscribers = () => {
  return (
    <div className="card-container">
      <div>
        Подписчики <span className="groupProfile-gallery-title-count">31</span>
      </div>
      <div className="groupProfile-friends-list">
        {friends.map((el: any, index: number) => (
          <NavLink
            key={index}
            to={el.url}
            className="groupProfile-friends-list-item">
            <Avatar className="groupProfile-friends-avatar" />
            <p>{el.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default FrameHoc(GroupsSubscribers);
