import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import AuthReducer from './reducers/AuthReducer';
import ProfileReducer from './reducers/ProfileReducer';
import AllMovieReducer from './reducers/AllMovieReducer';
import SingleReducer from './reducers/SingleReducer';
import InterviewReducer from './reducers/InterviewReducer';


const rootReducers = combineReducers({
     AuthReducer,
     ProfileReducer,
     AllMovieReducer,
     SingleReducer,
     InterviewReducer,
});
const middlewares = [thunkMiddleware];
const Store = createStore(rootReducers, composeWithDevTools( applyMiddleware(...middlewares)));

export default Store;