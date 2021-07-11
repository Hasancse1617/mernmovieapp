import { REMOVE_PASSWORD_LOADER, REMOVE_PROFILE_ERRORS, REMOVE_PROFILE_LOADER, REMOVE_PROFILE_MESSAGE, SET_PASSWORD_LOADER, SET_PROFILE_ERRORS, SET_PROFILE_LOADER, SET_PROFILE_MESSAGE } from "../types/ProfileType"

const initState = {
    loading: false,
    passwordLoading: false,
    message: '',
    profileErrors: [],
}
const ProfileReducer = (state=initState, action) =>{
    if(action.type === SET_PROFILE_LOADER){
        return {...state, loading: true}
    }
    else if(action.type === REMOVE_PROFILE_LOADER){
        return {...state, loading: false}
    }
    else if(action.type === SET_PASSWORD_LOADER){
        return {...state, passwordLoading: true}
    }
    else if(action.type === REMOVE_PASSWORD_LOADER){
        return {...state, passwordLoading: false}
    }
    else if(action.type === SET_PROFILE_MESSAGE){
        return {...state, message: action.payload}
    }
    else if(action.type === REMOVE_PROFILE_MESSAGE){
        return {...state, message: ''}
    }
    else if(action.type === SET_PROFILE_ERRORS){
        return {...state, profileErrors: action.payload}
    }
    else if(action.type === REMOVE_PROFILE_ERRORS){
        return {...state, profileErrors: []}
    }
    else{
        return state;
    }
}
export default ProfileReducer;