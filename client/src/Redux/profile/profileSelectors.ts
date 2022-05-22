const getState = (state: any) => state.profile;

export const getProfile = (state: any) => {
  return getState(state);
};
export const getProfileFriends = (state: any) => {
  return getState(state).friends;
};
