import { createStore, combineReducers } from '@reduxjs/toolkit';
import usersReducer from '../features/users/UsersSlice'
import reipesReducer from '../features/recepies/RecepiesSlice'
import authReducer from '../features/users/AuthSlice'
import { composeWithDevTools } from "redux-devtools-extension"

const rootReducer = combineReducers({
  users: usersReducer,
  recipes: reipesReducer,
  auth: authReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools()
)

export default store