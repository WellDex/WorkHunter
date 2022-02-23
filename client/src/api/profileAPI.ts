import {instance} from './instance';

export const profileAPI = {
  getProfile: () => {
    return instance.get('profile/').then((res) => {
      return res.data;
    });
  },
};
