import { ADD_IMAGE,CLEAR_IMAGES, SET_IMAGES,REMOVE_IMAGE } from '../types';

export default (state,action) => {
    switch(action.type){
        case ADD_IMAGE:
            return {...state,
                images:[action.payload,...state.images]
                }
        case SET_IMAGES:
            return {...state,
                images:action.payload
            }
        case REMOVE_IMAGE:
            return {
                ...state,
                images:state.images.filter(image => image != action.payload)
            }
        case CLEAR_IMAGES:
            return{     
            images:[]
        }
        default: return state;
    }
}