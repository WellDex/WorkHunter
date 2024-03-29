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
import NoData from '../components/common/NoData';
import {setLoading, setMessage} from '../Redux/app/appOperations';

export interface IGallery {
  createDate: string;
  img: string;
  _id: string;
}

interface IGalleryPage {
  userId: string;
  setLoading: (b: boolean) => void;
  setMessage: (a: any) => void;
}

const GalleryContainer = ({userId, setLoading, setMessage}: IGalleryPage) => {
  const params: {id: string} = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [img, setImg] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [gallery, setGallery] = useState<IGallery[]>([]);

  const getGallery = async () => {
    setLoading(true);
    await galleryAPI
      .getGallery(params.id)
      .then((res) => setGallery(res))
      .catch((e: any) => {
        setMessage({message: e.response.data.message, type: 'error'});
      })
      .finally(() => setLoading(false));
  };

  const deleteGroup = async () => {
    setLoading(true);
    await galleryAPI
      .deleteImage(deleteId)
      .then((res) => {
        setMessage({message: res.message, type: 'success'});
        setIsOpenConfirmDelete(false);
        getGallery();
      })
      .catch((e: any) => {
        setMessage({message: e.response.data.message, type: 'error'});
      })
      .finally(() => setLoading(false));
  };

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
      {gallery.length > 0 ? (
        <ImageList cols={4} gap={16}>
          {gallery.map((item, index) => (
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
      ) : (
        <NoData />
      )}
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
        setLoading={setLoading}
        setMessage={setMessage}
        handleClose={() => setIsOpenModal(false)}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userId: appSelectors.getUserId(state),
});

const GalleryPage = connect(mapStateToProps, {setLoading, setMessage})(
  GalleryContainer
);

export default FrameHoc(GalleryPage);
