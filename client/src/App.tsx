import React from 'react';
import {Route, Switch, useHistory} from 'react-router';
import Navigation from './components/common/Navigation';
import Header from './components/common/Header';
import {Box, Container} from '@mui/material';
import * as appSelectors from './Redux/app/appSelectors';
import {connect} from 'react-redux';
import {routes, IRoute} from './route/routes';

const mapStateToProps = (state: any) => ({
  isAuth: appSelectors.getIsAuth(state),
});

const App = ({isAuth}: any) => {
  const history = useHistory();

  if (isAuth) {
    history.push('/login');
  }
  return (
    <Box className="main-box">
      <Header />
      <Container maxWidth="xl" className="main-container">
        {isAuth && <Navigation />}
        <div className="content customScroll">
          <Switch>
            {routes.map((route: IRoute, index) => (
              <Route
                key={index}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </div>
      </Container>
    </Box>
  );
};

export default connect(mapStateToProps)(App);
