import { LOGOUT, REMOVE_AUTH_ERRORS, REMOVE_AUTH_LOADER, REMOVE_AUTH_MESSAGE, SET_AUTH_ERRORS, SET_AUTH_LOADER, SET_AUTH_MESSAGE, SET_TOKEN } from "../types/AuthType";
import jwt_decode from 'jwt-decode';

const initState = {
    loading: false,
    authErrors: [],
    token: '',
    user: '',
    message: ''
} 

const verifyToken = (token) => {
	const decodeToken = jwt_decode(token);
	const expiresIn = new Date(decodeToken.exp * 1000);
	if (new Date() > expiresIn) {
		localStorage.removeItem('userToken');
		return null;
	} else {
		return decodeToken;
	}
};
const token = localStorage.getItem('userToken');
if (token) {
	const decoded = verifyToken(token);
	if (decoded) {
		initState.token = token;
		const { user } = decoded;
		initState.user = user;
	}
}

const AuthReducer = (state=initState, action) =>{
    if(action.type === SET_AUTH_LOADER){
        return {...state, loading: true}
    }
    else if(action.type === REMOVE_AUTH_LOADER){
        return {...state, loading: false}
    }
    else if(action.type === SET_AUTH_ERRORS){
        return {...state, authErrors: action.payload}
    }
    else if(action.type === REMOVE_AUTH_ERRORS){
        return {...state, authErrors: []}
    }
    else if(action.type === SET_AUTH_MESSAGE){
        return {...state, message: action.payload}
    }
    else if(action.type === REMOVE_AUTH_MESSAGE){
        return {...state, message: ''}
    }
    else if(action.type === SET_TOKEN){
        const decoded = verifyToken(action.payload);
		const { user } = decoded;
        return {...state, token: action.payload, user: user}
    }
    else if (action.type === LOGOUT) {
		return { ...state, token: '', user: '' };
	} 
    else{
        return state;
    }
}
export default AuthReducer;