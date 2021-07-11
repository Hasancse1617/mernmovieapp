import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import UserReducer from './reducers/UserReducer';
import AuthReducer from './reducers/AuthReducer';
import CategoryReducer from './reducers/CategoryReducer';
import GenreReducer from './reducers/GenreReducer';
import VideoReducer from './reducers/VideoReducer';
import InterviewReducer from './reducers/InterviewReducer';


const rootReducers = combineReducers({
     UserReducer,
     AuthReducer,
     CategoryReducer,
     GenreReducer,
     VideoReducer,
     InterviewReducer,
});
const middlewares = [thunkMiddleware];
const Store = createStore(rootReducers, composeWithDevTools( applyMiddleware(...middlewares)));

export default Store;