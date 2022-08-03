import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import GroupsControl from '../components/groups/GroupsControl';
import GroupsList from '../components/groups/GroupsList';
import FrameHoc from '../hoc/FrameHoc';
import * as groupsSelectors from '../Redux/groups/groupsSelectors';
import {IGroup} from '../Redux/groups/groupsReducer';
import {getMyGroups} from '../Redux/groups/groupsOperations';
import {useParams} from 'react-router-dom';

interface IMyGroupsProps {
  groups: IGroup[];
  getMyGroups: (id: string) => void;
}

const GroupsContainer = ({groups, getMyGroups}: IMyGroupsProps) => {
  const params: any = useParams();
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    getMyGroups(params.id);
  }, [params.id]);

  return (
    <div className="groups">
      <GroupsControl
        groups={groups}
        setSearchValue={setSearchValue}
        userId={params.id}
      />
      <GroupsList
        groups={groups.filter((group) =>
          searchValue === ''
            ? group
            : group.title.toLowerCase().includes(searchValue.toLowerCase())
        )}
      />
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
