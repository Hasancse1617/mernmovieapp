import { REMOVE_INTERVIEW_LOADER, SET_INTERVIEW_ERRORS, SET_INTERVIEW_LOADER, SET_NEW_INTERVIEWS, SET_SINGLE_INTERVIEW } from "../types/InterviewType";
import axiosInstance from "../../helper/axiosInstance";

export const fetchInterview = (id) =>{
    return async (dispatch) => {
        try {
            dispatch({type: SET_INTERVIEW_LOADER});
            const { data } = await axiosInstance.get(`/single-interview/${id}`);
            dispatch({type: SET_SINGLE_INTERVIEW, payload: data.response});
            dispatch({type: REMOVE_INTERVIEW_LOADER});
        } catch (error) {
            dispatch({type: SET_INTERVIEW_ERRORS, payload: error.response.data.errors})
            dispatch({type: REMOVE_INTERVIEW_LOADER});
        }
    }
}

export const fetchNew = (id) =>{
    return async (dispatch) => {
        try {
            dispatch({type: SET_INTERVIEW_LOADER});
            const { data } = await axiosInstance.get(`/new-interviews/${id}`);
            dispatch({type: SET_NEW_INTERVIEWS, payload: data.response});
            dispatch({type: REMOVE_INTERVIEW_LOADER});
        } catch (error) {
            dispatch({type: SET_INTERVIEW_ERRORS, payload: error.response.data.errors})
            dispatch({type: REMOVE_INTERVIEW_LOADER});
        }
    }
}