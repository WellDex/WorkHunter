import React from 'react';
import {useParams} from 'react-router-dom';
import {INote} from '../../Redux/notes/notesReducer';
import {IStateProfile} from '../../Redux/profile/profileReducer';
import CreateNote from '../note/CreateNote';
import Note from '../note/Note';

interface IProfileNotes {
  notes: INote[];
  profile: IStateProfile;
  getNotes: () => void;
  userId: string;
}

const ProfileNotes = ({notes, profile, getNotes, userId}: IProfileNotes) => {
  const params: {id: string} = useParams();
  return (
    <>
      {params.id === userId && (
        <CreateNote avatar={profile.avatar} getNotes={getNotes} />
      )}
      {notes &&
        profile &&
        notes.length > 0 &&
        notes.map((note, index) => (
          <Note
            key={index}
            note={note}
            profile={profile}
            getNotes={getNotes}
            isOwner={params.id === userId}
          />
        ))}
    </>
  );
};

export default ProfileNotes;
