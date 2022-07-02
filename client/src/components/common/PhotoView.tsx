import {Dialog, DialogActions, IconButton} from '@mui/material';
import React, {useEffect, useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {getImgUrl} from '../../utils/getImgUrl';

interface IPhotoView {
  imgs: {img: string}[];
  selectImg?: string;
  isOpen: boolean;
  handleClose: () => void;
}

const PhotoView = ({imgs, selectImg, isOpen, handleClose}: IPhotoView) => {
  const [current, setCurrent] = useState(0);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(true);
  const next = () => {
    if (imgs.length > 0) {
      return setCurrent(current === imgs?.length - 1 ? current : current + 1);
    }
    setCurrent(0);
  };
  const prev = () => {
    if (imgs.length > 0) {
      return setCurrent(current === 0 ? current : current - 1);
    }
    setCurrent(0);
  };
  useEffect(() => {
    if (imgs?.length === 1) {
      setIsEnd(true);
      setIsStart(true);
    }
    if (imgs.length > 0 && current === imgs?.length - 1) {
      setIsEnd(true);
    } else {
      setIsEnd(false);
    }
    if (imgs.length > 0 && current === 0) {
      setIsStart(true);
    } else {
      setIsStart(false);
    }
  }, [current, imgs]);

  useEffect(() => {
    if (imgs.length > 0) {
      setCurrent(imgs.findIndex((item) => item.img === selectImg));
    }
  }, [selectImg]);

  return (
    <Dialog maxWidth={false} open={isOpen} onClose={handleClose}>
      <div className="photoView">
        <IconButton onClick={handleClose} className="photoView-close">
          <CloseIcon />
        </IconButton>
        {imgs.length > 0 && <img src={getImgUrl(imgs[current]?.img)} />}
        {!isStart && (
          <DialogActions className="photoView-prev" onClick={prev}>
            <IconButton>
              <ArrowBackIosIcon />
            </IconButton>
          </DialogActions>
        )}
        {!isEnd && (
          <DialogActions className="photoView-next" onClick={next}>
            <IconButton>
              <ArrowForwardIosIcon />
            </IconButton>
          </DialogActions>
        )}
      </div>
    </Dialog>
  );
};

export default PhotoView;
