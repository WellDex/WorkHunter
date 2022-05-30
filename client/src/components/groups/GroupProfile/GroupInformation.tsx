import React from 'react';
import FrameHoc from '../../../hoc/FrameHoc';
import {IGroup} from '../../../Redux/groups/groupsReducer';

interface IGroupInformation {
  group: IGroup;
}

const GroupInformation = ({group}: IGroupInformation) => {
  return (
    <div className="card-container">
      <div className="title">
        <h2>{group.title}</h2>
        <p>{group.description}</p>
      </div>
    </div>
  );
};

export default FrameHoc(GroupInformation);
