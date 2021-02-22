import {GET_WORKSITES,ADD_WORKSITE,UPDATE_WORKSITE,DELETE_WORKSITE, SET_CURRENT, CLEAR_CURRENT} from '../types';

export default (state,action) => {
    switch(action.type){
        case GET_WORKSITES:
            return{
                ...state,
                workSites:action.payload,
                error:null
            }
        case ADD_WORKSITE:
            return {
                ...state,
                workSites:[action.payload,...state.workSites],
            }
        case UPDATE_WORKSITE:
            return {
                ...state,
                workSites:state.workSites.map(workSite => workSite._id === action.payload._id ? action.payload : workSite)
            }
        case DELETE_WORKSITE: 
            return {
                ...state,
                workSites:state.workSites.filter( workSite => workSite._id != action.payload)
            }
        case SET_CURRENT:
            return {
                ...state,
                current:action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current:null
            }
        default:
            return state;
    }
}