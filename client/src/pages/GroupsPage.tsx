import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import GroupsAll from '../components/groups/GroupsAll';
import GroupsControl from '../components/groups/GroupsControl';
import GroupsList from '../components/groups/GroupsList';
import FrameHoc from '../hoc/FrameHoc';

const GroupsPage = () => {
  return (
    <div className="groups">
      <GroupsControl />
      <Switch>
        <Route path={'/groups/list'} component={GroupsList} />
        <Route path={'/groups/all'} component={GroupsAll} />
        <Redirect to={'/groups/list'} />
      </Switch>
    </div>
  );
};

export default FrameHoc(GroupsPage);
