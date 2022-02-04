import {
  Avatar,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import React, {useState} from 'react';
import FrameHoc from '../../hoc/FrameHoc';
import PhotoView from '../common/PhotoView';

const itemData = [
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
];

const Histories = () => {
  const [img, setImg] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="histories">
      <ImageList className="histories-list customScroll">
        {itemData.map((item) => (
          <ImageListItem
            className="histories-list-item"
            key={item.img}
            onClick={() => {
              setImg(item.img);
              setIsOpen(true);
            }}>
            <img
              className="histories-list-item-img"
              src={item.img}
              srcSet={item.img}
              loading="lazy"
            />
            <ImageListItemBar
              className="histories-list-item-info"
              actionIcon={<Avatar />}
              actionPosition={'left'}
              position="bottom"
              title={'WellDexWellDexWellDexWellDexWellDex'}
            />
            <div className="histories-list-item-hover"></div>
          </ImageListItem>
        ))}
      </ImageList>
      <PhotoView
        img={img}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default FrameHoc(Histories);
