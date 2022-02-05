import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
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

const GroupsAll = () => {
  return (
    <div className="card-container">
      <ImageList cols={4} gap={16}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} className="groups-all-list-item">
            <img
              src={item.img}
              srcSet={item.img}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              className="groups-all-list-bar"
              position="below"
              actionPosition="right"
              title={item.name}
              actionIcon={
                <IconButton>
                  <GroupAddIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default GroupsAll;
