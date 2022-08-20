const getState = (state: any) => state.app;

export const getIsAuth = (state: any) => {
  return getState(state).isAuth;
};
export const getNotification = (state: any) => {
  return getState(state).notification;
};
export const getUserId = (state: any) => {
  return getState(state).userId;
};
export const getFirstName = (state: any) => {
  return getState(state).firstName;
};
export const getAvatar = (state: any) => {
  return getState(state).avatar;
};
export const getIsAdmin = (state: any) => {
  return getState(state).isAdmin;
};
export const getIsLoading = (state: any) => {
  return getState(state).loading;
};
