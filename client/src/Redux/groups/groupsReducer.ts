import {SET_GROUPS} from './groupsActions';

export interface IGroup {
  _id: string;
  owner: string;
  title: string;
  avatar: string | null;
  description: string | null;
  subscribers: string[];
  createDate: string;
  isBlocked: true;
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
