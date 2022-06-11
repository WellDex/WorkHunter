import {ImageList, ImageListItem} from '@mui/material';
import React, {useState} from 'react';
import FrameHoc from '../../hoc/FrameHoc';
import PhotoView from '../common/PhotoView';
import SearchIcon from '@mui/icons-material/Search';
import {NavLink} from 'react-router-dom';
import {GALLERY_PATH} from '../../route/const';

const itemData = [
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
  {img: 'https://picsum.photos/600'},
];

interface IProfileGallery {
  id: string;
}

const ProfileGallery = ({id}: IProfileGallery) => {
  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState('');
  return (
    <div className="card-container">
      <NavLink to={`${GALLERY_PATH}/${id}`}>
        Мои фотографии <span className="profile-gallery-title-count">31</span>
      </NavLink>
      <ImageList cols={4} rowHeight={150} className="profile-gallery-list">
        {itemData.map((item, index) => (
          <ImageListItem
            className="profile-gallery-img"
            key={index}
            onClick={() => {
              setImg(item.img);
              setIsOpen(true);
            }}>
            <img src={item.img} srcSet={item.img} loading="lazy" />
            <div className="profile-gallery-img-preview">
              <SearchIcon className="profile-gallery-img-preview-icon" />
            </div>
          </ImageListItem>
        ))}
      </ImageList>
      <PhotoView
        imgs={itemData}
        selectImg={img}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default FrameHoc(ProfileGallery);
