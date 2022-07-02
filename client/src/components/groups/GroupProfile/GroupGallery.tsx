import {ImageList, ImageListItem} from '@mui/material';
import React, {useState} from 'react';
import FrameHoc from '../../../hoc/FrameHoc';
import SearchIcon from '@mui/icons-material/Search';
import {NavLink} from 'react-router-dom';
import PhotoView from '../../common/PhotoView';
import {GALLERY_PATH} from '../../../route/const';
import {getImgUrl} from '../../../utils/getImgUrl';
import {IGallery} from '../../../pages/GalleryPage';

interface IGroupGallery {
  id: string;
  countGallery: number;
  gallery: IGallery[];
}

const GroupGallery = ({id, countGallery, gallery}: IGroupGallery) => {
  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState('');
  return (
    <div className="card-container">
      <NavLink to={`${GALLERY_PATH}/${id}`}>
        Галерея{' '}
        <span className="profile-gallery-title-count">{countGallery}</span>
      </NavLink>
      <ImageList cols={4} rowHeight={150} className="groupProfile-gallery-list">
        {gallery.length > 0 &&
          gallery.map((item, index) => (
            <ImageListItem
              className="groupProfile-gallery-img"
              key={index}
              onClick={() => {
                setImg(item.img);
                setIsOpen(true);
              }}>
              <img
                src={getImgUrl(item.img)}
                srcSet={getImgUrl(item.img)}
                loading="lazy"
              />
              <div className="groupProfile-gallery-img-preview">
                <SearchIcon className="groupProfile-gallery-img-preview-icon" />
              </div>
            </ImageListItem>
          ))}
      </ImageList>
      <PhotoView
        imgs={gallery}
        selectImg={img}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default FrameHoc(GroupGallery);
