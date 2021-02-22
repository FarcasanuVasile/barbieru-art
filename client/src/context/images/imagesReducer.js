import { ADD_IMAGE,CLEAR_IMAGES } from '../types';

export default (state,action) => {
    switch(action.type){
        case ADD_IMAGE:
            return [...state,action.payload]
        case CLEAR_IMAGES:
            return{     
            images:[]
        }
        default: return state;
    }
}