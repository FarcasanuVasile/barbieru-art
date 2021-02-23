import React, { Fragment, useContext } from 'react'
import CommentsContext from '../../context/comments/commentsContext';
import AuthContext from '../../context/auth/authContext';
const CommentItem = ({ comment }) => {
    const authContext = useContext(AuthContext);
    const commentsContext = useContext(CommentsContext);
    const { isAuthenticated } = authContext;
    const { deleteComment } = commentsContext;
    const { _id, name, body , date } = comment;
    const onDelete = () =>{
        if(window.confirm('Vous etes sur?')){
            deleteComment(_id);
        }
    }
    return (
        <Fragment>
            <div className="list-group-item mb-2 list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                    <p className="mb-1 font-weight-bold">{name}</p>
                        <small>{ date && date.slice(0,10)} 
                        { isAuthenticated && <span  className="ml-1  delete-button" onClick={onDelete}>
                                <i className="fa fa-trash"></i>
                            </span>}
                        </small>
                        </div>
                        <em className="mb-1">{body}</em>
                    </div>
        </Fragment>
    )
}

export default CommentItem
