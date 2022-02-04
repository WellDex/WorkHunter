import {Button, Dialog, Divider, TextField} from '@mui/material';
import React from 'react';

interface IModalAddProject {
  open: boolean;
  handleClose: () => void;
}

const ModalAddProject = ({open, handleClose}: IModalAddProject) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={onSubmit} className="projects-form">
        <h1 className="projects-form-title">Добавить проект</h1>
        <Divider />
        <label htmlFor="contained-button-file">
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            name="preview"
            type="file"
            style={{display: 'none'}}
          />
          <Button fullWidth={true} variant="contained" component="span">
            Загрузить
          </Button>
        </label>
        <TextField
          required
          id="outlined-required"
          label="Название проекта"
          placeholder="Введите название проекта..."
        />
        <Divider />
        <div className="projects-form-btns">
          <Button variant="contained" onClick={handleClose}>
            закрить
          </Button>
          <Button type="submit" variant="contained">
            сохранить
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default ModalAddProject;
