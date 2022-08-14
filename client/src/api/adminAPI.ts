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
  blockUserToogle: (id: string, isBlocked: boolean) => {
    return instance.put(`admin/user/block/${id}`, {isBlocked}).then((res) => {
      return res.data;
    });
  },
  blockGroupToogle: (id: string, isBlocked: boolean) => {
    return instance.put(`admin/group/block/${id}`, {isBlocked}).then((res) => {
      return res.data;
    });
  },
};
