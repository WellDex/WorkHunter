import {Avatar, Button, TextField} from '@mui/material';
import React, {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import FrameHoc from '../../hoc/FrameHoc';
import {notesAPI} from '../../api/notesAPI';
import {getImgUrl} from '../../utils/getImgUrl';

interface ICreateNote {
  getNotes: () => void;
  isGroup?: boolean;
  id?: string;
  avatar?: string | null;
  setLoading: (b: boolean) => void;
  setMessage: (a: any) => void;
}
const CreateNote = ({
  getNotes,
  isGroup = false,
  id,
  avatar,
  setLoading,
  setMessage,
}: ICreateNote) => {
  const [text, setText] = useState('');

  const createNote = async () => {
    setLoading(true);
    isGroup && id
      ? await notesAPI
          .createGroupNote(text, id)
          .then((res) => {
            setMessage({message: res.message, type: 'success'});
            getNotes();
            setText('');
          })
          .catch((e: any) => {
            setMessage({message: e.response.data.message, type: 'error'});
          })
          .finally(() => setLoading(false))
      : await notesAPI
          .createNote(text)
          .then((res) => {
            setMessage({message: res.message, type: 'success'});
            getNotes();
            setText('');
          })
          .catch((e: any) => {
            setMessage({message: e.response.data.message, type: 'error'});
          })
          .finally(() => setLoading(false));
  };
  return (
    <div className="card-container profile-note-create">
      {avatar ? (
        <Avatar
          className="profile-note-create-avatar"
          src={getImgUrl(avatar)}
        />
      ) : (
        <Avatar className="profile-note-create-avatar" />
      )}
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
