import {Avatar, Button, CardMedia} from '@mui/material';
import React from 'react';
import FrameHoc from '../../hoc/FrameHoc';
//todo
const ProfileAvatar = ({img}: any) => {
  return (
    <div className="card-container">
      {img ? (
        <CardMedia
          className="profile-avatar-img"
          component="img"
          height="140"
          image="https://picsum.photos/200/300"
          alt="avatar"
        />
      ) : (
        <Avatar variant="rounded" sx={{width: 260, height: 300}} />
      )}
      <Button className="profile-avatar-btn-edit" variant="outlined">
        Редактировать
      </Button>
    </div>
  );
};

export default FrameHoc(ProfileAvatar);
