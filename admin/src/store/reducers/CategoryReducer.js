import { REMOVE_CATEGORY_ERRORS, REMOVE_CATEGORY_LOADER, REMOVE_CATEGORY_MESSAGE, REMOVE_CATEGORY_STATUS, SET_CATEGORIES, SET_CATEGORY_ERRORS, SET_CATEGORY_LOADER, SET_CATEGORY_MESSAGE, SET_CATEGORY_STATUS, SET_SINGLE_CATEGORY } from "../types/CategoryType"

const initState = {
    loading:false,
    categoryErrors:[],
    message:'',
    categories:[],
    count:'',
    perPage:'',
    category:[],
    categoryStatus:false,
    pageLink:'',
}
const CategoryReducer = (state=initState, action) =>{
    if(action.type === SET_CATEGORY_LOADER){
        return {...state, loading: true}
    }
    else if(action.type === REMOVE_CATEGORY_LOADER){
        return {...state, loading: false}
    }
    else if(action.type === SET_CATEGORY_ERRORS){
        return {...state, categoryErrors: action.payload}
    }
    else if(action.type === REMOVE_CATEGORY_ERRORS){
        return {...state, categoryErrors: []}
    }
    else if(action.type === SET_CATEGORY_MESSAGE){
        return {...state, message: action.payload}
    }
    else if(action.type === REMOVE_CATEGORY_MESSAGE){
        return {...state, message: ''}
    }
    else if(action.type === SET_CATEGORIES){
        return {...state, categories: action.payload.response, count: action.payload.count, perPage: action.payload.perPage, pageLink: '/admin/category/all'}
    }
    else if(action.type === SET_SINGLE_CATEGORY){
        return {...state, category: action.payload}
    }
    else if(action.type === SET_CATEGORY_STATUS){
        return {...state, categoryStatus: true}
    }
    else if(action.type === REMOVE_CATEGORY_STATUS){
        return {...state, categoryStatus: false, category: []}
    }
    else{
        return state;
    }
}
export default CategoryReducer;