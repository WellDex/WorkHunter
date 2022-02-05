import {ImageList, ImageListItem} from '@mui/material';
import React, {useState} from 'react';
import FrameHoc from '../../../hoc/FrameHoc';
import SearchIcon from '@mui/icons-material/Search';
import {NavLink} from 'react-router-dom';
import PhotoView from '../../common/PhotoView';

const itemData = [
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
];

const GroupGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState('');
  return (
    <div className="card-container">
      <div>
        Галерея
        <span className="groupProfile-gallery-title-count">31</span>
      </div>
      <ImageList cols={4} rowHeight={150} className="groupProfile-gallery-list">
        {itemData.map((item, index) => (
          <ImageListItem
            className="groupProfile-gallery-img"
            key={index}
            onClick={() => {
              setImg(item.img);
              setIsOpen(true);
            }}>
            <img src={item.img} srcSet={item.img} loading="lazy" />
            <div className="groupProfile-gallery-img-preview">
              <SearchIcon className="groupProfile-gallery-img-preview-icon" />
            </div>
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

export default FrameHoc(GroupGallery);
