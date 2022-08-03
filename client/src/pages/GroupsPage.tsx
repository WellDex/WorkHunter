import React, {useEffect, useState} from 'react';
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
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className="groups">
      <GroupsControl
        groups={groups}
        setSearchValue={setSearchValue}
        userId={userId}
      />
      <GroupsAll
        groups={groups.filter((group) =>
          searchValue === ''
            ? group
            : group.title.toLowerCase().includes(searchValue.toLowerCase())
        )}
        userId={userId}
      />
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
