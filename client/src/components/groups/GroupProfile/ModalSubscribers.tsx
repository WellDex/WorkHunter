import {
  Avatar,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import React, {useEffect, useState} from 'react';
import {groupsAPI} from '../../../api/groupsAPI';

interface IModalSubscribers {
  open: boolean;
  handleClose: () => void;
  isOwner: boolean;
  groupId: string;
}

const ModalSubscribers = ({
  open,
  handleClose,
  isOwner,
  groupId,
}: IModalSubscribers) => {
  const [subscribers, setSubscribers] = useState([]);
  useEffect(() => {
    groupsAPI.getSubscribers(groupId).then((res) => setSubscribers(res));
  }, [groupId]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="groupProfile-subscribers-modal">
        <h1 className="groupProfile-subscribers-title">Подписчики</h1>
        <IconButton
          className="groupProfile-subscribers-modal-btn-close"
          aria-label="close"
          onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Divider />
        <List className="groupProfile-subscribers-list">
          {subscribers.length > 0 &&
            subscribers.map((s: any, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  isOwner && (
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  )
                }>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText primary={`${s.firstName} ${s.lastName}`} />
              </ListItem>
            ))}
        </List>
      </div>
    </Dialog>
  );
};

export default ModalSubscribers;
