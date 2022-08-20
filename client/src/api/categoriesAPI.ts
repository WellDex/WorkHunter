import {ICategory} from '../Redux/categories/categoriesReducer';
import {instance} from './instance';

export interface ICategoryCreate {
  title: string;
  parent: string | null;
}

export const categoriesAPI = {
  get: () => {
    return instance.get('categories/').then((res) => {
      return res.data;
    });
  },
  create: (data: ICategoryCreate) => {
    return instance.post('categories/create', data).then((res) => {
      return res.data;
    });
  },
  update: (data: ICategory) => {
    return instance.put('categories/update', data).then((res) => {
      return res.data;
    });
  },
  delete: (id: string) => {
    return instance.delete(`categories/${id}`).then((res) => {
      return res.data;
    });
  },
};
