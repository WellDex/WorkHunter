import React, {useEffect, useState} from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Container,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Switch,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import PublicIcon from '@mui/icons-material/Public';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {Link, useHistory} from 'react-router-dom';
import * as appSelectors from '../../Redux/app/appSelectors';
import {connect} from 'react-redux';
import {PROFILE_PATH, SETTING_PATH} from '../../route/const';
import {logOut} from '../../Redux/app/appOperations';
import {getImgUrl} from '../../utils/getImgUrl';

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  color: '#7a7a7a',
  backgroundColor: '#e9e9e9',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
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

interface IHeader {
  isAuth: boolean;
  firstName: string | null;
  logOut: () => void;
  userId: string;
  avatar: string | null;
}

const Header = ({isAuth, firstName, userId, logOut, avatar}: IHeader) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isActiveSwitch, setIsActiveSwitch] = useState(false);
  const [isFreelancePage, setIsFreelancePage] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isActiveSwitch) {
      return history.push('/freelance/employer');
    }
    if (history.location.pathname.includes('freelance')) {
      history.push('/freelance/projects');
    }
  }, [isActiveSwitch]);

  useEffect(() => {
    if (history.location.pathname.includes('freelance')) {
      return setIsFreelancePage(true);
    }
    setIsFreelancePage(false);
  }, [history.location.pathname]);

  const isOpen = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="header">
      <Container maxWidth="xl">
        <Toolbar>
          <Link to={`${PROFILE_PATH}/${userId}`} className="header-logo">
            <PublicIcon className="header-logo--icon" />
            <span className="header-logo--first">Work</span>
            <span className="header-logo--second">Hunter</span>
          </Link>
          {isAuth && (
            <>
              <Box sx={{flexGrow: 1}} />
              <div className="header-avatar">
                <div className="header-avatar--name">{firstName}</div>
                {avatar ? <Avatar src={getImgUrl(avatar)} /> : <Avatar />}
                <IconButton
                  aria-label="ArrowDropDown"
                  size="small"
                  onClick={handleClick}>
                  {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={isOpen}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{horizontal: 'right', vertical: 'top'}}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
                  <MenuItem className="header-menu-item">
                    <Link to={`${PROFILE_PATH}/${userId}`}>
                      {avatar ? <Avatar src={getImgUrl(avatar)} /> : <Avatar />}{' '}
                      Profile
                    </Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem className="header-menu-item">
                    <Link to={SETTING_PATH}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={logOut}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = (state: any) => ({
  isAuth: appSelectors.getIsAuth(state),
  firstName: appSelectors.getFirstName(state),
  avatar: appSelectors.getAvatar(state),
  userId: appSelectors.getUserId(state),
});

const mapDispatchToProps = {
  logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
