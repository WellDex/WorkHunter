import {
  Divider,
  Fab,
  InputBase,
  styled,
  Tab,
  Tabs,
  Tooltip,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ModalCreateGroup from './ModalCreateGroup';

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
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname.includes('list')) {
      setValue(0);
    }
  }, [history.location.pathname]);

  return (
    <>
      <Tabs
        value={value}
        onChange={(event, value) => setValue(value)}
        variant="fullWidth">
        <Tab
          className="users-control"
          label="Сообщества"
          onClick={() => history.push('list')}
        />
        <Tab
          className="users-control"
          label="Поиск сообщества"
          onClick={() => history.push('all')}
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
        title="Создать групу"
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
