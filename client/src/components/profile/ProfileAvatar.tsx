import {Avatar, Button, CardMedia} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {profileAPI} from '../../api/profileAPI';
import {usersAPI} from '../../api/usersAPI';
import FrameHoc from '../../hoc/FrameHoc';

interface ProfileAvatar {
  img: any;
  isOwner: boolean;
  userId: string;
}
//todo
const ProfileAvatar = ({img, isOwner, userId}: any) => {
  const [isFollow, setIsFollow] = useState(false);
  const params: {id: string} = useParams();

  useEffect(() => {
    if (!isOwner) {
      profileAPI.getFriends().then((res) => {
        console.log(res);

        setIsFollow(res.includes(params.id));
      });
    }
  }, [params.id]);

  const follow = () =>
    usersAPI.follow(params.id).then(() => setIsFollow(!isFollow));
  const unfollow = () =>
    usersAPI.unfollow(params.id).then(() => setIsFollow(!isFollow));

  return (
    <div className="card-container">
      {img ? (
        <CardMedia
          className="profile-avatar-img"
          component="img"
          height="140"
          image="https://picsum.photos/200/300"
          alt="avatar"
        />
      ) : (
        <Avatar variant="rounded" sx={{width: '100%', height: 300}} />
      )}
      {isOwner ? (
        <Button className="profile-avatar-btn-edit" variant="outlined">
          Редактировать
        </Button>
      ) : (
        <Button
          className="profile-avatar-btn-edit"
          variant="contained"
          color={isFollow ? 'error' : 'primary'}
          onClick={isFollow ? unfollow : follow}>
          {isFollow ? 'Отписаться' : 'Подписаться'}
        </Button>
      )}
    </div>
  );
};

export default FrameHoc(ProfileAvatar);
