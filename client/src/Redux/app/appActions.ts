export const CHANGE_IS_AUTH = 'CHANGE_IS_AUTH';

export const changeIsAuth = (data: boolean) => ({
  type: CHANGE_IS_AUTH,
  payload: {
    isAuth: data,
  },
});
