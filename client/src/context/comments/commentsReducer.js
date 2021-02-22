import { GET_COMMENTS,ADD_COMMENT,DELETE_COMMENT,UPDATE_COMMENT, CLEAR_COMMENTS} from '../types';

export default (state,action)=>{
    switch(action.type){
        case GET_COMMENTS:
            return{
                ...state,
                comments:action.payload
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments:[action.payload,...state.comments]
            }
        case UPDATE_COMMENT:
            return{
                ...state,
                comments:state.comments.map(comment => comment._id === action.payload._id ? action.payload : comment)
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments:state.comments.filter(comment => comment.id != action.payload)
            }
        case CLEAR_COMMENTS:
            return {
                ...state,
                comments:[]
            }
        default: 
            return state;
    }
}