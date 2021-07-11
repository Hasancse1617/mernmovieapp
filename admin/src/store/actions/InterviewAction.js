import { REMOVE_INTERVIEW_LOADER, SET_INTERVIEWS, SET_INTERVIEW_ERRORS, SET_INTERVIEW_LOADER, SET_INTERVIEW_MESSAGE, SET_INTERVIEW_REDIRECT, SET_INTERVIEW_STATUS, SET_SINGLE_INTERVIEW } from "../types/InterviewType";
import axiosInstance from "../../helper/axiosInstance";

export const createAction = (interviewData) =>{
    return async(dispatch) =>{
       dispatch({type: SET_INTERVIEW_LOADER});
       try {
            const { data:{msg} } = await axiosInstance.post(`/create-interview`, interviewData); 
            dispatch({type: REMOVE_INTERVIEW_LOADER});
            dispatch({type: SET_INTERVIEW_MESSAGE, payload:msg});
            dispatch({type: SET_INTERVIEW_REDIRECT}); 
       } catch (error) {
            const {errors} = error.response.data;
            dispatch({type: REMOVE_INTERVIEW_LOADER});
            dispatch({type: SET_INTERVIEW_ERRORS, payload:errors});
            console.log(errors);
       }
    }
}

export const fetchInterview = (page) =>{
     return async(dispatch) =>{
        dispatch({type: SET_INTERVIEW_LOADER});
        try {
             const { data:{response, count, perPage} } = await axiosInstance.get(`/all-interviews/${page}`); 
             dispatch({type: REMOVE_INTERVIEW_LOADER});
             dispatch({type: SET_INTERVIEWS, payload: {response,count,perPage}}); 
        } catch (error) {
             const {errors} = error.response.data;
             dispatch({type: REMOVE_INTERVIEW_LOADER});
             dispatch({type: SET_INTERVIEW_ERRORS, payload:errors});
             console.log(errors);
        }
     }
 }

 export const editAction = (id) =>{
     return async(dispatch) =>{
        dispatch({type: SET_INTERVIEW_LOADER});
        try {
             const { data:{response} } = await axiosInstance.get(`/edit-interview/${id}`); 
             dispatch({type: REMOVE_INTERVIEW_LOADER});
             dispatch({type: SET_SINGLE_INTERVIEW, payload: response}); 
             dispatch({type: SET_INTERVIEW_STATUS});
        } catch (error) {
             const {errors} = error.response.data;
             dispatch({type: REMOVE_INTERVIEW_LOADER});
             dispatch({type: SET_INTERVIEW_ERRORS, payload:errors});
             console.log(errors);
        }
     }
 }

 export const updateAction = (interviewData,id) =>{
     return async(dispatch) =>{
        dispatch({type: SET_INTERVIEW_LOADER});
        try {
             const { data:{msg} } = await axiosInstance.post(`/update-interview/${id}`, interviewData); 
             dispatch({type: REMOVE_INTERVIEW_LOADER});
             dispatch({type: SET_INTERVIEW_MESSAGE, payload:msg});
             dispatch({type: SET_INTERVIEW_REDIRECT}); 
        } catch (error) {
             const {errors} = error.response.data;
             dispatch({type: REMOVE_INTERVIEW_LOADER});
             dispatch({type: SET_INTERVIEW_ERRORS, payload:errors});
             console.log(errors);
        }
     }
 }

 export const deleteAction = (id) =>{
     return async(dispatch) =>{
        try {
             const { data:{msg} } = await axiosInstance.get(`/delete-interview/${id}`); 
             dispatch({type: SET_INTERVIEW_LOADER});
             dispatch({type: SET_INTERVIEW_MESSAGE, payload:msg});
        } catch (error) {
             const {errors} = error.response.data;
             dispatch({type: SET_INTERVIEW_ERRORS, payload:errors});
             console.log(errors);
        }
     }
 }