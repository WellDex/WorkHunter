import {
  Avatar,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {useHistory} from 'react-router-dom';
import {groupsAPI} from '../../api/groupsAPI';
import {IGroup} from '../../Redux/groups/groupsReducer';
import {IStateProfile} from '../../Redux/profile/profileReducer';

interface IGroupItemProps {
  group: IGroup;
  userId: string;
}
//todo
const GroupItem = ({group, userId}: IGroupItemProps) => {
  const history = useHistory();
  const [isFollow, setIsFollow] = useState(group.subscribers.includes(userId));

  useEffect(() => {
    setIsFollow(group.subscribers.includes(userId));
  }, [group.subscribers]);

  const handleClick = async (id: string) => {
    isFollow
      ? await groupsAPI.unfollow(id).then((res) => {
          setIsFollow(!isFollow);
        })
      : await groupsAPI.follow(id).then((res) => {
          setIsFollow(!isFollow);
        });
  };

  return (
    <ImageListItem
      key={group._id}
      className="people-list-item"
      onClick={() => history.push(`group/${group._id}`)}>
      {/* {user.img ? (
        <img
          src={user.img}
          srcSet={user.img}
          alt={`${user.firstName} ${user.lastName}`}
          loading="lazy"
        />
      ) : ( */}
      <Avatar variant="rounded" sx={{width: 250, height: 250}} />
      {/* )} */}
      <ImageListItemBar
        className="groups-all-list-bar"
        position="below"
        actionPosition="right"
        title={group.title}
        actionIcon={
          <IconButton
            onClick={(e: any) => {
              e.stopPropagation();
              handleClick(group._id);
            }}>
            {isFollow ? (
              <PersonRemoveIcon sx={{color: '#b2102f'}} />
            ) : (
              <PersonAddIcon sx={{color: '#4caf50'}} />
            )}
          </IconButton>
        }
      />
    </ImageListItem>
  );
};

export default GroupItem;
