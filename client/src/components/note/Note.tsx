import {Avatar, BottomNavigation, BottomNavigationAction} from '@mui/material';
import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FrameHoc from '../../hoc/FrameHoc';
import {INote} from '../../Redux/notes/notesReducer';
import {IStateProfile} from '../../Redux/profile/profileReducer';
import moment from 'moment';

interface INoteProps {
  note: INote;
  profile: IStateProfile;
}

const Note = ({note, profile}: INoteProps) => {
  const [value, setValue] = useState('');
  return (
    <div className="card-container">
      <div className="profile-note-head">
        <NavLink to={'/profile'}>
          <Avatar className="profile-note-head-avatar" />
        </NavLink>
        <div className="profile-note-head-wrapper">
          <NavLink to={'/profile'}>{profile.firstName}</NavLink>
          <p>
            {moment(note.createDate)
              .locale('ru')
              .format('DD MMMM YYYY HH:mm:ss')}
          </p>
        </div>
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
