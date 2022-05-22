import {
  Avatar,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {usersAPI} from '../../api/usersAPI';
import {IUser} from '../../Redux/users/usersReducer';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

interface IUserProps {
  user: IUser;
  friends: string[];
  getProfile: () => void;
}

const UserItem = ({user, friends, getProfile}: IUserProps) => {
  const [isFollow, setIsFollow] = useState(friends.includes(user.id));

  useEffect(() => {
    setIsFollow(friends.includes(user.id));
  }, [friends]);

  const handleClick = async (id: any) => {
    isFollow
      ? await usersAPI.unfollow(id).then((res) => {
          getProfile();
        })
      : await usersAPI.follow(id).then((res) => {
          getProfile();
        });
  };

  return (
    <ImageListItem key={user.id} className="people-list-item">
      {user.img ? (
        <img
          src={user.img}
          srcSet={user.img}
          alt={`${user.firstName} ${user.lastName}`}
          loading="lazy"
        />
      ) : (
        <Avatar variant="rounded" sx={{width: 250, height: 250}} />
      )}
      <ImageListItemBar
        className="people-list-bar"
        position="below"
        actionPosition="right"
        title={`${user.firstName} ${user.lastName}`}
        actionIcon={
          <IconButton onClick={() => handleClick(user.id)}>
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

export default UserItem;
