import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Employee from '../components/freelance/Employee';
import Employer from '../components/freelance/Employer';
import FrameHoc from '../hoc/FrameHoc';

const FreelancePage = () => {
  return (
    <div className="freelance">
      <Switch>
        <Route exact path={'/freelance/employer'} component={Employer} />
        <Route path={'/freelance'} component={Employee} />
      </Switch>
    </div>
  );
};

export default FrameHoc(FreelancePage);
