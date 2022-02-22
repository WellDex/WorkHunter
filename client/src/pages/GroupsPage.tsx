import React from 'react';
import GroupsAll from '../components/groups/GroupsAll';
import GroupsControl from '../components/groups/GroupsControl';
import FrameHoc from '../hoc/FrameHoc';

const GroupsPage = () => {
  return (
    <div className="groups">
      <GroupsControl />
      <GroupsAll />
    </div>
  );
};

export default FrameHoc(GroupsPage);
