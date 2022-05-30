import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import GroupsAll from '../components/groups/GroupsAll';
import GroupsControl from '../components/groups/GroupsControl';
import FrameHoc from '../hoc/FrameHoc';
import * as groupsSelectors from '../Redux/groups/groupsSelectors';
import * as appSelectors from '../Redux/app/appSelectors';
import {getGroups} from '../Redux/groups/groupsOperations';
import {IGroup} from '../Redux/groups/groupsReducer';

interface IGroupsProps {
  groups: IGroup[];
  getGroups: () => void;
  userId: string;
}

const GroupsContainer = ({groups, getGroups, userId}: IGroupsProps) => {
  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className="groups">
      <GroupsControl />
      <GroupsAll groups={groups} userId={userId} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  groups: groupsSelectors.getGroups(state),
  userId: appSelectors.getUserId(state),
});

const mapDispatchToProps = {
  getGroups,
};

const GroupsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsContainer);

export default FrameHoc(GroupsPage);
