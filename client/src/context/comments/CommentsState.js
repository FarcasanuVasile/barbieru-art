import React, { useReducer } from 'react';
import commentsReducer from './commentsReducer';
import CommentsContext from './commentsContext';
import axios from 'axios';

import { GET_COMMENTS,ADD_COMMENT,DELETE_COMMENT,UPDATE_COMMENT,CLEAR_COMMENTS} from '../types';

const CommentsState = props =>{
    const initialState = {
        comments:[],
        current:null,
        error:null
    }
    const [state,dispatch] = useReducer(commentsReducer,initialState);
    // Get Comments
    const getComments = async (id) =>{
        try {
            const res = await axios.get('/api/worksite-comments');
            const comments = res.data.data.filter(comment => comment.workSiteId == id);
            dispatch({type:GET_COMMENTS,payload:comments});
        } catch (error) {
            console.log(error);
        }
    }
    // Add Comment
    const addComment = async comment =>{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        };
        try {
            const res = await axios.post('/api/worksite-comments',comment,config);
        
            dispatch({type:ADD_COMMENT,payload:res.data.data}) ;
        } catch (error) {
            console.log(error);
        }
    }
    // Update Comment
    const updateComment = () =>{
        // Comments will be not updated
    }
    // Delete Comment
    const deleteComment = async (id) => {
        try {
            await axios.delete(`/api/worksite-comments/${id}`)
            dispatch({type:DELETE_COMMENT,payload:id});
        } catch (error) {
            console.log(error);
        }
    }
    const clearComments = () =>{
        dispatch({type:CLEAR_COMMENTS})
    }
    return(
        <CommentsContext.Provider
        value={{
            comments:state.comments,
            current:state.current,
            error:state.error,
            getComments,
            addComment,
            updateComment,
            deleteComment,
            clearComments
        }}>
            {props.children}
        </CommentsContext.Provider>
    )
}
export default CommentsState