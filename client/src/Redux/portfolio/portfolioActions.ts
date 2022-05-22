import {IPortfolio} from './portfolioReducer';
export const SET_PORTFOLIO = 'SET_PORTFOLIO';

export const setportfolio = (data: IPortfolio[]) => ({
  type: SET_PORTFOLIO,
  payload: data,
});
