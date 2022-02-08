import {Button, Dialog, Divider, TextField} from '@mui/material';
import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

interface IModalCreateGroup {
  open: boolean;
  handleClose: () => void;
}

const ModalCreateGroup = ({open, handleClose}: IModalCreateGroup) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form onSubmit={onSubmit} className="groups-form">
          <h1 className="groups-form-title">Создать группу</h1>
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
            variant="outlined"
            label="Название групи"
            placeholder="Введите название групи..."
            fullWidth={true}
          />
          <Divider />
          <div className="groups-form-btns">
            <Button variant="contained" onClick={handleClose}>
              закрить
            </Button>
            <Button type="submit" variant="contained">
              создать
            </Button>
          </div>
        </form>
      </LocalizationProvider>
    </Dialog>
  );
};

export default ModalCreateGroup;
