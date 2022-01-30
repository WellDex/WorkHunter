import {Avatar, Button, Fab, TextField} from '@mui/material';
import React from 'react';
import FrameHoc from '../../../hoc/FrameHoc';
import AddIcon from '@mui/icons-material/Add';

const CreateNote = () => {
  return (
    <div className="card-container profile-note-create">
      <Avatar className="profile-note-create-avatar" />
      <TextField
        id="outlined-textarea"
        label="Что у вас нового?"
        placeholder="Что у вас нового?"
        fullWidth={true}
        multiline
      />
      <Button
        variant="outlined"
        className="profile-note-create-btn"
        size="small">
        <AddIcon />
      </Button>
    </div>
  );
};

export default FrameHoc(CreateNote);
