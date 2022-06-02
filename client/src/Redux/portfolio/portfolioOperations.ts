import {portfolioAPI} from '../../api/portfolioAPI';
import {setNotification} from '../app/appActions';
import {setportfolio} from './portfolioActions';

export const getPortfolio = (id: string) => async (dispatch: any) => {
  await portfolioAPI
    .getPortfolio(id)
    .then((res) => {
      dispatch(setportfolio(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    });
};
