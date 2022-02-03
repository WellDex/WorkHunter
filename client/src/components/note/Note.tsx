import {Avatar, IconButton} from '@mui/material';
import React from 'react';
import {NavLink} from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FrameHoc from '../../hoc/FrameHoc';

const Note = () => {
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
      <div className="profile-note-footer">
        <IconButton className="profile-note-footer-btn">
          <FavoriteBorderIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default FrameHoc(Note);
