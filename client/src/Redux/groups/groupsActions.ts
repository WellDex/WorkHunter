import {IGroup} from './groupsReducer';

export const SET_GROUPS = 'SET_GROUPS';
export const SET_GROUP = 'SET_GROUP';

export const setGroups = (data: IGroup[]) => ({
  type: SET_GROUPS,
  payload: data,
});
