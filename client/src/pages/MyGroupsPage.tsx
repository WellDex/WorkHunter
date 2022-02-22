import React from 'react';
import GroupsControl from '../components/groups/GroupsControl';
import GroupsList from '../components/groups/GroupsList';
import FrameHoc from '../hoc/FrameHoc';

const MyGroupsPage = () => {
  return (
    <div className="groups">
      <GroupsControl />
      <GroupsList />
    </div>
  );
};

export default FrameHoc(MyGroupsPage);
