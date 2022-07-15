const getState = (state: any) => state.messenger;

export const getChats = (state: any) => {
  return getState(state).chats;
};
export const getUser = (state: any) => {
  return getState(state).user;
};
