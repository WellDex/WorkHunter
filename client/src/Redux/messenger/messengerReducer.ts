import {SET_CHATS, SET_USER} from './messengerActions';

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
  user: IChatUser | null;
}

const init: IStateMessenger = {
  chats: [],
  user: null,
};

const messengerReducer = (state = init, {type, payload}: any) => {
  switch (type) {
    case SET_CHATS:
      return {...state, chats: payload};
    case SET_USER:
      return {...state, user: payload};
    default:
      return state;
  }
};

export default messengerReducer;
