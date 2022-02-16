import {Avatar, BottomNavigation, BottomNavigationAction} from '@mui/material';
import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FrameHoc from '../../hoc/FrameHoc';

const Note = () => {
  const [value, setValue] = useState('');
  return (
    <div className="card-container">
      <div className="profile-note-head">
        <NavLink to={'/profile'}>
          <Avatar className="profile-note-head-avatar" />
        </NavLink>
        <div className="profile-note-head-wrapper">
          <NavLink to={'/profile'}>Leo</NavLink>
          <p>6 мар 2021</p>
        </div>
      </div>
      <div className="profile-note-content">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
        architecto est at perspiciatis accusamus iure totam, quisquam impedit
        dolores magni qui asperiores? Veniam expedita reprehenderit suscipit,
        totam odit voluptas sint.
      </div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        style={{justifyContent: 'flex-start', height: 'fit-content'}}>
        <BottomNavigationAction
          style={{maxWidth: 'fit-content', minWidth: 'fit-content', padding: 0}}
          icon={<FavoriteIcon />}
        />
      </BottomNavigation>
    </div>
  );
};

export default FrameHoc(Note);
