import {Divider} from '@mui/material';
import React from 'react';
import {Route, Switch} from 'react-router-dom';
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
      </Switch>
    </div>
  );
};

export default FrameHoc(FreelancePage);
