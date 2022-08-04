import {SET_CHATS, SET_USERS} from './messengerActions';

export interface IChat {
  _id: string;
  createdDate: string;
  members: string[];
}

export interface IChatUser {
  _id: string;
  avatar: string;
  name: string;
}

export interface IStateMessenger {
  chats: IChat[];
  users: IChatUser[] | [];
}

const init: IStateMessenger = {
  chats: [],
  users: [],
};

const messengerReducer = (state = init, {type, payload}: any) => {
  switch (type) {
    case SET_CHATS:
      return {...state, chats: payload};
    case SET_USERS:
      return {...state, users: payload};
    default:
      return state;
  }
};

export default messengerReducer;
