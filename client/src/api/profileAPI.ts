import {IStateProfile} from './../Redux/profile/profileReducer';
import {instance} from './instance';

export const profileAPI = {
  getProfile: (id: string) => {
    return instance.get(`profile/${id}`).then((res) => {
      return res.data;
    });
  },
  getFriends: () => {
    return instance.get('profile/friends').then((res) => {
      return res.data;
    });
  },
  updateProfile: (data: IStateProfile) => {
    return instance.post('profile/update', {profile: data}).then((res) => {
      return res.data;
    });
  },
};
