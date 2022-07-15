import {IChatUser} from './messengerReducer';
import {IChat} from './messengerReducer';
export const SET_CHATS = 'SET_CHATS';
export const SET_USER = 'SET_USER';

export const setChats = (data: IChat[]) => ({
  type: SET_CHATS,
  payload: data,
});

export const setUser = (data: IChatUser) => ({
  type: SET_USER,
  payload: data,
});
