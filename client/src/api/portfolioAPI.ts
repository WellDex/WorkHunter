import {instance} from './instance';

export interface ICreateProject {
  title: string;
  avatar?: null | string | any;
  link: string;
}

export const portfolioAPI = {
  getPortfolio: (id: string, options?: object) => {
    let params = {};
    if (options) {
      params = new URLSearchParams({...options});
    }
    return instance
      .get(`portfolio/${id}${options ? `?${params.toString()}` : ''}`)
      .then((res) => {
        return res.data;
      });
  },
  createProject: (data: any) => {
    return instance.post('portfolio/create', data).then((res) => {
      return res.data;
    });
  },
  updateProject: (id: string, data: any) => {
    return instance.put(`portfolio/update/${id}`, data).then((res) => {
      return res.data;
    });
  },
  deleteProject: (id: string) => {
    return instance.delete(`portfolio/delete/${id}`).then((res) => {
      return res.data;
    });
  },
};
