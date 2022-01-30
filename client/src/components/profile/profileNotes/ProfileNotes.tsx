import React from 'react';
import CreateNote from './CreateNote';
import Note from './Note';

const notes = [1, 2, 3];

const ProfileNotes = () => {
  return (
    <>
      <CreateNote />
      {notes.map((el: any, index) => (
        <Note key={index} />
      ))}
    </>
  );
};

export default ProfileNotes;
