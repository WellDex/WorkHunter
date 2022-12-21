import {Button, Dialog, Divider, IconButton} from '@mui/material';
import React, {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {galleryAPI} from '../../api/galleryAPI';

interface IModalGallery {
  id: string;
  open: boolean;
  handleClose: () => void;
  getGallery: () => void;
  setLoading: (b: boolean) => void;
  setMessage: (a: any) => void;
}

const ModalAddImage = ({
  id,
  open,
  handleClose,
  getGallery,
  setLoading,
  setMessage,
}: IModalGallery) => {
  const [files, setFiles] = useState<any[]>([]);

  const handleDelete = (name: string) => {
    setFiles(files.filter((f) => f.name !== name));
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('id', id);
    files.forEach((file) => formData.append('img', file));

    setLoading(true);
    galleryAPI
      .addImages(formData)
      .then((res) => {
        setMessage({message: res.message, type: 'success'});

        setFiles([]);
        getGallery();
        handleClose();
      })
      .catch((e: any) => {
        setMessage({message: e.response.data.message, type: 'error'});
      })
      .finally(() => setLoading(false));
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
            Завантажити фотографію
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
            закрити
          </Button>
          <Button onClick={onSubmit} variant="contained">
            завантажити
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalAddImage;
