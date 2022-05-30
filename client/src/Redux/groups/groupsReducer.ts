import {SET_GROUPS} from './groupsActions';

export interface IGroup {
  _id: any;
  owner: string;
  title: string;
  description: string | null;
  subscribers: string[];
  createDate: string;
}

const init: IGroup[] | IGroup = [];

const groupsReducer = (state = init, {type, payload}: any) => {
  switch (type) {
    case SET_GROUPS:
      return payload;
    default:
      return state;
  }
};

export default groupsReducer;
