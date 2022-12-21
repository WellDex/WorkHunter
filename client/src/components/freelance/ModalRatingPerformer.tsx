import {Button, Dialog, Divider, Rating} from '@mui/material';
import React, {useState} from 'react';

interface IModalRatingPerformer {
  open: boolean;
  handleClose: () => void;
  closeProject: (rating: number | null) => void;
}

const ModalRatingPerformer = ({
  open,
  handleClose,
  closeProject,
}: IModalRatingPerformer) => {
  const [rating, setRating] = useState<number | null>(null);

  return (
    <Dialog open={open}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          margin: '1rem',
        }}>
        <h1 className="projects-form-title">Оцініть виконавця</h1>
        <Divider />
        <Rating
          style={{margin: '0 auto'}}
          value={rating}
          precision={0.5}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <Divider />
        <div className="projects-form-btns">
          <Button variant="contained" onClick={handleClose}>
            скасувати
          </Button>
          <Button variant="contained" onClick={() => closeProject(rating)}>
            оцінити
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalRatingPerformer;
