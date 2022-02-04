import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import React from 'react';

const itemData = [
  {img: 'https://picsum.photos/600', name: 'WellDex'},
  {img: 'https://picsum.photos/600', name: 'WellDex'},
  {img: 'https://picsum.photos/600', name: 'WellDex'},
  {img: 'https://picsum.photos/600', name: 'WellDex'},
  {img: 'https://picsum.photos/600', name: 'WellDex'},
  {img: 'https://picsum.photos/600', name: 'WellDex'},
  {img: 'https://picsum.photos/600', name: 'WellDex'},
  {img: 'https://picsum.photos/600', name: 'WellDex'},
  {img: 'https://picsum.photos/600', name: 'WellDex'},
  {img: 'https://picsum.photos/600', name: 'WellDex'},
  {img: 'https://picsum.photos/600', name: 'WellDex'},
  {img: 'https://picsum.photos/600', name: 'WellDex'},
  {img: 'https://picsum.photos/600', name: 'WellDex'},
  {img: 'https://picsum.photos/600', name: 'WellDex'},
  {img: 'https://picsum.photos/600', name: 'WellDex'},
  {img: 'https://picsum.photos/600', name: 'WellDex'},
];

const UsersList = () => {
  return (
    <div className="card-container">
      <ImageList cols={4} gap={16}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} className="people-list-item">
            <img
              src={item.img}
              srcSet={item.img}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              position="below"
              actionPosition="right"
              title={item.name}
              actionIcon={
                <IconButton>
                  <PersonAddIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default UsersList;
