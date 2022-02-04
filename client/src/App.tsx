import React from 'react';
import {Route, Switch} from 'react-router';
import Navigation from './components/common/Navigation';
import Header from './components/common/Header';
import ProfilePage from './pages/ProfilePage';
import {Box, Container} from '@mui/material';
import NewsPage from './pages/NewsPage';
import UsersPage from './pages/UsersPage';
import {Redirect} from 'react-router-dom';
import GalleryPage from './pages/GalleryPage';
import ProjectsPage from './pages/ProjectsPage';

const App = () => {
  return (
    <Box className="main-box">
      <Header />
      <Container maxWidth="xl" className="main-container">
        <Navigation />
        <div className="content customScroll">
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Redirect to={'/profile'} />}
            />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/news" component={NewsPage} />
            <Route path="/users" component={UsersPage} />
            <Route path="/gallery" component={GalleryPage} />
            <Route path="/projects" component={ProjectsPage} />
          </Switch>
        </div>
      </Container>
    </Box>
  );
};

export default App;
