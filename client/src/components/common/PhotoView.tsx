import {Dialog, IconButton} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface IPhotoView {
  img: string;
  isOpen: boolean;
  handleClose: () => void;
}

const PhotoView = ({img, isOpen, handleClose}: IPhotoView) => {
  return (
    <Dialog maxWidth={false} open={isOpen} onClose={handleClose}>
      <div className="photoView">
        <IconButton onClick={handleClose} className="photoView-close">
          <CloseIcon />
        </IconButton>
        <img src={img} />
      </div>
    </Dialog>
  );
};

export default PhotoView;
