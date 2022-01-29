import React from 'react';
import {Link} from 'react-router-dom';
import {ListItemIcon, ListItemText, MenuItem, MenuList} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import ForumIcon from '@mui/icons-material/Forum';
import CollectionsIcon from '@mui/icons-material/Collections';
import WebIcon from '@mui/icons-material/Web';
import WorkIcon from '@mui/icons-material/Work';

const Navigation = () => {
  return (
    <MenuList className="navigation">
      <MenuItem>
        <ListItemIcon>
          <AccountCircleIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Link to={'/profile'}>Моя страница</Link>
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <NewspaperIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Link to={'/profile'}>Новости</Link>
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <ChatIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Link to={'/profile'}>Мессенджер</Link>
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <GroupIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Link to={'/profile'}>Друзья</Link>
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <ForumIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Link to={'/profile'}>Сообщества</Link>
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <CollectionsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Link to={'/profile'}>Фотографии</Link>
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <WebIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Link to={'/profile'}>Портфолио</Link>
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <WorkIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Link to={'/profile'}>Вакансии</Link>
        </ListItemText>
      </MenuItem>
    </MenuList>
  );
};

export default Navigation;
