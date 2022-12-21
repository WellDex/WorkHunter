import {Avatar} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {groupsAPI} from '../../../api/groupsAPI';
import FrameHoc from '../../../hoc/FrameHoc';

interface IGroupSubscribers {
  groupId: string;
  subscribers: {id: string}[];
  setOpenModal: () => void;
  setLoading: (b: boolean) => void;
  setMessage: (a: any) => void;
}

const GroupSubscribers = ({
  groupId,
  subscribers,
  setOpenModal,
  setLoading,
  setMessage,
}: IGroupSubscribers) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (groupId) {
      setLoading(true);
      groupsAPI
        .getSubscribers(groupId, {top: 6})
        .then((res) => {
          setUsers(res);
        })
        .catch((e: any) => {
          setMessage({message: e.response.data.message, type: 'error'});
        })
        .finally(() => setLoading(false));
    }
  }, [groupId]);

  return (
    <div className="card-container">
      <a type="button" onClick={setOpenModal}>
        Підписники
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
