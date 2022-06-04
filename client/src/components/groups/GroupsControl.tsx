import {
  Divider,
  Fab,
  InputBase,
  styled,
  Tab,
  Tabs,
  Tooltip,
} from '@mui/material';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ModalCreateGroup from './ModalCreateGroup';
import {GROUPS_PATH, MY_GROUPS_PATH} from '../../route/const';

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  color: '#7a7a7a',
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const GroupsControl = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(
    history.location.pathname.includes(MY_GROUPS_PATH) ? 0 : 1
  );

  return (
    <>
      <Tabs
        value={value}
        onChange={(event, value) => setValue(value)}
        variant="fullWidth">
        <Tab
          className="users-control"
          label="Мои сообщества"
          onClick={() => history.push(MY_GROUPS_PATH)} //todo
        />
        <Tab
          className="users-control"
          label="Сообщества"
          onClick={() => history.push(GROUPS_PATH)}
        />
      </Tabs>
      <Divider />
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{'aria-label': 'search'}}
        />
      </Search>
      <Divider />
      <Tooltip
        title="Создать сообщество"
        style={{position: 'absolute', bottom: '3rem', right: '3rem'}}
        placement="top">
        <Fab color="primary" size="large" onClick={() => setIsOpen(true)}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <ModalCreateGroup open={isOpen} handleClose={() => setIsOpen(false)} />
    </>
  );
};

export default GroupsControl;
