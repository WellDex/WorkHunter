import {Avatar, Button, TextField} from '@mui/material';
import React, {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import FrameHoc from '../../hoc/FrameHoc';
import {notesAPI} from '../../api/notesAPI';
import {setMessage} from '../../Redux/app/appOperations';

interface ICreateNote {
  getNotes: () => void;
  isGroup?: boolean;
  id?: string;
}
const CreateNote = ({getNotes, isGroup = false, id}: ICreateNote) => {
  const [text, setText] = useState('');

  const createNote = async () => {
    try {
      const res =
        isGroup && id
          ? await notesAPI.createGroupNote(text, id)
          : await notesAPI.createNote(text);
      if (res) {
        setMessage({message: res.message, type: 'success'});
        getNotes();
        setText('');
      }
    } catch (error) {
      //@ts-ignore
      setMessage({message: error, type: 'error'});
    }
  };
  return (
    <div className="card-container profile-note-create">
      <Avatar className="profile-note-create-avatar" />
      <TextField
        id="outlined-textarea"
        label="Что у вас нового?"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
        placeholder="Что у вас нового?"
        fullWidth={true}
        multiline
      />
      <Button
        variant="outlined"
        className="profile-note-create-btn"
        size="small"
        onClick={createNote}>
        <AddIcon />
      </Button>
    </div>
  );
};

export default FrameHoc(CreateNote);
