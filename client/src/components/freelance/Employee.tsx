import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Control from './Control';
import ProjectsList from './ProjectsList';

const createData = (
  title: string,
  budget: number,
  rates: number,
  date: string
) => {
  return {title, budget, rates, date};
};

const rows = [
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
];

const Employee = () => {
  return (
    <>
      <Control />
      <div className="card-container">
        <Switch>
          <Route
            path={'/freelance/projects'}
            component={() => <ProjectsList rows={rows} />}
          />
          <Route
            path={'/freelance/my_projects'}
            component={() => <ProjectsList rows={rows} />}
          />
          <Redirect to={'/freelance/projects'} />
        </Switch>
      </div>
    </>
  );
};

export default Employee;
