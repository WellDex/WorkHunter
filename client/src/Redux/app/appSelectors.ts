const getState = (state: any) => state.app;

export const getIsAuth = (state: any) => {
  return getState(state).app.isAuth;
};
