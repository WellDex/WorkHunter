import {
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
} from '@mui/material';
import React, {useState} from 'react';
import PhotoView from '../components/common/PhotoView';
import AddIcon from '@mui/icons-material/Add';
import FrameHoc from '../hoc/FrameHoc';
import ModalAddImage from '../components/groups/ModalCreateGroup';

const itemData = [
  {img: 'https://picsum.photos/1200/700', date: '19/09/2022'},
  {img: 'https://picsum.photos/1200/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/1200/800', date: '19/09/2022'},
  {img: 'https://picsum.photos/1100/700', date: '19/09/2022'},
  {img: 'https://picsum.photos/1100/600', date: '19/09/2022'},
  {img: 'https://picsum.photos/1100/800', date: '19/09/2022'},
  {img: 'https://picsum.photos/600', date: '19/09/2022'},
];

const GalleryPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [img, setImg] = useState('');
  return (
    <div className="card-container">
      <div className="gallery-head">
        <h1 className="gallery-head-title">Галерея</h1>
        <Tooltip title="Загрузить фотографию" placement="left">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => setIsOpenModal(true)}>
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
      <ImageList cols={4} gap={16}>
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
      <PhotoView
        imgs={itemData}
        selectImg={img}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
      <ModalAddImage
        open={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
      />
    </div>
  );
};

export default FrameHoc(GalleryPage);
