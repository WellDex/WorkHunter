import React from 'react';
import {NavLink} from 'react-router-dom';
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
        <NavLink className="navigation-item" to={'/profile'}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Моя страница</ListItemText>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink className="navigation-item" to={'/news'}>
          <ListItemIcon>
            <NewspaperIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Новости</ListItemText>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink className="navigation-item" to={'/messenger'}>
          <ListItemIcon>
            <ChatIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Мессенджер</ListItemText>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink className="navigation-item" to={'/users/friends'}>
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Друзья</ListItemText>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink className="navigation-item" to={'/profile'}>
          <ListItemIcon>
            <ForumIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Сообщества</ListItemText>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink className="navigation-item" to={'/gallery'}>
          <ListItemIcon>
            <CollectionsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Фотографии</ListItemText>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink className="navigation-item" to={'/projects'}>
          <ListItemIcon>
            <WebIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Портфолио</ListItemText>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink className="navigation-item" to={'/profile'}>
          <ListItemIcon>
            <WorkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Вакансии</ListItemText>
        </NavLink>
      </MenuItem>
    </MenuList>
  );
};

export default Navigation;
