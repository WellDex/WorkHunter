import {Dialog, DialogActions, IconButton} from '@mui/material';
import React, {useEffect, useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface IPhotoView {
  imgs: {
    img: string;
    date?: string;
  }[];
  selectImg?: string;
  isOpen: boolean;
  handleClose: () => void;
}

const PhotoView = ({imgs, selectImg, isOpen, handleClose}: IPhotoView) => {
  const [current, setCurrent] = useState(0);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(true);
  const next = () => {
    if (imgs) {
      return setCurrent(current === imgs?.length - 1 ? current : current + 1);
    }
    setCurrent(0);
  };
  const prev = () => {
    if (imgs) {
      return setCurrent(current === 0 ? current : current - 1);
    }
    setCurrent(0);
  };
  useEffect(() => {
    if (imgs?.length === 1) {
      setIsEnd(true);
      setIsStart(true);
      return;
    }
    if (imgs && current === imgs?.length - 1) {
      return setIsEnd(true);
    }
    if (imgs && current === 0) {
      return setIsStart(true);
    }
    setIsEnd(false);
    setIsStart(false);
  }, [current, imgs]);

  useEffect(() => {
    if (imgs) {
      setCurrent(imgs.findIndex((item) => item.img === selectImg));
    }
  }, [selectImg]);

  return (
    <Dialog maxWidth={false} open={isOpen} onClose={handleClose}>
      <div className="photoView">
        <IconButton onClick={handleClose} className="photoView-close">
          <CloseIcon />
        </IconButton>
        {imgs && <img src={imgs[current]?.img} />}
        {!isStart && (
          <DialogActions className="photoView-prev">
            <IconButton onClick={prev}>
              <ArrowBackIosIcon />
            </IconButton>
          </DialogActions>
        )}
        {!isEnd && (
          <DialogActions className="photoView-next">
            <IconButton onClick={next}>
              <ArrowForwardIosIcon />
            </IconButton>
          </DialogActions>
        )}
      </div>
    </Dialog>
  );
};

export default PhotoView;
