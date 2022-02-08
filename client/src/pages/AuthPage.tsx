import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegistrationForm from '../components/auth/RegistrationForm';
import FrameHoc from '../hoc/FrameHoc';

export const Auth = () => {
  return (
    <div className="card-container">
      <Switch>
        <Route path={'/auth/login'} component={LoginForm} />
        <Route path={'/auth/registration'} component={RegistrationForm} />
      </Switch>
    </div>
  );
};

const AuthContainer = FrameHoc(Auth);

const AuthPage = () => {
  return (
    <div className="auth">
      <AuthContainer />
    </div>
  );
};

export default AuthPage;