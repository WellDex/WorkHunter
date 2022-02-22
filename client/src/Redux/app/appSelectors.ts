const getState = (state: any) => state.app;

export const getIsAuth = (state: any) => {
  return getState(state).app.isAuth;
};
export const getNotification = (state: any) => {
  console.log(getState(state));
  return getState(state).app.notification;
};
