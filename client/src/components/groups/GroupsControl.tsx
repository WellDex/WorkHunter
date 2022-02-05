import {Button, Divider, Fab, InputBase, styled} from '@mui/material';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
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

  return (
    <>
      <div className="card-container users-control">
        <Link to={'list'}>
          <Button variant="outlined">Сообщества</Button>
        </Link>
        <Link to={'all'}>
          <Button variant="outlined">Поиск сообщества</Button>
        </Link>
        <Fab color="primary" size="small" onClick={() => setIsOpen(true)}>
          <AddIcon />
        </Fab>
      </div>
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
      <ModalCreateGroup open={isOpen} handleClose={() => setIsOpen(false)} />
    </>
  );
};

export default GroupsControl;
