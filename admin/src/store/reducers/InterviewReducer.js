import { REMOVE_INTERVIEW_ERRORS, REMOVE_INTERVIEW_LOADER, REMOVE_INTERVIEW_MESSAGE, REMOVE_INTERVIEW_REDIRECT, REMOVE_INTERVIEW_STATUS, SET_INTERVIEWS, SET_INTERVIEW_ERRORS, SET_INTERVIEW_LOADER, SET_INTERVIEW_MESSAGE, SET_INTERVIEW_REDIRECT, SET_INTERVIEW_STATUS, SET_SINGLE_INTERVIEW } from "../types/InterviewType"

const initState = {
    loading: false,
    interviewErrors: [],
    message: '',
    redirect: false,
    interviews: [],
    count: '',
    perPage: '',
    pageLink: '',
    status: false,
    interview: [],
}

const InterviewReducer = (state=initState, action) =>{
    if(action.type === SET_INTERVIEW_LOADER){
        return {...state, loading: true}
    }
    else if(action.type === REMOVE_INTERVIEW_LOADER){
        return {...state, loading: false}
    }
    else if(action.type === SET_INTERVIEW_ERRORS){
        return {...state, interviewErrors: action.payload}
    }
    else if(action.type === REMOVE_INTERVIEW_ERRORS){
        return {...state, interviewErrors: []}
    }
    else if(action.type === SET_INTERVIEW_MESSAGE){
        return {...state, message: action.payload}
    }
    else if(action.type === REMOVE_INTERVIEW_MESSAGE){
        return {...state, message: ''}
    }
    else if(action.type === SET_INTERVIEW_REDIRECT){
        return {...state, redirect: true}
    }
    else if(action.type === REMOVE_INTERVIEW_REDIRECT){
        return {...state, redirect: false}
    }
    else if(action.type === SET_INTERVIEWS){
        return {...state, interviews: action.payload.response, count: action.payload.count, perPage: action.payload.perPage, pageLink: '/admin/video/all'}
    }
    else if(action.type === SET_SINGLE_INTERVIEW){
        return {...state, interview: action.payload}
    }
    else if(action.type === SET_INTERVIEW_STATUS){
        return {...state, status: true}
    }
    else if(action.type === REMOVE_INTERVIEW_STATUS){
        return {...state, status: false, interview: []}
    }
    else{
        return state;
    }
}
export default InterviewReducer