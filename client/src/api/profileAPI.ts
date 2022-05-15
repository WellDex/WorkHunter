import {IStateProfile} from './../Redux/profile/profileReducer';
import {instance} from './instance';

export const profileAPI = {
  getProfile: () => {
    return instance.get('profile/').then((res) => {
      return res.data;
    });
  },
  updateProfile: (data: IStateProfile) => {
    return instance.post('profile/update', {profile: data}).then((res) => {
      return res.data;
    });
  },
};
