import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
} from '@mui/material';
import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FrameHoc from '../../hoc/FrameHoc';
import {INote} from '../../Redux/notes/notesReducer';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import {notesAPI} from '../../api/notesAPI';
import {getImgUrl} from '../../utils/getImgUrl';
import {listenerCount} from 'process';

interface INoteProps {
  rowRef: any;
  note: INote;
  getNotes?: () => void;
  isOwner?: boolean;
  isGroup?: boolean;
  setLoading: (b: boolean) => void;
  setMessage: (a: any) => void;
  userId: string;
}

const Note = ({
  rowRef,
  note,
  getNotes,
  isOwner = false,
  isGroup = false,
  setLoading,
  setMessage,
  userId,
}: INoteProps) => {
  const [value, setValue] = useState(note.subscribers.includes(userId) ? 0 : 1);
  const [likeCount, setLikeCount] = useState(note.subscribers.length);
  const deleteNote = async () => {
    setLoading(true);
    await notesAPI
      .deleteNote(note._id)
      .then((res) => {
        setMessage({message: res.message, type: 'success'});
        getNotes && getNotes();
      })
      .catch((e: any) => {
        setMessage({message: e.response.data.message, type: 'error'});
      })
      .finally(() => setLoading(false));
  };

  const likeNote = async () => {
    setValue(!!value ? 0 : 1);
    setLikeCount(!!value ? likeCount + 1 : likeCount - 1);
    await notesAPI
      .like(note._id)
      .then(() => {
        getNotes && getNotes();
      })
      .catch((e: any) => {
        setMessage({message: e.response.data.message, type: 'error'});
      });
  };

  return (
    <div className="card-container" ref={rowRef}>
      <div className="profile-note-head">
        <div className="profile-note-head-container">
          <NavLink
            to={isGroup ? `/group/${note.owner}` : `/profile/${note.owner}`}>
            {note.user.avatar ? (
              <Avatar
                className="profile-note-head-avatar"
                src={getImgUrl(note.user.avatar)}
              />
            ) : (
              <Avatar className="profile-note-head-avatar" />
            )}
          </NavLink>
          <div className="profile-note-head-wrapper">
            <NavLink
              to={isGroup ? `/group/${note.owner}` : `/profile/${note.owner}`}>
              {note.user.name}
            </NavLink>

            <p>
              {moment(note.createDate)
                .locale('ru')
                .format('DD MMMM YYYY HH:mm:ss')}
            </p>
          </div>
        </div>
        {isOwner && (
          <IconButton aria-label="delete" size="small" onClick={deleteNote}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </div>
      <div className="profile-note-content">{note.text}</div>
      <BottomNavigation
        value={value}
        style={{justifyContent: 'flex-start', height: 'fit-content'}}>
        <BottomNavigationAction
          onClick={likeNote}
          showLabel={true}
          label={likeCount}
          style={{
            maxWidth: 'fit-content',
            minWidth: 'fit-content',
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
          }}
          icon={<FavoriteIcon />}
        />
      </BottomNavigation>
    </div>
  );
};

export default FrameHoc(Note);
