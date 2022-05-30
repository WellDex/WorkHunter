import portfolioReducer, {IPortfolio} from './portfolio/portfolioReducer';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import appReducer, {IStateApp} from './app/appReducer';
import notesReducer, {INote} from './notes/notesReducer';
import profileReducer, {IStateProfile} from './profile/profileReducer';
import usersReducer, {IUser} from './users/usersReducer';
import groupsReducer, {IGroup} from './groups/groupsReducer';

const rootReducer = combineReducers({
  app: appReducer,
  profile: profileReducer,
  notes: notesReducer,
  portfolio: portfolioReducer,
  groups: groupsReducer,
  users: usersReducer,
});

const middleware = [thunk];

export const store = createStore(rootReducer, applyMiddleware(...middleware));

export interface IStore {
  app: IStateApp;
  profile: IStateProfile;
  notes: INote[];
  portfolio: IPortfolio[];
  groups: IGroup[];
  users: IUser[];
}
