/**
|----------------------------------------------------------------------------------------------------------------------
| This file namely "Root Reducer" contains placeholder for maintaining state for the entire app. Each state can have it's own reducers.
|----------------------------------------------------------------------------------------------------------------------
*/

import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  users: userReducer
});

export default rootReducer;
