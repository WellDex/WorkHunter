import {IUser} from './usersReducer';
export const SET_USERS = 'SET_USERS';

export const setUsers = (data: IUser[]) => ({
  type: SET_USERS,
  payload: data,
});
