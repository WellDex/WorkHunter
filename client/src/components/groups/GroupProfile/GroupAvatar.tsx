import {Button, CardMedia} from '@mui/material';
import React from 'react';
import FrameHoc from '../../../hoc/FrameHoc';

const GroupAvatar = () => {
  return (
    <div className="card-container">
      <CardMedia
        className="groupProfile-avatar-img"
        component="img"
        height="140"
        image="https://picsum.photos/200/300"
        alt="avatar"
      />
      <Button className="groupProfile-avatar-btn-edit" variant="outlined">
        Редактировать
      </Button>
    </div>
  );
};

export default FrameHoc(GroupAvatar);
