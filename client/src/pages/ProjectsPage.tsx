import {
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
} from '@mui/material';
import React, {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import FrameHoc from '../hoc/FrameHoc';
import ModalAddProject from '../components/freelance/ModalCreateProject';

const itemData = [
  {img: 'https://picsum.photos/600', title: 'WebHunter'},
  {img: 'https://picsum.photos/600', title: 'WebHunter'},
  {img: 'https://picsum.photos/600', title: 'WebHunter'},
  {img: 'https://picsum.photos/600', title: 'WebHunter'},
  {img: 'https://picsum.photos/600', title: 'WebHunter'},
  {img: 'https://picsum.photos/600', title: 'WebHunter'},
  {img: 'https://picsum.photos/600', title: 'WebHunter'},
  {img: 'https://picsum.photos/600', title: 'WebHunter'},
  {img: 'https://picsum.photos/600', title: 'WebHunter'},
  {img: 'https://picsum.photos/600', title: 'WebHunter'},
  {img: 'https://picsum.photos/600', title: 'WebHunter'},
  {img: 'https://picsum.photos/600', title: 'WebHunter'},
];

const ProjectsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card-container">
      <div className="projects-head">
        <h1 className="projects-head-title">Портфолио</h1>
        <Tooltip title="Добавить проект" placement="left">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => setIsOpen(true)}>
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
      <ImageList cols={3} gap={16}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} className="projects-list-item">
            <a href="/profile">
              <img
                src={item.img}
                srcSet={item.img}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                className="projects-list-bar"
                position="below"
                actionPosition="right"
                title={item.title}
              />
            </a>
          </ImageListItem>
        ))}
      </ImageList>
      <ModalAddProject open={isOpen} handleClose={() => setIsOpen(false)} />
    </div>
  );
};

export default FrameHoc(ProjectsPage);
