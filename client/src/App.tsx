import React, {useEffect, useState} from 'react';
import {Route, Switch, useHistory} from 'react-router';
import Navigation from './components/common/Navigation';
import Notification from './utils/Notification';
import Header from './components/common/Header';
import {Box, Container} from '@mui/material';
import * as appSelectors from './Redux/app/appSelectors';
import {connect} from 'react-redux';
import {routes, IRoute, authRoutes} from './route/routes';
import {FRIENDS_PATH, PROFILE_PATH} from './route/const';

const mapStateToProps = (state: any) => ({
  isAuth: appSelectors.getIsAuth(state),
  notification: appSelectors.getNotification(state),
});

const App = ({isAuth, notification}: any) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (notification.message && notification.type) {
      setOpen(true);
    }
  }, [notification]);

  useEffect(() => {
    if (!isAuth) {
      history.push('/login');
    }
  }, [isAuth]);

  return (
    <Box className="main-box">
      <Header />
      <Container maxWidth="xl" className="main-container">
        {isAuth && <Navigation />}
        <div className="content customScroll">
          <Switch>
            {isAuth
              ? routes.map((route: IRoute, index) =>
                  route.path === PROFILE_PATH ? (
                    <Route
                      key={index}
                      path={`${route.path}/:id`}
                      component={route.component}
                    />
                  ) : route.path === FRIENDS_PATH ? (
                    <Route
                      key={index}
                      path={`${route.path}/:id`}
                      component={route.component}
                    />
                  ) : (
                    <Route
                      key={index}
                      path={route.path}
                      component={route.component}
                    />
                  )
                )
              : authRoutes.map((route: IRoute, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    component={route.component}
                  />
                ))}
          </Switch>
        </div>
      </Container>
      <Notification
        open={open}
        handleClose={handleClose}
        message={notification.message}
        type={notification.type}
      />
    </Box>
  );
};

export default connect(mapStateToProps)(App);
