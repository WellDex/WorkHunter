import {Avatar} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {groupsAPI} from '../../api/groupsAPI';
import FrameHoc from '../../hoc/FrameHoc';
import {GROUP_PATH, MY_GROUPS_PATH} from '../../route/const';
import {getImgUrl} from '../../utils/getImgUrl';

const options = {
  top: 6,
  count: true,
};

interface IGroupsProps {
  id: string;
  countGroups: number;
}

const ProfileGroups = ({id, countGroups}: IGroupsProps) => {
  const [groups, setGroups] = useState<any[]>([]);
  useEffect(() => {
    groupsAPI.getMyGroups(id, options).then((res) => setGroups(res));
  }, [id]);

  return (
    <div className="card-container">
      <NavLink to={`${MY_GROUPS_PATH}/${id}`}>
        Сообщества
        <span className="profile-gallery-title-count">{countGroups}</span>
      </NavLink>
      <div className="profile-groups-list">
        {groups.length > 0 &&
          groups.map((group) => (
            <NavLink
              key={group._id}
              to={`${GROUP_PATH}/${group._id}`}
              className="profile-groups-list-item">
              {group.avatar ? (
                <Avatar
                  className="profile-groups-avatar"
                  src={getImgUrl(group.avatar)}
                />
              ) : (
                <Avatar className="profile-groups-avatar" />
              )}
              <p>{group.title}</p>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default FrameHoc(ProfileGroups);
