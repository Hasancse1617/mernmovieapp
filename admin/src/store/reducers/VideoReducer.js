import { REMOVE_VIDEO_ERRORS, REMOVE_VIDEO_LOADER, REMOVE_VIDEO_MESSAGE, REMOVE_VIDEO_REDIRECT, REMOVE_VIDEO_STATUS, SET_SINGLE_VIDEO, SET_VIDEOS, SET_VIDEO_CATEGORIES, SET_VIDEO_ERRORS, SET_VIDEO_GENRES, SET_VIDEO_LOADER, SET_VIDEO_MESSAGE, SET_VIDEO_REDIRECT, SET_VIDEO_STATUS } from "../types/VideoType";

const initState = {
    loading: false,
    videoErrors: [],
    categories: [],
    genress: [],
    message: '',
    redirect: false,
    videos: [],
    video: [],
    count: '',
    perPage: '',
    pageLink: '',
    videoStatus: false,
}

const VideoReducer = (state = initState, action) =>{
    if(action.type === SET_VIDEO_LOADER){
        return {...state, loading: true}
    }
    else if(action.type === REMOVE_VIDEO_LOADER){
        return {...state, loading: false}
    }
    else if(action.type === SET_VIDEO_ERRORS){
        return {...state, videoErrors: action.payload}
    }
    else if(action.type === REMOVE_VIDEO_ERRORS){
        return {...state, videoErrors: []}
    }
    else if(action.type === SET_VIDEO_CATEGORIES){
        return {...state, categories: action.payload}
    }
    else if(action.type === SET_VIDEO_GENRES){
        return {...state, genress: action.payload}
    }
    else if(action.type === SET_VIDEO_MESSAGE){
        return {...state, message: action.payload}
    }
    else if(action.type === REMOVE_VIDEO_MESSAGE){
        return {...state, message: ''}
    }
    else if(action.type === SET_VIDEO_REDIRECT){
        return {...state, redirect: true}
    }
    else if(action.type === REMOVE_VIDEO_REDIRECT){
        return {...state, redirect: false}
    }
    else if(action.type === SET_VIDEOS){
        return {...state, videos: action.payload.response, count: action.payload.count, perPage: action.payload.perPage, pageLink: '/admin/video/all'}
    }
    else if(action.type === SET_SINGLE_VIDEO){
        return {...state, video: action.payload}
    }
    else if(action.type === SET_VIDEO_STATUS){
        return {...state, videoStatus: true}
    }
    else if(action.type === REMOVE_VIDEO_STATUS){
        return {...state, videoStatus: false, video: []}
    }
    else{
        return state;
    }
}
export default VideoReducer;