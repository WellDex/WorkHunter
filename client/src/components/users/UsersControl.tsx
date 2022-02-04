import {Button, Divider, InputBase, styled} from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

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

const UsersControl = () => {
  return (
    <>
      <div className="card-container users-control">
        <Link to={'friends'}>
          <Button variant="outlined">Друзья</Button>
        </Link>
        <Link to={'people'}>
          <Button variant="outlined">Поиск Друзей</Button>
        </Link>
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
    </>
  );
};

export default UsersControl;
