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
import {useHistory} from 'react-router-dom';
import {getImgUrl} from '../../utils/getImgUrl';

interface IUserProps {
  user: IUser;
  friends: string[];
  getProfile: () => void;
  setLoading: (b: boolean) => void;
  setMessage: (a: any) => void;
}

const UserItem = ({
  user,
  friends,
  getProfile,
  setLoading,
  setMessage,
}: IUserProps) => {
  const history = useHistory();
  const [isFollow, setIsFollow] = useState(friends.includes(user.id));

  useEffect(() => {
    setIsFollow(friends.includes(user.id));
  }, [friends]);

  const handleClick = async (id: string) => {
    setLoading(true);
    isFollow
      ? await usersAPI
          .unfollow(id)
          .then((res) => {
            getProfile();
          })
          .catch((e: any) => {
            setMessage({message: e.response.data.message, type: 'error'});
          })
          .finally(() => setLoading(false))
      : await usersAPI
          .follow(id)
          .then((res) => {
            getProfile();
          })
          .catch((e: any) => {
            setMessage({message: e.response.data.message, type: 'error'});
          })
          .finally(() => setLoading(false));
  };

  return (
    <ImageListItem
      key={user.id}
      className="people-list-item"
      onClick={() => history.push(`profile/${user.id}`)}>
      {user.avatar ? (
        <Avatar
          variant="rounded"
          sx={{width: 250, height: 250}}
          src={getImgUrl(user.avatar)}
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
          <IconButton
            onClick={(e: any) => {
              e.stopPropagation();
              handleClick(user.id);
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

export default UserItem;
