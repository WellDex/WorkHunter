import React from 'react';
import {IGroup} from '../../../Redux/groups/groupsReducer';
import {INote} from '../../../Redux/notes/notesReducer';
import CreateNote from '../../note/CreateNote';
import Note from '../../note/Note';

interface IGroupNotes {
  notes: INote[];
  profile: IGroup;
  getNotes: () => void;
  userId: string;
}

const GroupNotes = ({notes, profile, getNotes, userId}: IGroupNotes) => {
  return (
    <>
      {profile.owner === userId && (
        <CreateNote
          avatar={profile.avatar}
          getNotes={getNotes}
          id={profile._id}
          isGroup={true}
        />
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
            isOwner={profile.owner === userId}
            isGroup={true}
          />
        ))}
    </>
  );
};

export default GroupNotes;
