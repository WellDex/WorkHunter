import {instance} from './instance';

export interface ICreateProject {
  title: string;
  description: string | null;
  budjet: number;
  // category?: {type: Number, default: 0}, //todo
  // subcategory?: {type: Number, default: 0}, //todo
  marks: any[];
}

export interface ICreateProjectRate {
  projectId: string;
  userId: string;
  message: string;
}

export const projectAPI = {
  getAll: () => {
    return instance.get('project/all').then((res) => {
      return res.data;
    });
  },
  getAccepted: () => {
    return instance.get('project/accept').then((res) => {
      return res.data;
    });
  },
  getMy: () => {
    return instance.get('project/my').then((res) => {
      return res.data;
    });
  },
  getById: (id: string) => {
    return instance.get(`project/${id}`).then((res) => {
      return res.data;
    });
  },
  create: (data: ICreateProject) => {
    return instance.post('project/create', data).then((res) => {
      return res.data;
    });
  },
  addRate: (data: ICreateProjectRate) => {
    return instance.post('project/addRate', data).then((res) => {
      return res.data;
    });
  },
  addPerformer: (data: {userId: string; projectId: string}) => {
    return instance.post('project/addPerformer', data).then((res) => {
      return res.data;
    });
  },
  checking: (data: {isCheck: boolean; projectId: string}) => {
    return instance.put('project/checking', data).then((res) => {
      return res.data;
    });
  },
  update: (data: any) => {
    return instance.put('project', data).then((res) => {
      return res.data;
    });
  },
  delete: (id: string) => {
    return instance.delete(`project/${id}`).then((res) => {
      return res.data;
    });
  },
};
