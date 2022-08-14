import {SET_CATEGORIES} from './categoriesActions';

export interface ICategory {
  _id: string;
  title: string;
  parent: string | null;
  childrens: string[];
  createdDate: string;
  children?: ICategory[];
}

const init: ICategory[] = [];

const categoriesReducer = (state = init, {type, payload}: any) => {
  switch (type) {
    case SET_CATEGORIES:
      return payload;
    default:
      return state;
  }
};

export default categoriesReducer;
