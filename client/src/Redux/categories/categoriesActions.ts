import {ICategory} from './categoriesReducer';
export const SET_CATEGORIES = 'SET_CATEGORIES';

export const setCategories = (data: ICategory[]) => ({
  type: SET_CATEGORIES,
  payload: data,
});
