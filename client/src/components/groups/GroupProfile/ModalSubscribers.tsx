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
import {setLoading} from '../../../Redux/app/appOperations';

interface IModalSubscribers {
  open: boolean;
  handleClose: () => void;
  isOwner: boolean;
  groupId: string;
  setLoading: (b: boolean) => void;
  setMessage: (a: any) => void;
}

const ModalSubscribers = ({
  open,
  handleClose,
  isOwner,
  groupId,
  setMessage,
}: IModalSubscribers) => {
  const [subscribers, setSubscribers] = useState([]);
  useEffect(() => {
    setLoading(true);
    groupsAPI
      .getSubscribers(groupId)
      .then((res) => setSubscribers(res))
      .catch((e: any) => {
        setMessage({message: e.response.data.message, type: 'error'});
      })
      .finally(() => setLoading(false));
  }, [groupId]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="groupProfile-subscribers-modal">
        <h1 className="groupProfile-subscribers-title">Підписники</h1>
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
