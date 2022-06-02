import {instance} from './instance';

export interface ICreateGroup {
  title: string;
  description: string | null;
}

export const groupsAPI = {
  getMyGroups: (id: string, options?: object) => {
    let params = {};
    if (options) {
      params = new URLSearchParams({...options});
    }
    return instance
      .get(`groups/my/${id}${options ? `?${params.toString()}` : ''}`)
      .then((res) => {
        return res.data;
      });
  },
  updateGroup: (id: string, data: ICreateGroup) => {
    return instance.put(`groups/update/${id}`, data).then((res) => {
      return res.data;
    });
  },
  getGroups: () => {
    return instance.get('groups/all').then((res) => {
      return res.data;
    });
  },
  getGroup: (id: string) => {
    return instance.get(`groups/${id}`).then((res) => {
      return res.data;
    });
  },
  getSubscribers: (id: string, options?: object) => {
    let params = {};
    if (options) {
      params = new URLSearchParams({...options});
    }
    return instance
      .get(`groups/subscribers/${id}?${params.toString()}`)
      .then((res) => {
        return res.data;
      });
  },
  createGroup: (data: ICreateGroup) => {
    return instance.post('groups/create', data).then((res) => {
      return res.data;
    });
  },
  follow: (id: string) => {
    return instance.post(`groups/follow/${id}`).then((res) => {
      return res.status;
    });
  },
  unfollow: (id: string) => {
    return instance.post(`groups/unfollow/${id}`).then((res) => {
      return res.data;
    });
  },
  deleteGroup: (id: string) => {
    return instance.delete(`groups/delete/${id}`).then((res) => {
      return res.data;
    });
  },
};
