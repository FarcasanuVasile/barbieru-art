import { ADD_MESSAGE,DELETE_MESSAGE,SET_CURRENT,CLEAR_CURRENT ,UPDATE_MESSAGE,FILTER_MESSAGES,CLEAR_FILTER,MESSAGE_ERROR,CLEAR_ERROR, GET_MESSAGES, CLEAR_MESSAGES} from '../types'; 

export default (state,action)=>{
    switch(action.type){
        case GET_MESSAGES:
            return {
                ...state,
                messages:action.payload,
                loading:false
            }
        case ADD_MESSAGE : 
            return {
                ...state,
                messages:[action.payload,...state.messages],
                loading:false,
            }
        case UPDATE_MESSAGE:
            return{
                ...state,
                messages:state.messages.map(message =>  message._id === action.payload._id ?  action.payload : message ),
                loading:false
            }
        case DELETE_MESSAGE : 
            return {
                ...state,
                messages:state.messages.filter( message => message._id != action.payload ),
                loading:false
            }
        case CLEAR_MESSAGES:
            return{
                ...state,
                messages:null,
                filtered:null,
                error:null,
                current:null
            }
        case SET_CURRENT: 
            return{
                ...state,
                current:action.payload
            }
        case CLEAR_CURRENT:
            return{
                ...state,
                current:null
            }
        case MESSAGE_ERROR:
            return{
                ...state,
                error:action.payload
            }
            case CLEAR_ERROR:
                return{
                    ...state,
                    error:null
                }
        case FILTER_MESSAGES:
            return {
                ...state,
                filtered:state.messages.filter(message => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return message.name.match(regex) || message.email.match(regex);
                })
            }
            case CLEAR_FILTER:
                return{
                    ...state,
                    filtered:null
                }
            
        default:
            return state;
    }
}