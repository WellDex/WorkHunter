import {
  Avatar,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {groupsAPI} from '../../../api/groupsAPI';
import FrameHoc from '../../../hoc/FrameHoc';
import {IGroup} from '../../../Redux/groups/groupsReducer';
import ModalCreateGroup from '../ModalCreateGroup';

interface IGroupAvatar {
  group: IGroup;
  userId: string;
  getGroup: () => void;
}

const GroupAvatar = ({group, userId, getGroup}: IGroupAvatar) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [isFollow, setIsFollow] = useState(
    group.subscribers && group.subscribers.length > 0
      ? group.subscribers.includes(userId)
      : false
  );

  //todo
  useEffect(() => {
    setIsFollow(
      group.subscribers && group.subscribers.length > 0
        ? group.subscribers.includes(userId)
        : false
    );
  }, [group.subscribers]);

  const follow = () =>
    groupsAPI.follow(group._id).then(() => setIsFollow(!isFollow));
  const unfollow = () =>
    groupsAPI.unfollow(group._id).then(() => setIsFollow(!isFollow));
  const deleteGroup = () =>
    groupsAPI.deleteGroup(group._id).then(() => history.push('/groups'));

  return (
    <div className="card-container">
      {/* <CardMedia
        className="groupProfile-avatar-img"
        component="img"
        height="140"
        image="https://picsum.photos/200/300"
        alt="avatar"
      /> */}
      <Avatar variant="rounded" sx={{width: '100%', height: 300}} />
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
