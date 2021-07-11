import axiosInstance from "../../helper/axiosInstance";
import { REMOVE_AUTH_LOADER, SET_AUTH_ERRORS, SET_AUTH_LOADER, SET_AUTH_MESSAGE, SET_TOKEN } from "../types/AuthType";


export const AuthLogin = (state) =>{
    return async (dispatch)=>{
        try {
            dispatch({type: SET_AUTH_LOADER});
            const { data } = await axiosInstance.post("/login", state);
            dispatch({type: SET_AUTH_MESSAGE, payload: data.msg});
            localStorage.setItem("userToken", data.token);
            dispatch({type: SET_TOKEN, payload: data.token});
            dispatch({type: REMOVE_AUTH_LOADER});
        } catch (error) {
            dispatch({type: REMOVE_AUTH_LOADER});
            dispatch({type: SET_AUTH_ERRORS, payload: error.response.data.errors})
        }
    }
}

export const AuthRegister = (state) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_AUTH_LOADER});
            const {data} = await axiosInstance.post("/register", state);
            dispatch({type: SET_AUTH_MESSAGE, payload: data.msg});
            dispatch({type: REMOVE_AUTH_LOADER});
        } catch (error) {
            dispatch({type: REMOVE_AUTH_LOADER});
            dispatch({type: SET_AUTH_ERRORS, payload: error.response.data.errors})
        }
    }
}
export const accountActivation = (token) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_AUTH_LOADER});
            const {data} = await axiosInstance.post("/account-activation", {token});
            dispatch({type: SET_AUTH_MESSAGE, payload: data.msg});
            dispatch({type: REMOVE_AUTH_LOADER});
        } catch (error) {
            dispatch({type: REMOVE_AUTH_LOADER});
            dispatch({type: SET_AUTH_ERRORS, payload: error.response.data.errors})
        }
    }
}

export const forgotPassword = (email) =>{
    return async(dispatch) =>{
        try {
            dispatch({type: SET_AUTH_LOADER});
            const {data} = await axiosInstance.post("/forgot-password", {email});
            dispatch({type: SET_AUTH_MESSAGE, payload: data.msg});
            dispatch({type: REMOVE_AUTH_LOADER});
        } catch (error) {
            dispatch({type: REMOVE_AUTH_LOADER});
            dispatch({type: SET_AUTH_ERRORS, payload: error.response.data.errors})
        }
    }
}

export const resetPassword = (token,state) =>{
    return async(dispatch) =>{
        try {
            dispatch({type: SET_AUTH_LOADER});
            const {data} = await axiosInstance.post(`/reset-password/${token}`,state);
            dispatch({type: SET_AUTH_MESSAGE, payload: data.msg});
            dispatch({type: REMOVE_AUTH_LOADER});
        } catch (error) {
            dispatch({type: REMOVE_AUTH_LOADER});
            dispatch({type: SET_AUTH_ERRORS, payload: error.response.data.errors})
        }
    }
}

export const googleLogin = (tokenId) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_AUTH_LOADER});
            const {data} = await axiosInstance.post('/google-login',{idToken:tokenId});
            dispatch({type: REMOVE_AUTH_LOADER});
            localStorage.setItem("userToken", data.token);
            dispatch({type: SET_TOKEN, payload: data.token});
        } catch (error) {
            dispatch({type: REMOVE_AUTH_LOADER});
            dispatch({type: SET_AUTH_ERRORS, payload: error.response.data.errors});
        }
    }
}

export const facebookLogin = (id,token) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_AUTH_LOADER});
            const {data} = await axiosInstance.post('/facebook-login',{userID:id, accessToken:token});
            dispatch({type: REMOVE_AUTH_LOADER});
            localStorage.setItem("userToken", data.token);
            dispatch({type: SET_TOKEN, payload: data.token});
        } catch (error) {
            dispatch({type: REMOVE_AUTH_LOADER});
            dispatch({type: SET_AUTH_ERRORS, payload: error.response.data.errors});
        }
    }
}