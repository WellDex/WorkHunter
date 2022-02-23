const getState = (state: any) => state.app;

export const getIsAuth = (state: any) => {
  return getState(state).isAuth;
};
export const getNotification = (state: any) => {
  return getState(state).notification;
};
