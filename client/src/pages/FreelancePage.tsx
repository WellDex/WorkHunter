import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Control from '../components/freelance/Control';
import Employee from '../components/freelance/Employee';
import Employer from '../components/freelance/Employer';
import FrameHoc from '../hoc/FrameHoc';

const FreelancePage = () => {
  return (
    <div className="freelance">
      <Control />
      <Switch>
        <Route path={'/freelance/employee'} component={Employee} />
        <Route path={'/freelance/employer'} component={Employer} />
        <Redirect to={'/freelance/employee'} />
      </Switch>
    </div>
  );
};

export default FrameHoc(FreelancePage);
