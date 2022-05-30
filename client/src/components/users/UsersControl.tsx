import {Divider, InputBase, styled, Tab, Tabs} from '@mui/material';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import {FRIENDS_PATH, USERS_PATH} from '../../route/const';
import * as appSelectors from '../../Redux/app/appSelectors';
import {connect} from 'react-redux';

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

const UsersControlContainer = ({userId}: any) => {
  const history = useHistory();
  const [value, setValue] = useState(
    history.location.pathname.includes(FRIENDS_PATH) ? 0 : 1
  );

  return (
    <>
      <Tabs
        value={value}
        onChange={(event, value) => setValue(value)}
        variant="fullWidth">
        <Tab
          className="users-control"
          label="Друзья"
          onClick={() => history.push(`${FRIENDS_PATH}/${userId}`)}
        />
        <Tab
          className="users-control"
          label="Поиск Друзей"
          onClick={() => history.push(USERS_PATH)}
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
    </>
  );
};

const mapStateToProps = (state: any) => ({
  userId: appSelectors.getUserId(state),
});

const UsersControl = connect(mapStateToProps, {})(UsersControlContainer);

export default UsersControl;
