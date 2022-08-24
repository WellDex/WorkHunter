import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {groupsAPI} from '../../../api/groupsAPI';
import FrameHoc from '../../../hoc/FrameHoc';
import {IGroup} from '../../../Redux/groups/groupsReducer';
import {getImgUrl} from '../../../utils/getImgUrl';
import ModalCreateGroup from '../ModalCreateGroup';

interface IGroupAvatar {
  group: IGroup;
  userId: string;
  getGroup: () => void;
  setLoading: (b: boolean) => void;
  setMessage: (a: any) => void;
}

const GroupAvatar = ({
  group,
  userId,
  getGroup,
  setLoading,
  setMessage,
}: IGroupAvatar) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [isFollow, setIsFollow] = useState(
    group.subscribers && group.subscribers.length > 0
      ? group.subscribers.includes(userId)
      : false
  );

  useEffect(() => {
    setIsFollow(
      group.subscribers && group.subscribers.length > 0
        ? group.subscribers.includes(userId)
        : false
    );
  }, [group.subscribers]);

  const follow = () => {
    setLoading(true);
    groupsAPI
      .follow(group._id)
      .then(() => setIsFollow(!isFollow))
      .catch((e: any) => {
        setMessage({message: e.response.data.message, type: 'error'});
      })
      .finally(() => setLoading(false));
  };
  const unfollow = () => {
    setLoading(true);
    groupsAPI
      .unfollow(group._id)
      .then(() => setIsFollow(!isFollow))
      .catch((e: any) => {
        setMessage({message: e.response.data.message, type: 'error'});
      })
      .finally(() => setLoading(false));
  };
  const deleteGroup = () => {
    setLoading(true);
    groupsAPI
      .deleteGroup(group._id)
      .then((res) => {
        setMessage({message: res.message, type: 'success'});
        history.push('/groups');
      })
      .catch((e: any) => {
        setMessage({message: e.response.data.message, type: 'error'});
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="card-container">
      {group.avatar ? (
        <Avatar
          variant="rounded"
          sx={{width: '100%', height: 300}}
          src={getImgUrl(group.avatar)}
        />
      ) : (
        <Avatar variant="rounded" sx={{width: '100%', height: 300}} />
      )}
      {group.owner === userId ? (
        <>
          <Button
            className="groupProfile-avatar-btn-edit"
            variant="outlined"
            onClick={() => setIsOpen(true)}>
            Редактировать
          </Button>
          <Button
            className="groupProfile-avatar-btn-delete"
            color="error"
            variant="contained"
            onClick={() => setIsOpenConfirmDelete(true)}>
            Удалить
          </Button>
        </>
      ) : (
        <Button
          className="groupProfile-avatar-btn-edit"
          variant="contained"
          color={isFollow ? 'error' : 'primary'}
          onClick={isFollow ? unfollow : follow}>
          {isFollow ? 'Отписаться' : 'Подписаться'}
        </Button>
      )}
      {isOpen && (
        <ModalCreateGroup
          setMessage={setMessage}
          setLoading={setLoading}
          open={isOpen}
          handleClose={() => {
            getGroup();
            setIsOpen(false);
          }}
          group={group}
        />
      )}
      <Dialog open={isOpenConfirmDelete}>
        <DialogTitle>Вы действительно хотите удалить сообщество?</DialogTitle>
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
    </div>
  );
};

export default FrameHoc(GroupAvatar);
