import {instance} from './instance';

export const usersAPI = {
  getAllUsers: () => {
    return instance.get('users/all').then((res) => {
      return res.data;
    });
  },
  getFriends: (options?: object) => {
    let params = {};
    if (options) {
      params = new URLSearchParams({...options});
    }
    return instance
      .get(`users/friends/${options ? `?${params.toString()}` : ''}`)
      .then((res) => {
        return res.data;
      });
  },
  follow: (id: any) => {
    return instance.post(`users/follow/${id}`).then((res) => {
      return res.status;
    });
  },
  unfollow: (id: any) => {
    return instance.post(`users/unfollow/${id}`).then((res) => {
      return res.data;
    });
  },
};
