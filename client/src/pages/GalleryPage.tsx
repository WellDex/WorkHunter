import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import PhotoView from '../components/common/PhotoView';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FrameHoc from '../hoc/FrameHoc';
import ModalAddImage from '../components/gallery/ModalAddImage';
import moment from 'moment';
import {galleryAPI} from '../api/galleryAPI';
import {getImgUrl} from '../utils/getImgUrl';
import {useParams} from 'react-router-dom';
import * as appSelectors from '../Redux/app/appSelectors';
import {connect} from 'react-redux';

export interface IGallery {
  createDate: string;
  img: string;
  _id: string;
}

interface IGalleryPage {
  userId: string;
}

const GalleryContainer = ({userId}: IGalleryPage) => {
  const params: {id: string} = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [img, setImg] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [gallery, setGallery] = useState<IGallery[]>([]);

  const getGallery = async () => {
    await galleryAPI.getGallery(params.id).then((res) => setGallery(res));
  };
  const deleteGroup = async () =>
    await galleryAPI.deleteImage(deleteId).then(() => {
      setIsOpenConfirmDelete(false);
      getGallery();
    });

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <div className="card-container">
      <div className="gallery-head">
        <h1 className="gallery-head-title">Галерея</h1>
        {userId === params.id && (
          <Tooltip title="Загрузить фотографию" placement="left">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => setIsOpenModal(true)}>
              <AddIcon />
            </Button>
          </Tooltip>
        )}
      </div>
      <ImageList cols={4} gap={16}>
        {gallery.length > 0 &&
          gallery.map((item, index) => (
            <ImageListItem key={index} className="gallery-list-item">
              <img
                src={getImgUrl(item.img)}
                srcSet={getImgUrl(item.img)}
                alt={moment(item.createDate).format('DD/MM/YYYY')}
                onClick={() => {
                  setImg(item.img);
                  setIsOpen(true);
                }}
                loading="lazy"
              />
              <ImageListItemBar
                className="gallery-list-bar"
                position="below"
                actionPosition="right"
                title={moment(item.createDate).format('DD/MM/YYYY')}
                actionIcon={
                  userId === params.id && (
                    <IconButton
                      onClick={() => {
                        setDeleteId(item._id);
                        setIsOpenConfirmDelete(true);
                      }}>
                      <DeleteIcon />
                    </IconButton>
                  )
                }
              />
            </ImageListItem>
          ))}
      </ImageList>
      <Dialog open={isOpenConfirmDelete}>
        <DialogTitle>Вы действительно хотите удалить фотографию?</DialogTitle>
        <DialogActions style={{display: 'flex', justifyContent: 'center'}}>
          <Button
            onClick={() => setIsOpenConfirmDelete(false)}
            variant="contained">
            Закрить
          </Button>
          <Button onClick={deleteGroup} color="error" variant="contained">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
      <PhotoView
        imgs={gallery}
        selectImg={img}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
      <ModalAddImage
        id={params.id}
        open={isOpenModal}
        getGallery={getGallery}
        handleClose={() => setIsOpenModal(false)}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userId: appSelectors.getUserId(state),
});

const GalleryPage = connect(mapStateToProps, {})(GalleryContainer);

export default FrameHoc(GalleryPage);
