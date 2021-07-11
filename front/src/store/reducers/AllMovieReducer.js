import { REMOVE_ALLMOVIE_ERRORS, REMOVE_ALLMOVIE_GENRES, REMOVE_ALLMOVIE_LOADER, REMOVE_LOAD_MORE, REMOVE_LOAD_MOVIE, SET_ALLMOVIES, SET_ALLMOVIE_ERRORS, SET_ALLMOVIE_GENRES, SET_ALLMOVIE_LOADER, SET_ALL_NEWS, SET_LOAD_MORE, SET_LOAD_MOVIE, SET_NEW_MOVIES } from "../types/AllMovieType"

const initState = {
    loading: false,
    allMovieErrors: [],
    allMovieGenres: [],
    allMovies: [],
    totalPage: '',
    load_movie: false,
    load_more: false,
    allNews: [],
    newMovies: [],
}
const AllMovieReducer = (state=initState, action) =>{
    if(action.type === SET_ALLMOVIE_LOADER){
        return {...state, loading: true}
    }
    else if(action.type === REMOVE_ALLMOVIE_LOADER){
        return {...state, loading: false}
    }
    else if(action.type === SET_ALLMOVIE_ERRORS){
        return {...state, allMovieErrors: action.payload}
    }
    else if(action.type === REMOVE_ALLMOVIE_ERRORS){
        return {...state, allMovieErrors: []}
    }
    else if(action.type === SET_ALLMOVIE_GENRES){
        return {...state, allMovieGenres: action.payload}
    }
    else if(action.type === REMOVE_ALLMOVIE_GENRES){
        return {...state, allMovieGenres: []}
    }
    else if(action.type === SET_LOAD_MORE){
        return {...state, load_more: true}
    }
    else if(action.type === REMOVE_LOAD_MORE){
        return {...state, load_more: false}
    }
    else if(action.type === SET_LOAD_MOVIE){
        return {...state, load_movie: true}
    }
    else if(action.type === REMOVE_LOAD_MOVIE){
        return {...state, load_movie: false}
    }
    else if(action.type === SET_ALLMOVIES){
        return {...state, allMovies: action.payload.response, totalPage: action.payload.totalPage }
    }
    else if(action.type === SET_ALL_NEWS){
        return {...state, allNews: action.payload}
    }
    else if(action.type === SET_NEW_MOVIES){
        return {...state, newMovies: action.payload}
    }
    else {
        return state;
    }
}
export default AllMovieReducer;