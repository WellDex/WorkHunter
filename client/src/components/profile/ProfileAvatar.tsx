import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {messengerAPI} from '../../api/messengerAPI';
import {profileAPI} from '../../api/profileAPI';
import {usersAPI} from '../../api/usersAPI';
import FrameHoc from '../../hoc/FrameHoc';
import {getImgUrl} from '../../utils/getImgUrl';

interface IProfileAvatar {
  avatar: string | null;
  isOwner: boolean;
}

const ProfileAvatar = ({avatar, isOwner}: IProfileAvatar) => {
  const [isFollow, setIsFollow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState<any>(null);
  const params: {id: string} = useParams();

  useEffect(() => {
    if (!isOwner) {
      profileAPI.getFriends().then((res) => {
        setIsFollow(res.includes(params.id));
      });
    }
  }, [params.id]);

  const follow = () =>
    usersAPI.follow(params.id).then(() => setIsFollow(!isFollow));
  const unfollow = () =>
    usersAPI.unfollow(params.id).then(() => setIsFollow(!isFollow));

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile((e.target.files && e.target.files[0]) || null);
    e.target.value = '';

    setOpenModal(true);
  };

  const changeAvatar = () => {
    setOpenModal(false);
    const formData = new FormData();
    formData.append('img', file);
    profileAPI.updateAvatar(formData);
  };

  const createChat = () => {
    messengerAPI.createChat(params.id);
  };

  return (
    <div className="card-container">
      {avatar ? (
        <Avatar
          variant="rounded"
          sx={{width: '100%', height: 300}}
          src={getImgUrl(avatar)}
        />
      ) : (
        <Avatar variant="rounded" sx={{width: '100%', height: 300}} />
      )}
      {isOwner ? (
        <label htmlFor="contained-button-file">
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            style={{display: 'none'}}
            onChange={selectFile}
          />
          <Button
            className="profile-avatar-btn-edit"
            variant="outlined"
            component="span">
            Редактировать
          </Button>
        </label>
      ) : (
        <>
          <Button
            className="profile-avatar-btn-edit"
            variant="contained"
            color={isFollow ? 'error' : 'primary'}
            onClick={isFollow ? unfollow : follow}>
            {isFollow ? 'Отписаться' : 'Подписаться'}
          </Button>
          <Button
            className="profile-avatar-btn-edit"
            variant="contained"
            color={'primary'}
            onClick={createChat}>
            Написать
          </Button>
        </>
      )}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle id="alert-dialog-title">
          Вы действительно хотите обновить фото профиля?
        </DialogTitle>
        <DialogActions>
          <div className="profile-avatar-modal-actions">
            <Button
              variant="outlined"
              onClick={() => {
                setOpenModal(false);
                setFile(null);
              }}>
              закрить
            </Button>
            <Button variant="contained" onClick={changeAvatar}>
              обновить
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FrameHoc(ProfileAvatar);
