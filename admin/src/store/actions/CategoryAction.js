import axiosInstance from '../../helper/axiosInstance';
import { REMOVE_CATEGORY_ERRORS, REMOVE_CATEGORY_LOADER, SET_CATEGORIES, SET_CATEGORY_ERRORS, SET_CATEGORY_LOADER, SET_CATEGORY_MESSAGE, SET_CATEGORY_STATUS, SET_SINGLE_CATEGORY } from '../types/CategoryType';

export const createAction = (categoryData) =>{
    return async (dispatch, getState)=>{        
        try {
           const {data} = await axiosInstance.post('http://localhost:5000/create_category',categoryData);
           dispatch({type: SET_CATEGORY_LOADER});
           dispatch({type: REMOVE_CATEGORY_ERRORS});
           dispatch({type: SET_CATEGORY_MESSAGE, payload: data.msg});
           console.log(data);
       } catch (error) {
           dispatch({type: REMOVE_CATEGORY_LOADER});
           dispatch({type: SET_CATEGORY_ERRORS, payload: error.response.data.errors});
       }
    };
}

export const fetchcategories = (page) =>{
    return async (dispatch, getState) =>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_CATEGORY_LOADER});
        try {
           const {data: {response, count, perPage}} = await axiosInstance.get(`http://localhost:5000/categories/${page}`);
           dispatch({type: REMOVE_CATEGORY_LOADER});
           dispatch({type: SET_CATEGORIES, payload: {response,count,perPage}});
           console.log(response);
       } catch (error) {
           dispatch({type: REMOVE_CATEGORY_LOADER});
       }
    };
}

export const fetchCategory = (id) =>{
     return async (dispatch, getState) =>{
        try {
           const {data: {response}} = await axiosInstance.get(`http://localhost:5000/edit-category/${id}`);
           dispatch({type: SET_SINGLE_CATEGORY, payload: response});
           dispatch({type: SET_CATEGORY_STATUS});
        //    dispatch({type:CLOSE_LOADER});
           console.log(response);
       } catch (error) {
        //    dispatch({type:CLOSE_LOADER});
       }
     };
}

export const updateAction = (categoryData,id) =>{
    return async (dispatch, getState)=>{
        try {
           const {data} = await axiosInstance.post(`http://localhost:5000/update_category/${id}`,categoryData);
           dispatch({type: SET_CATEGORY_LOADER});
           dispatch({type: REMOVE_CATEGORY_ERRORS});
           dispatch({type: SET_CATEGORY_MESSAGE, payload: data.msg});
           console.log(data);
       } catch (error) {
           dispatch({type: REMOVE_CATEGORY_LOADER});
           dispatch({type: SET_CATEGORY_ERRORS, payload: error.response.data.errors});
       }
    };
}

export const deleteAction = (id) =>{
    return async (dispatch, getState)=>{
        try {
            const {data} = await axiosInstance.get(`http://localhost:5000/delete_category/${id}`);
            dispatch({type: SET_CATEGORY_LOADER});
            dispatch({type: REMOVE_CATEGORY_ERRORS});
            dispatch({type: SET_CATEGORY_MESSAGE, payload: data.msg});
            
        } catch (error) {
            dispatch({type: REMOVE_CATEGORY_LOADER});
            dispatch({type: SET_CATEGORY_ERRORS, payload: error.response.data.errors});
        }
      
    };
}