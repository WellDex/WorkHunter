import React, {useEffect, useState} from 'react';
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
import * as appSelectors from '../../Redux/app/appSelectors';
import {IRoute, routes} from '../../route/routes';
import {
  FRIENDS_PATH,
  FREELANCE_PATH,
  GALLERY_PATH,
  MESSENGER_PATH,
  NEWS_PATH,
  PORTFOLIO_PATH,
  PROFILE_PATH,
  MY_GROUPS_PATH,
} from '../../route/const';
import {connect} from 'react-redux';

const menuIcons = (icon: string) => {
  switch (icon) {
    case PROFILE_PATH:
      return <AccountCircleIcon fontSize="small" />;
    case NEWS_PATH:
      return <NewspaperIcon fontSize="small" />;
    case MESSENGER_PATH:
      return <ChatIcon fontSize="small" />;
    case FRIENDS_PATH:
      return <GroupIcon fontSize="small" />;
    case MY_GROUPS_PATH:
      return <ForumIcon fontSize="small" />;
    case GALLERY_PATH:
      return <CollectionsIcon fontSize="small" />;
    case PORTFOLIO_PATH:
      return <WebIcon fontSize="small" />;
    case FREELANCE_PATH:
      return <WorkIcon fontSize="small" />;
  }
};

interface INavProps {
  userId: string | null;
}

const NavigationContainer = ({userId}: INavProps) => {
  const [navList, setNavList] = useState<IRoute[] | any[]>([]);
  useEffect(() => {
    setNavList(
      routes
        .map((r: IRoute) => {
          if (!!r.name) {
            return {
              path: r.path,
              name: r.name,
              icon: menuIcons(r.path),
              isNeedIdParam: r.isNeedIdParam,
            };
          }
        })
        .filter((el) => !!el) || []
    );
  }, [routes]);

  return (
    <div className="navigation-container">
      <MenuList className="navigation">
        {navList.length > 0 &&
          navList.map((nav, index) => (
            <MenuItem key={index}>
              <NavLink
                className="navigation-item"
                activeClassName="navigation-item-active"
                to={nav.isNeedIdParam ? `${nav.path}/${userId}` : nav.path}>
                <ListItemIcon>{nav?.icon}</ListItemIcon>
                <ListItemText>{nav?.name}</ListItemText>
              </NavLink>
            </MenuItem>
          ))}
      </MenuList>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userId: appSelectors.getUserId(state),
});

const Navigation = connect(mapStateToProps, {})(NavigationContainer);

export default Navigation;
