import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import WorkSiteContext from './../../context/worksite/workSiteContext';
import CommentsContext from './../../context/comments/commentsContext';
import AlertContext from '../../context/alert/alertContext';
const WorkSiteDetails = () => {
    const commentsContext = useContext(CommentsContext);
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const { comments,getComments, addComment,clearComments } = commentsContext;
    const workSiteContext = useContext(WorkSiteContext);
    const { clearCurrent,current } = workSiteContext;
    
    const { _id,name,description,imagePaths,date } = current;
    const history = useHistory();
    const [comment,setComment] = useState({
        name:'',
        body:'',
        workSiteId:''
    });
    
    const onChange = e => {
         setComment({...comment,[e.target.name]:e.target.value});
    }
    useEffect(()=>{
        getComments(_id);
        setComment({...comment,workSiteId:_id});
        return ()=>{
            clearCurrent();
            clearComments();
        }
    },[]);
    const onSubmit = (e) => {
        e.preventDefault();
        if(comment.name=='' || comment.body==''){
            setAlert('Tout les champs sont obligatoires.','warning')
        }else{
            
        addComment(comment);
        setComment({
            name:'',
            body:''
        })
    }
    }
    
    return (
        <div>
            <div className="card mb-5">
                <div className="card-header"> <h4> {current && name} </h4></div>
                <div className="card-body">
                    <p className="card-text">{current &&  description }</p>
                    {
                        imagePaths.map(image => (<div key={uuidv4()} className="text-center mb-4"><img src={image} alt="Chantier Image" className="img-fluid rounded" /> </div> ))
                    }
                </div>
            </div>
            {comments.length > 0 && <h5 className="mb-4">Vos commentaires</h5>}
            <div className="list-group mb-5">
                {comments.length > 0 && comments.map(comment => 
                    <div key={uuidv4()}  className="list-group-item mb-2 list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                    <p className="mb-1 font-weight-bold">{comment.name}</p>
                    <small>{ comment.date && comment.date.slice(0,10)}</small>
                    </div>
                    <em className="mb-1">{comment.body}</em>
                    </div>
                    )}
            </div>
            <form onSubmit={onSubmit}>
                    <h5 className="mb-3">Ajouter un commentaire</h5>
                    <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <input type="text" name="name" placeholder="Nom..." className="form-control" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Commentaire</label>
                        <textarea type="text" placeholder="Votre comentaire..." name="body" className="form-control" onChange={onChange}></textarea>
                    </div>
                    <input type="submit" value="Ajouter" className="btn btn-primary"/>
            </form>
        </div>
    )
}

export default WorkSiteDetails
