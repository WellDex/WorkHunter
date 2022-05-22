import React from 'react';
import {INote} from '../../Redux/notes/notesReducer';
import {IStateProfile} from '../../Redux/profile/profileReducer';
import CreateNote from '../note/CreateNote';
import Note from '../note/Note';

interface IProfileNotes {
  notes: INote[];
  profile: IStateProfile;
  getNotes: () => void;
}

const ProfileNotes = ({notes, profile, getNotes}: IProfileNotes) => {
  return (
    <>
      <CreateNote getNotes={getNotes} />
      {notes &&
        profile &&
        notes.length > 0 &&
        notes.map((note, index) => (
          <Note key={index} note={note} profile={profile} getNotes={getNotes} />
        ))}
    </>
  );
};

export default ProfileNotes;
