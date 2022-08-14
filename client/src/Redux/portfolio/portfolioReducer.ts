import {SET_PORTFOLIO} from './portfolioActions';

export interface IPortfolio {
  _id: string;
  title: string;
  link: string;
  avatar: string | null;
  createDate: string;
}

const init: IPortfolio[] = [];

const portfolioReducer = (state = init, {type, payload}: any) => {
  switch (type) {
    case SET_PORTFOLIO:
      return payload;
    default:
      return state;
  }
};

export default portfolioReducer;
