import React from 'react';
import {Route, Switch} from 'react-router';
import Navigation from './components/common/Navigation';
import Header from './components/common/Header';
import ProfilePage from './pages/ProfilePage';
import {Box, Container} from '@mui/material';

const App = () => {
  return (
    <Box className="main-box">
      <Header />
      <Container maxWidth="xl" style={{padding: '0 2rem'}}>
        <Navigation />
        <Switch>
          <Route path="/profile" component={ProfilePage} />
        </Switch>
      </Container>
    </Box>
  );
};

export default App;
