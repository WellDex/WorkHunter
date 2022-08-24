import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {messengerAPI} from '../../api/messengerAPI';
import {profileAPI} from '../../api/profileAPI';
import {usersAPI} from '../../api/usersAPI';
import FrameHoc from '../../hoc/FrameHoc';
import {MESSENGER_PATH} from '../../route/const';
import {getImgUrl} from '../../utils/getImgUrl';

interface IProfileAvatar {
  avatar: string | null;
  isOwner: boolean;
  setLoading: (b: boolean) => void;
  setMessage: (a: any) => void;
}

const ProfileAvatar = ({
  avatar,
  isOwner,
  setLoading,
  setMessage,
}: IProfileAvatar) => {
  const [isFollow, setIsFollow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState<any>(null);
  const params: {id: string} = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!isOwner) {
      setLoading(true);
      profileAPI
        .getFriends()
        .then((res) => {
          setIsFollow(res.includes(params.id));
        })
        .catch((e: any) => {
          setMessage({message: e.response.data.message, type: 'error'});
        })
        .finally(() => setLoading(false));
    }
  }, [params.id]);

  const follow = async () => {
    setLoading(true);
    await usersAPI
      .follow(params.id)
      .then(() => setIsFollow(!isFollow))
      .catch((e: any) => {
        setMessage({message: e.response.data.message, type: 'error'});
      })
      .finally(() => setLoading(false));
  };
  const unfollow = async () => {
    setLoading(true);
    await usersAPI
      .unfollow(params.id)
      .then(() => setIsFollow(!isFollow))
      .catch((e: any) => {
        setMessage({message: e.response.data.message, type: 'error'});
      })
      .finally(() => setLoading(false));
  };

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile((e.target.files && e.target.files[0]) || null);
    e.target.value = '';

    setOpenModal(true);
  };

  const changeAvatar = async () => {
    setLoading(true);
    setOpenModal(false);
    const formData = new FormData();
    formData.append('img', file);
    await profileAPI
      .updateAvatar(formData)
      .then((res) => {
        setMessage({message: res.message, type: 'success'});
      })
      .catch((e: any) => {
        setMessage({message: e.response.data.message, type: 'error'});
      })
      .finally(() => setLoading(false));
  };

  const createChat = async () => {
    setLoading(true);
    await messengerAPI
      .createChat(params.id)
      .then((res) => {
        setMessage({message: res.message, type: 'success'});
        history.push(`${MESSENGER_PATH}/${res.id}`);
      })
      .catch((e: any) => {
        setMessage({message: e.response.data.message, type: 'error'});
      })
      .finally(() => setLoading(false));
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
