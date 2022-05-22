import {SET_PORTFOLIO} from './portfolioActions';

export interface IPortfolio {
  _id: any;
  title: string;
  link: string;
  img: string | null;
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
