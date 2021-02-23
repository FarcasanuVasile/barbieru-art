import React, { Fragment } from 'react'
import CommentItem from './CommentItem'

const Comments = ({comments}) => {
    return (
        <Fragment>
            { comments.map(comment => <CommentItem key={comment._id} comment={comment} />) }
        </Fragment>
    )
}

export default Comments
