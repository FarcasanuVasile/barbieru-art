import React, {useReducer} from 'react';
import axios from 'axios';
import MessageContext from './messageContext';
import messageReducer from './messageReducer';
import { 
    ADD_MESSAGE,
    DELETE_MESSAGE,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_MESSAGE,
    CLEAR_FILTER,
    FILTER_MESSAGES,
    MESSAGE_ERROR,
    GET_MESSAGES,
    CLEAR_MESSAGES,
    LOGOUT    
} from '../types';

const MessageState = props => {
    const initialState = {
        messages:[],
        current:null,
        filtered:null,
        error:null
    }
    const [state,dispatch] = useReducer(messageReducer,initialState);
    // Get Messages
    const getMessages = async () => {
        try {
            const res = await axios.get('/api/messages');
            dispatch({type:GET_MESSAGES,payload:res.data.data});
        } catch (error) {            
            dispatch({type:MESSAGE_ERROR,payload:error.response.msg});
            dispatch({type:LOGOUT});
        }
    }
    // Add Message 
    const addMessage = async msg => {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        };
        try {
            const res = await axios.post('/api/messages',msg,config);
            
            dispatch({ type: ADD_MESSAGE,payload:res.data });
        } catch (error) {
            dispatch({type:MESSAGE_ERROR,payload:error.response.msg})
        }
    }
    // Delete Message 
    const deleteMessage = async id => {
        try {
            await axios.delete(`/api/messages/${id}`);
            dispatch({type: DELETE_MESSAGE,payload:id})
        } catch (error) {
            dispatch({type:MESSAGE_ERROR,payload:error.response.msg})
        }
    }
    // Set current
    const setCurrentMessage = msg => {
        dispatch({type: SET_CURRENT,payload:msg})
    }
    // Clear current
    const clearCurrentMessage = () => {
        dispatch({type:CLEAR_CURRENT})
    }
    // Update message
    const updateMessage = async msg =>{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        };
        try {
            const res = await axios.put(`/api/messages/${msg._id}`,msg,config);
            dispatch({type:UPDATE_MESSAGE,payload:res.data.data});
        } catch (error) {
            dispatch({type:MESSAGE_ERROR,payload:error.response.msg});
        }
        
    }
    // Filter messages
    const filterMessages = text =>{
        dispatch({type:FILTER_MESSAGES,payload:text});
    }
    // Clear Filter
    const clearFilter = () =>{
        dispatch({type:CLEAR_FILTER});
    }
    const clearMessages = () =>{
        dispatch({type:CLEAR_MESSAGES})
    }
    return (
        <MessageContext.Provider
            value={{
                messages:state.messages,
                current:state.current,
                filtered:state.filtered,
                error:state.error,
                getMessages,
                addMessage,
                deleteMessage,
                setCurrentMessage,
                clearCurrentMessage,
                updateMessage,
                filterMessages,
                clearFilter,
                clearMessages
            }}
        >
            {props.children}
        </MessageContext.Provider>
    )
}
export default MessageState;