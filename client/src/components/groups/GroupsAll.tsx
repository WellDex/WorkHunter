import {ImageList} from '@mui/material';
import React from 'react';
import {IGroup} from '../../Redux/groups/groupsReducer';
import {IStateProfile} from '../../Redux/profile/profileReducer';
import GroupItem from './GroupItem';

interface IGroupsAll {
  groups: IGroup[];
  userId: string;
}

const GroupsAll = ({groups, userId}: IGroupsAll) => {
  return (
    <div className="card-container">
      <ImageList cols={4} gap={16}>
        {groups.length > 0 &&
          groups.map((group, index) => (
            <GroupItem key={index} group={group} userId={userId} />
          ))}
      </ImageList>
    </div>
  );
};

export default GroupsAll;
