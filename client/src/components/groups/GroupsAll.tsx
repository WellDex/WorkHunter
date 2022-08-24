import {ImageList} from '@mui/material';
import React from 'react';
import {IGroup} from '../../Redux/groups/groupsReducer';
import {IStateProfile} from '../../Redux/profile/profileReducer';
import GroupItem from './GroupItem';

interface IGroupsAll {
  groups: IGroup[];
  userId: string;
  setLoading: (b: boolean) => void;
  setMessage: (a: any) => void;
}

const GroupsAll = ({groups, userId, setLoading, setMessage}: IGroupsAll) => {
  return (
    <div className="card-container">
      <ImageList cols={4} gap={16}>
        {groups.length > 0 &&
          groups.map((group, index) => (
            <GroupItem
              setMessage={setMessage}
              key={index}
              group={group}
              userId={userId}
              setLoading={setLoading}
            />
          ))}
      </ImageList>
    </div>
  );
};

export default GroupsAll;
