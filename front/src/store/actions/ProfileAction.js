import axiosInstance from "../../helper/axiosInstance";
import { SET_TOKEN } from "../types/AuthType";
import { REMOVE_PASSWORD_LOADER, REMOVE_PROFILE_LOADER, SET_PASSWORD_LOADER, SET_PROFILE_ERRORS, SET_PROFILE_LOADER, SET_PROFILE_MESSAGE } from "../types/ProfileType"

export const passwordUpdate = (id, state) =>{
     return async (dispatch)=>{
        try {
            dispatch({type: SET_PASSWORD_LOADER});
            const {data: {msg}} = await axiosInstance.post(`/update-password/${id}`, state);
            dispatch({type: REMOVE_PASSWORD_LOADER});
            dispatch({type: SET_PROFILE_MESSAGE, payload: msg});
        } catch (error) {
            dispatch({type: REMOVE_PASSWORD_LOADER});
            dispatch({type: SET_PROFILE_ERRORS, payload: error.response.data.errors});
        }
     }
}

export const profileUpdate = (id, formData) =>{
    return async (dispatch)=>{
       try {
           dispatch({type: SET_PROFILE_LOADER});
           const {data} = await axiosInstance.post(`/update-profile/${id}`, formData);
           dispatch({type: SET_PROFILE_MESSAGE, payload: data.msg});
           localStorage.setItem("userToken", data.token);
           dispatch({type: SET_TOKEN, payload: data.token});
           dispatch({type: REMOVE_PROFILE_LOADER});
       } catch (error) {
           dispatch({type: REMOVE_PROFILE_LOADER});
           dispatch({type: SET_PROFILE_ERRORS, payload: error.response.data.errors});
       }
    }
}