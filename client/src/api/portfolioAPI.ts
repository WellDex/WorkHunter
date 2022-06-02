import {instance} from './instance';

export interface ICreateProject {
  title: string;
  img?: null | string;
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
  createProject: (data: ICreateProject) => {
    return instance.post('portfolio/create', data).then((res) => {
      return res.data;
    });
  },
  deleteProject: (id: string) => {
    return instance.delete(`portfolio/delete/${id}`).then((res) => {
      return res.data;
    });
  },
};
