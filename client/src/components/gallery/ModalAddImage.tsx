import {Button, Dialog, Divider, IconButton} from '@mui/material';
import React, {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {galleryAPI} from '../../api/galleryAPI';

interface IModalGallery {
  id: string;
  open: boolean;
  handleClose: () => void;
  getGallery: () => void;
}

const ModalAddImage = ({id, open, handleClose, getGallery}: IModalGallery) => {
  const [files, setFiles] = useState<any[]>([]);

  const handleDelete = (name: string) => {
    setFiles(files.filter((f) => f.name !== name));
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('id', id);
    files.forEach((file) => formData.append('img', file));

    galleryAPI.addImages(formData).then(() => {
      setFiles([]);
      getGallery();
      handleClose();
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div style={{padding: '1rem'}}>
        <label htmlFor="contained-button-file">
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            name="preview"
            type="file"
            style={{display: 'none'}}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFiles([
                ...files,
                (e.target.files && e.target.files[0]) as any,
              ]);
              e.target.value = '';
            }}
          />
          <Button fullWidth={true} variant="contained" component="span">
            Загрузить фотографию
          </Button>
        </label>
        {files.length > 0 &&
          files.map((file, index) => (
            <div className="gallery-file-container" key={index}>
              <div className="gallery-file-title">{file.name}</div>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(file.name);
                }}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        <Divider style={{margin: '1rem 0'}} />
        <div className="groups-form-btns">
          <Button variant="outlined" onClick={handleClose}>
            закрить
          </Button>
          <Button onClick={onSubmit} variant="contained">
            загрузить
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalAddImage;
