import {IChatUser} from './messengerReducer';
import {IChat} from './messengerReducer';
export const SET_CHATS = 'SET_CHATS';
export const SET_USERS = 'SET_USERS';

export const setChats = (data: IChat[]) => ({
  type: SET_CHATS,
  payload: data,
});

export const setUsers = (data: IChatUser[]) => ({
  type: SET_USERS,
  payload: data,
});
