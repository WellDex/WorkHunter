import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import GroupsControl from '../components/groups/GroupsControl';
import GroupsList from '../components/groups/GroupsList';
import FrameHoc from '../hoc/FrameHoc';
import * as groupsSelectors from '../Redux/groups/groupsSelectors';
import {IGroup} from '../Redux/groups/groupsReducer';
import {getMyGroups} from '../Redux/groups/groupsOperations';

interface IMyGroupsProps {
  groups: IGroup[];
  getMyGroups: () => void;
}

const GroupsContainer = ({groups, getMyGroups}: IMyGroupsProps) => {
  useEffect(() => {
    getMyGroups();
  }, []);

  return (
    <div className="groups">
      <GroupsControl />
      <GroupsList groups={groups} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  groups: groupsSelectors.getGroups(state),
});

const mapDispatchToProps = {
  getMyGroups,
};

const MyGroupsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsContainer);

export default FrameHoc(MyGroupsPage);
