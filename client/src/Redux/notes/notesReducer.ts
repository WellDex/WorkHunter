import {SET_NOTES} from './notesActions';

export interface INote {
  _id: string;
  text: string;
  subscribers: string[];
  createDate: string;
  owner: string;
  refOwner: string;
  user: {
    name: string;
    avatar: string | null;
  };
}

const init: INote[] = [];

const notesReducer = (state = init, {type, payload}: any) => {
  switch (type) {
    case SET_NOTES:
      return payload;
    default:
      return state;
  }
};

export default notesReducer;
