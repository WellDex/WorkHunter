import {Avatar} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {groupsAPI} from '../../../api/groupsAPI';
import FrameHoc from '../../../hoc/FrameHoc';

interface IGroupSubscribers {
  groupId: string;
  subscribers: {id: string}[];
  setOpenModal: () => void;
}

const GroupSubscribers = ({
  groupId,
  subscribers,
  setOpenModal,
}: IGroupSubscribers) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (groupId) {
      groupsAPI.getSubscribers(groupId, {top: 6}).then((res) => {
        setUsers(res);
      });
    }
  }, [groupId]);

  return (
    <div className="card-container">
      <a type="button" onClick={setOpenModal}>
        Подписчики
        <span className="groupProfile-gallery-title-count">
          {(subscribers && subscribers.length) ?? 0}
        </span>
      </a>
      <div className="groupProfile-friends-list">
        {users.length > 0 &&
          users.map((user: any, index: number) => (
            <NavLink
              key={index}
              to={`/profile/${user.id}`}
              className="groupProfile-friends-list-item">
              <Avatar className="groupProfile-friends-avatar" />
              <p>{`${user.firstName} ${user.lastName}`}</p>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default FrameHoc(GroupSubscribers);
