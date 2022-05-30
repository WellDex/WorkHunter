import {instance} from './instance';

export interface ICreateProject {
  title: string;
  img?: null | string;
  link: string;
}

export const portfolioAPI = {
  getPortfolio: () => {
    return instance.get('portfolio/').then((res) => {
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
