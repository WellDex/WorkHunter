import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
} from '@mui/material';
import React, {useState} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FrameHoc from '../../hoc/FrameHoc';
import {INote} from '../../Redux/notes/notesReducer';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import {notesAPI} from '../../api/notesAPI';
import {getImgUrl} from '../../utils/getImgUrl';

interface INoteProps {
  note: INote;
  getNotes?: () => void;
  isOwner?: boolean;
  isGroup?: boolean;
}

const Note = ({
  note,
  getNotes,
  isOwner = false,
  isGroup = false,
}: INoteProps) => {
  const params: {id: string} = useParams();
  const [value, setValue] = useState('');

  const deleteNote = () => {
    notesAPI
      .deleteNote(note._id)
      .then((res) => getNotes && getNotes())
      .catch((e) => console.log(e));
  };

  return (
    <div className="card-container">
      <div className="profile-note-head">
        <div className="profile-note-head-container">
          {isGroup ? (
            note.user.avatar ? (
              <Avatar
                className="profile-note-head-avatar"
                src={getImgUrl(note.user.avatar)}
              />
            ) : (
              <Avatar className="profile-note-head-avatar" />
            )
          ) : (
            <NavLink to={`/profile/${params.id}`}>
              {note.user.avatar ? (
                <Avatar
                  className="profile-note-head-avatar"
                  src={getImgUrl(note.user.avatar)}
                />
              ) : (
                <Avatar className="profile-note-head-avatar" />
              )}
            </NavLink>
          )}
          <div className="profile-note-head-wrapper">
            {isGroup ? (
              <a type="button">{note.user.name}</a>
            ) : (
              <NavLink to={`/profile/${params.id}`}>{note.user.name}</NavLink>
            )}
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
        onChange={(event, newValue) => setValue(newValue)}
        style={{justifyContent: 'flex-start', height: 'fit-content'}}>
        <BottomNavigationAction
          style={{maxWidth: 'fit-content', minWidth: 'fit-content', padding: 0}}
          icon={<FavoriteIcon />}
        />
      </BottomNavigation>
    </div>
  );
};

export default FrameHoc(Note);
