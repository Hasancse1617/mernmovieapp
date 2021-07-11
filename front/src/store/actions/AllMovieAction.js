import axiosInstance from "../../helper/axiosInstance";
import { REMOVE_ALLMOVIE_LOADER, REMOVE_LOAD_MORE, SET_ALLMOVIES, SET_ALLMOVIE_ERRORS, SET_ALLMOVIE_GENRES, SET_ALLMOVIE_LOADER, SET_ALL_NEWS, SET_LOAD_MORE, SET_LOAD_MOVIE, SET_NEW_MOVIES } from "../types/AllMovieType"

export const movieGenres = () =>{
    return async (dispatch) => {
        try {
            dispatch({type: SET_ALLMOVIE_LOADER});
            const { data } = await axiosInstance.get(`/movie-genre`);
            dispatch({type: SET_ALLMOVIE_GENRES, payload: data.response});
            dispatch({type: REMOVE_ALLMOVIE_LOADER});
        } catch (error) {
            dispatch({type: SET_ALLMOVIE_ERRORS, payload: error.response.data.errors})
            dispatch({type: REMOVE_ALLMOVIE_LOADER});
        }
    }
}

export const fetchVideos = (videoData) =>{
    return async (dispatch) => {
        try {
            dispatch({type: SET_ALLMOVIE_LOADER});
            const { data } = await axiosInstance.post("/all-movies", videoData);
            dispatch({type: SET_ALLMOVIES, payload: {response: data.response, totalPage: data.totalPage, pagenumber: data.pagenumber }});
            dispatch({type: SET_LOAD_MOVIE});
            dispatch({type: REMOVE_ALLMOVIE_LOADER});
        } catch (error) {
            dispatch({type: SET_ALLMOVIE_ERRORS, payload: error.response.data.errors})
            dispatch({type: REMOVE_ALLMOVIE_LOADER});
        }
    }
}

export const fetchLoadMore = (videoData) =>{
    return async (dispatch) => {
        try {
            dispatch({type: SET_ALLMOVIE_LOADER});
            const { data } = await axiosInstance.post("/all-movies", videoData);
            dispatch({type: SET_ALLMOVIES, payload: {response: data.response, totalPage: data.totalPage, pagenumber: data.pagenumber }});
            dispatch({type: SET_LOAD_MORE});
            dispatch({type: REMOVE_ALLMOVIE_LOADER});
        } catch (error) {
            dispatch({type: SET_ALLMOVIE_ERRORS, payload: error.response.data.errors})
            dispatch({type: REMOVE_ALLMOVIE_LOADER});
            dispatch({type: REMOVE_LOAD_MORE});
        }
    }
}

export const fetchNews = () =>{
    return async (dispatch) => {
        try {
            dispatch({type: SET_ALLMOVIE_LOADER});
            const { data } = await axiosInstance.get("/all-news");
            dispatch({type: SET_ALL_NEWS, payload: data.response});
            dispatch({type: REMOVE_ALLMOVIE_LOADER});
        } catch (error) {
            dispatch({type: SET_ALLMOVIE_ERRORS, payload: error.response.data.errors})
            dispatch({type: REMOVE_ALLMOVIE_LOADER});
        }
    }
}

export const fetchNewMovies = () =>{
    return async (dispatch) => {
        try {
            dispatch({type: SET_ALLMOVIE_LOADER});
            const { data } = await axiosInstance.get("/new-movies");
            dispatch({type: SET_NEW_MOVIES, payload: data.response});
            dispatch({type: REMOVE_ALLMOVIE_LOADER});
        } catch (error) {
            dispatch({type: SET_ALLMOVIE_ERRORS, payload: error.response.data.errors})
            dispatch({type: REMOVE_ALLMOVIE_LOADER});
        }
    }
}