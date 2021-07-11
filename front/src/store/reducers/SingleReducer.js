import { REMOVE_SINGLE_ERRORS, REMOVE_SINGLE_LOADER, SET_SIMILAR_MOVIE, SET_SINGLE_ERRORS, SET_SINGLE_LOADER, SET_SINGLE_MOVIE } from "../types/SingleType"

const initState = {
    loading: false,
    singleErrors: [],
    singleMovie: [],
    similar_movies: [],
}
const SingleReducer = (state=initState,action) =>{
    if(action.type === SET_SINGLE_LOADER){
        return {...state, loading: true}
    }
    else if(action.type === REMOVE_SINGLE_LOADER){
        return {...state, loading: false}
    }
    else if(action.type === SET_SINGLE_ERRORS){
        return {...state, singleErrors: action.payload}
    }
    else if(action.type === REMOVE_SINGLE_ERRORS){
        return {...state, singleErrors: []}
    }
    else if(action.type === SET_SINGLE_MOVIE){
        return {...state, singleMovie: action.payload}
    }
    else if(action.type === SET_SIMILAR_MOVIE){
        return {...state, similar_movies: action.payload, similar_status: true}
    }
    else{
        return state;
    }
}
export default SingleReducer;