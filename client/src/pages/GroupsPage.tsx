import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import GroupsAll from '../components/groups/GroupsAll';
import GroupsControl from '../components/groups/GroupsControl';
import FrameHoc from '../hoc/FrameHoc';
import * as groupsSelectors from '../Redux/groups/groupsSelectors';
import * as appSelectors from '../Redux/app/appSelectors';
import {getGroups} from '../Redux/groups/groupsOperations';
import {IGroup} from '../Redux/groups/groupsReducer';
import {setLoading, setMessage} from '../Redux/app/appOperations';

interface IGroupsProps {
  groups: IGroup[];
  getGroups: () => void;
  userId: string;
  setLoading: (b: boolean) => void;
  setMessage: (a: any) => void;
}

const GroupsContainer = ({
  groups,
  getGroups,
  userId,
  setLoading,
  setMessage,
}: IGroupsProps) => {
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className="groups">
      <GroupsControl
        setMessage={setMessage}
        groups={groups}
        setSearchValue={setSearchValue}
        userId={userId}
        setLoading={setLoading}
      />
      <GroupsAll
        setMessage={setMessage}
        groups={groups.filter((group) =>
          searchValue === ''
            ? group
            : group.title.toLowerCase().includes(searchValue.toLowerCase())
        )}
        userId={userId}
        setLoading={setLoading}
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
  setLoading,
  setMessage,
};

const GroupsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsContainer);

export default FrameHoc(GroupsPage);
