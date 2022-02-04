import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
} from '@mui/material';
import React, {useState} from 'react';
import PhotoView from '../components/common/PhotoView';
import FrameHoc from '../hoc/FrameHoc';

const itemData = [
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
];

const GalleryPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState('');
  return (
    <div className="card-container">
      <ImageList cols={4} gap={16}>
        <ImageListItem cols={4}>
          <ListSubheader component="h1" className="gallery-title">
            Галерея
          </ListSubheader>
        </ImageListItem>
        {itemData.map((item) => (
          <ImageListItem
            key={item.img}
            className="gallery-list-item"
            onClick={() => {
              setImg(item.img);
              setIsOpen(true);
            }}>
            <img
              src={item.img}
              srcSet={item.img}
              alt={item.date}
              loading="lazy"
            />
            <ImageListItemBar
              className="gallery-list-bar"
              position="below"
              actionPosition="right"
              title={item.date}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <PhotoView img={img} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default FrameHoc(GalleryPage);
