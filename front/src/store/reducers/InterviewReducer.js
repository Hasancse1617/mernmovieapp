import { REMOVE_INTERVIEW_ERRORS, REMOVE_INTERVIEW_LOADER, SET_INTERVIEW_ERRORS, SET_INTERVIEW_LOADER, SET_NEW_INTERVIEWS, SET_SINGLE_INTERVIEW } from "../types/InterviewType"

const initState = {
    loading: false,
    interview: [],
    newInterviews: [],
    interviewErrors: [],
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
    else if(action.type === SET_SINGLE_INTERVIEW){
        return {...state, interview: action.payload}
    }
    else if(action.type === SET_NEW_INTERVIEWS){
        return {...state, newInterviews: action.payload}
    }
    else{
        return state;
    }
}
export default InterviewReducer;