import {portfolioAPI} from '../../api/portfolioAPI';
import {setNotification} from '../app/appActions';
import {setportfolio} from './portfolioActions';

export const getPortfolio = () => async (dispatch: any) => {
  await portfolioAPI
    .getPortfolio()
    .then((res) => {
      dispatch(setportfolio(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    });
};
