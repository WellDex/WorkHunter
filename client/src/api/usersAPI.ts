import {instance} from './instance';

export const usersAPI = {
  getAllUsers: () => {
    return instance.get('users/all').then((res) => {
      return res.data;
    });
  },
  getFriends: (id: string, options?: object) => {
    let params = {};
    if (options) {
      params = new URLSearchParams({...options});
    }
    return instance
      .get(`users/friends/${id}${options ? `?${params.toString()}` : ''}`)
      .then((res) => {
        return res.data;
      });
  },
  follow: (id: string) => {
    return instance.post(`users/follow/${id}`).then((res) => {
      return res.status;
    });
  },
  unfollow: (id: string) => {
    return instance.post(`users/unfollow/${id}`).then((res) => {
      return res.data;
    });
  },
};
