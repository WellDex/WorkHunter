import React, {useState} from 'react';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Container,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {Link} from 'react-router-dom';
import * as appSelectors from '../../Redux/app/appSelectors';
import {connect} from 'react-redux';
import {LOGIN_PATH, PROFILE_PATH, SETTING_PATH} from '../../route/const';
import {logOut} from '../../Redux/app/appOperations';
import {getImgUrl} from '../../utils/getImgUrl';

interface IHeader {
  isAuth: boolean;
  isAdmin: boolean;
  firstName: string | null;
  logOut: () => void;
  userId: string;
  avatar: string | null;
}

const Header = ({
  isAuth,
  firstName,
  userId,
  logOut,
  avatar,
  isAdmin,
}: IHeader) => {
  const [anchorEl, setAnchorEl] = useState(null);

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
          <Link
            to={
              isAuth
                ? isAdmin
                  ? '/users'
                  : `${PROFILE_PATH}/${userId}`
                : LOGIN_PATH
            }
            className="header-logo">
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
  isAdmin: appSelectors.getIsAdmin(state),
});

const mapDispatchToProps = {
  logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
