import axiosInstance from "../../helper/axiosInstance";
import { REMOVE_SINGLE_LOADER, SET_SIMILAR_MOVIE, SET_SINGLE_ERRORS, SET_SINGLE_LOADER, SET_SINGLE_MOVIE } from "../types/SingleType";

export const videoDetails = (id) =>{
    return async (dispatch) => {
        try {
            dispatch({type: SET_SINGLE_LOADER});
            const { data } = await axiosInstance.get(`/single-movie/${id}`);
            dispatch({type: SET_SINGLE_MOVIE, payload: data.response});
            dispatch({type: REMOVE_SINGLE_LOADER});
        } catch (error) {
            dispatch({type: SET_SINGLE_ERRORS, payload: error.response.data.errors})
            dispatch({type: REMOVE_SINGLE_LOADER});
        }
    }
}

export const similarVideos = (id) =>{
    return async (dispatch) => {
        try {
            dispatch({type: SET_SINGLE_LOADER});
            const { data } = await axiosInstance.get(`/similar-movie/${id}`);
            dispatch({type: SET_SIMILAR_MOVIE, payload: data.similar});
            dispatch({type: REMOVE_SINGLE_LOADER});
        } catch (error) {
            dispatch({type: SET_SINGLE_ERRORS, payload: error.response.data.errors})
            dispatch({type: REMOVE_SINGLE_LOADER});
        }
    }
}