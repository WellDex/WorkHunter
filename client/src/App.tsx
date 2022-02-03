import React from 'react';
import {Route, Switch} from 'react-router';
import Navigation from './components/common/Navigation';
import Header from './components/common/Header';
import ProfilePage from './pages/ProfilePage';
import {Box, Container} from '@mui/material';
import NewsPage from './pages/NewsPage';

const App = () => {
  return (
    <Box className="main-box">
      <Header />
      <Container maxWidth="xl" className="main-container">
        <Navigation />
        <div className="content customScroll">
          <Switch>
            <Route path="/profile" component={ProfilePage} />
            <Route path="/news" component={NewsPage} />
          </Switch>
        </div>
      </Container>
    </Box>
  );
};

export default App;
