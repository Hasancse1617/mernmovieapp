import { REMOVE_VIDEO_LOADER, SET_SINGLE_VIDEO, SET_VIDEOS, SET_VIDEO_CATEGORIES, SET_VIDEO_ERRORS, SET_VIDEO_GENRES, SET_VIDEO_LOADER, SET_VIDEO_MESSAGE, SET_VIDEO_REDIRECT, SET_VIDEO_STATUS } from "../types/VideoType"
import axiosInstance from '../../helper/axiosInstance'

export const videoCategory = () =>{
    return async(dispatch) =>{
        dispatch({type: SET_VIDEO_LOADER});
        try {
            const { data:{response} } = await axiosInstance.get(`/video-categories`); 
            dispatch({type: REMOVE_VIDEO_LOADER});
            dispatch({type: SET_VIDEO_CATEGORIES, payload:response}); 
       } catch (error) {
            const {errors} = error.response.data;
            dispatch({type: REMOVE_VIDEO_LOADER});
            dispatch({type: SET_VIDEO_ERRORS, payload:errors});
       }
    }
}

export const videoGenre = () =>{
     return async(dispatch) =>{
         dispatch({type: SET_VIDEO_LOADER});
         try {
             const { data:{response} } = await axiosInstance.get(`/video-genres`); 
             dispatch({type: REMOVE_VIDEO_LOADER});
             dispatch({type: SET_VIDEO_GENRES, payload:response}); 
        } catch (error) {
             const {errors} = error.response.data;
             dispatch({type: REMOVE_VIDEO_LOADER});
             dispatch({type: SET_VIDEO_ERRORS, payload:errors});
             console.log(errors);
        }
     }
 }

export const createAction = (videoData) =>{
    return async(dispatch) =>{
       dispatch({type: SET_VIDEO_LOADER});
       try {
            const { data:{msg} } = await axiosInstance.post(`/create-video`, videoData); 
            dispatch({type: REMOVE_VIDEO_LOADER});
            dispatch({type: SET_VIDEO_MESSAGE, payload:msg});
            dispatch({type: SET_VIDEO_REDIRECT}); 
       } catch (error) {
            const {errors} = error.response.data;
            dispatch({type: REMOVE_VIDEO_LOADER});
            dispatch({type: SET_VIDEO_ERRORS, payload:errors});
            console.log(errors);
       }
    }
}

export const editAction = (id) =>{
     return async(dispatch) =>{
        dispatch({type: SET_VIDEO_LOADER});
        try {
             const { data:{response} } = await axiosInstance.get(`/edit-video/${id}`); 
             dispatch({type: REMOVE_VIDEO_LOADER});
             dispatch({type: SET_SINGLE_VIDEO, payload: response}); 
             dispatch({type: SET_VIDEO_STATUS});
        } catch (error) {
             const {errors} = error.response.data;
             dispatch({type: REMOVE_VIDEO_LOADER});
             dispatch({type: SET_VIDEO_ERRORS, payload:errors});
             console.log(errors);
        }
     }
 }

 export const updateAction = (videoData,id) =>{
     return async(dispatch) =>{
        dispatch({type: SET_VIDEO_LOADER});
        try {
             const { data:{msg} } = await axiosInstance.post(`/update-video/${id}`, videoData); 
             dispatch({type: REMOVE_VIDEO_LOADER});
             dispatch({type: SET_VIDEO_MESSAGE, payload:msg});
             dispatch({type: SET_VIDEO_REDIRECT}); 
        } catch (error) {
             const {errors} = error.response.data;
             dispatch({type: REMOVE_VIDEO_LOADER});
             dispatch({type: SET_VIDEO_ERRORS, payload:errors});
             console.log(errors);
        }
     }
 }

export const fetchVideos = (page) =>{
     return async(dispatch) =>{
        dispatch({type: SET_VIDEO_LOADER});
        try {
             const { data:{response, count, perPage} } = await axiosInstance.get(`/all-videos/${page}`); 
             dispatch({type: REMOVE_VIDEO_LOADER});
             dispatch({type: SET_VIDEOS, payload: {response,count,perPage}}); 
        } catch (error) {
             const {errors} = error.response.data;
             dispatch({type: REMOVE_VIDEO_LOADER});
             dispatch({type: SET_VIDEO_ERRORS, payload:errors});
             console.log(errors);
        }
     }
 }

 export const deleteAction = (id) =>{
     return async(dispatch) =>{
        try {
             const { data:{msg} } = await axiosInstance.get(`/delete-video/${id}`); 
             dispatch({type: SET_VIDEO_LOADER});
             dispatch({type: SET_VIDEO_MESSAGE, payload:msg});
        } catch (error) {
             const {errors} = error.response.data;
             dispatch({type: SET_VIDEO_ERRORS, payload:errors});
             console.log(errors);
        }
     }
 }