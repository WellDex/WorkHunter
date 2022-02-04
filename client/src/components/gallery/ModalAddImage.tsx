import {Button, Dialog, Divider, Input, TextField} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

interface IModalAddImage {
  open: boolean;
  handleClose: () => void;
}

const ModalAddImage = ({open, handleClose}: IModalAddImage) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form onSubmit={onSubmit} className="projects-form">
          <h1 className="projects-form-title">Добавить фотографию</h1>
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
          <DatePicker
            value={new Date()}
            onChange={() => {}}
            disabled={true}
            renderInput={(params: any) => <TextField {...params} />}
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
      </LocalizationProvider>
    </Dialog>
  );
};

export default ModalAddImage;
