import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import appReducer, {IStateApp} from './app/appReducer';
import notesReducer, {INote} from './notes/notesReducer';
import profileReducer, {IStateProfile} from './profile/profileReducer';

const rootReducer = combineReducers({
  app: appReducer,
  profile: profileReducer,
  notes: notesReducer,
});

const middleware = [thunk];

export const store = createStore(rootReducer, applyMiddleware(...middleware));

export interface IStore {
  app: IStateApp;
  profile: IStateProfile;
  notes: INote[];
}
