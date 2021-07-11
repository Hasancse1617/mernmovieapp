import { REMOVE_GENRE_ERRORS, REMOVE_GENRE_LOADER, REMOVE_GENRE_MESSAGE, REMOVE_GENRE_STATUS, SET_GENRIES, SET_GENRE_ERRORS, SET_GENRE_LOADER, SET_GENRE_MESSAGE, SET_GENRE_STATUS, SET_SINGLE_GENRE } from "../types/GenreType"

const initState = {
    loading:false,
    genreErrors:[],
    message:'',
    genries:[],
    count:'',
    perPage:'',
    genre:[],
    genreStatus:false,
    pageLink:'',
}
const GenreReducer = (state=initState, action) =>{
    if(action.type === SET_GENRE_LOADER){
        return {...state, loading: true}
    }
    else if(action.type === REMOVE_GENRE_LOADER){
        return {...state, loading: false}
    }
    else if(action.type === SET_GENRE_ERRORS){
        return {...state, genreErrors: action.payload}
    }
    else if(action.type === REMOVE_GENRE_ERRORS){
        return {...state, genreErrors: []}
    }
    else if(action.type === SET_GENRE_MESSAGE){
        return {...state, message: action.payload}
    }
    else if(action.type === REMOVE_GENRE_MESSAGE){
        return {...state, message: ''}
    }
    else if(action.type === SET_GENRIES){
        return {...state, genries: action.payload.response, count: action.payload.count, perPage: action.payload.perPage, pageLink: '/admin/genre/all'}
    }
    else if(action.type === SET_SINGLE_GENRE){
        return {...state, genre: action.payload}
    }
    else if(action.type === SET_GENRE_STATUS){
        return {...state, genreStatus: true}
    }
    else if(action.type === REMOVE_GENRE_STATUS){
        return {...state, genreStatus: false, genre: []}
    }
    else{
        return state;
    }
}
export default GenreReducer;