import {SET_USERS} from './usersActions';

export interface IUser {
  id: any;
  firstName: string;
  lastName: string;
  status: string | null;
  avatar: string | null;
}

const init: IUser[] = [];

const usersReducer = (state = init, {type, payload}: any) => {
  switch (type) {
    case SET_USERS:
      return payload;
    default:
      return state;
  }
};

export default usersReducer;
