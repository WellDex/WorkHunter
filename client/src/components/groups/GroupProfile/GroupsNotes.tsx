import React from 'react';
import CreateNote from '../../note/CreateNote';
import Note from '../../note/Note';

const notes = [1, 2, 3];

const GroupsNotes = () => {
  return (
    <>
      <CreateNote />
      {notes.map((el: any, index) => (
        <Note key={index} />
      ))}
    </>
  );
};

export default GroupsNotes;
