import axiosInstance from '../../helper/axiosInstance';
import { REMOVE_GENRE_ERRORS, REMOVE_GENRE_LOADER, SET_GENRIES, SET_GENRE_ERRORS, SET_GENRE_LOADER, SET_GENRE_MESSAGE, SET_GENRE_STATUS, SET_SINGLE_GENRE } from '../types/GenreType';

export const createAction = (genreData) =>{
    return async (dispatch, getState)=>{        
        try {
           const {data} = await axiosInstance.post('http://localhost:5000/create_genre',genreData);
           dispatch({type: SET_GENRE_LOADER});
           dispatch({type: REMOVE_GENRE_ERRORS});
           dispatch({type: SET_GENRE_MESSAGE, payload: data.msg});
           console.log(data);
       } catch (error) {
           dispatch({type: REMOVE_GENRE_LOADER});
           dispatch({type: SET_GENRE_ERRORS, payload: error.response.data.errors});
       }
    };
}

export const fetchgenries = (page) =>{
    return async (dispatch, getState) =>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_GENRE_LOADER});
        try {
           const {data: {response, count, perPage}} = await axiosInstance.get(`http://localhost:5000/genries/${page}`);
           dispatch({type: REMOVE_GENRE_LOADER});
           dispatch({type: SET_GENRIES, payload: {response,count,perPage}});
           console.log(response);
       } catch (error) {
           dispatch({type: REMOVE_GENRE_LOADER});
       }
    };
}

export const fetchGenre = (id) =>{
     return async (dispatch, getState) =>{
        try {
           const {data: {response}} = await axiosInstance.get(`http://localhost:5000/edit-genre/${id}`);
           dispatch({type: SET_SINGLE_GENRE, payload: response});
           dispatch({type: SET_GENRE_STATUS});
        //    dispatch({type:CLOSE_LOADER});
           console.log(response);
       } catch (error) {
        //    dispatch({type:CLOSE_LOADER});
       }
     };
}

export const updateAction = (genreData,id) =>{
    return async (dispatch, getState)=>{
        try {
           const {data} = await axiosInstance.post(`http://localhost:5000/update_genre/${id}`,genreData);
           dispatch({type: SET_GENRE_LOADER});
           dispatch({type: REMOVE_GENRE_ERRORS});
           dispatch({type: SET_GENRE_MESSAGE, payload: data.msg});
           console.log(data);
       } catch (error) {
           dispatch({type: REMOVE_GENRE_LOADER});
           dispatch({type: SET_GENRE_ERRORS, payload: error.response.data.errors});
       }
    };
}

export const deleteAction = (id) =>{
    return async (dispatch, getState)=>{
        try {
            const {data} = await axiosInstance.get(`http://localhost:5000/delete_genre/${id}`);
            dispatch({type: SET_GENRE_LOADER});
            dispatch({type: REMOVE_GENRE_ERRORS});
            dispatch({type: SET_GENRE_MESSAGE, payload: data.msg});
            
        } catch (error) {
            dispatch({type: REMOVE_GENRE_LOADER});
            dispatch({type: SET_GENRE_ERRORS, payload: error.response.data.errors});
        }
      
    };
}