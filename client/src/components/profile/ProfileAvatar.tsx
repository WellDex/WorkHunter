import {Button, CardMedia} from '@mui/material';
import React from 'react';
import FrameHoc from '../../hoc/FrameHoc';

const ProfileAvatar = () => {
  return (
    <div className="card-container">
      <CardMedia
        className="profile-avatar-img"
        component="img"
        height="140"
        image="https://picsum.photos/200/300"
        alt="avatar"
      />
      <Button className="profile-avatar-btn-edit" variant="outlined">
        Редактировать
      </Button>
    </div>
  );
};

export default FrameHoc(ProfileAvatar);
