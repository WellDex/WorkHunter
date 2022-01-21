import React from 'react';
import {Route, Switch} from 'react-router';
import Navigation from './components/common/Navigation';
import Header from './components/common/Header';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <>
      <Header />
      <Navigation />
      <Switch>
        <Route path="/profile" component={ProfilePage} />
      </Switch>
    </>
  );
};

export default App;
