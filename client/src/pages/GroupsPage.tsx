import React from 'react';
import {Route, Switch} from 'react-router-dom';
import GroupProfile from '../components/groups/GroupProfile';
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
      </Switch>
    </div>
  );
};

export default FrameHoc(GroupsPage);
