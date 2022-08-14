import {instance} from './instance';

export const adminAPI = {
  getUsers: () => {
    return instance.get('admin/users').then((res) => {
      return res.data;
    });
  },
  getGroups: () => {
    return instance.get('admin/groups').then((res) => {
      return res.data;
    });
  },
};
