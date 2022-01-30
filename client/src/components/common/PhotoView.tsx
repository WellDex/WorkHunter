import {IconButton, Modal} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface IPhotoView {
  img: string;
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
}

const PhotoView = ({img, isOpen, setIsOpen}: IPhotoView) => {
  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="photoView">
        <IconButton
          onClick={() => setIsOpen(false)}
          className="photoView-close">
          <CloseIcon />
        </IconButton>
        <img src={img} />
      </div>
    </Modal>
  );
};

export default PhotoView;
