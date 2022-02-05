import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import React from 'react';

const itemData = [
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
  {
    img: 'https://picsum.photos/600',
    name: 'WellDex',
    lastMessege: 'Hello WellDex!',
  },
];

const UsersList = () => {
  return (
    <List className="messenger-usersList customScroll">
      {itemData.map((el: any) => (
        <ListItemButton>
          <ListItemAvatar>
            <Avatar src={el.img} className="messenger-usersList-avatar" />
          </ListItemAvatar>
          <ListItemText primary={el.name} secondary={el.lastMessege} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default UsersList;
