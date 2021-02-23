import React, { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import WorkSiteContext from './../../context/worksite/workSiteContext';
import CommentsContext from './../../context/comments/commentsContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Comments from '../comments/Comments';
import { useHistory, useLocation } from 'react-router-dom';
const WorkSiteDetails = () => {
    const location = useLocation();
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const commentsContext = useContext(CommentsContext);
    const alertContext = useContext(AlertContext);
    const workSiteContext = useContext(WorkSiteContext);
    const { setAlert } = alertContext;
    const { isAuthenticated } = authContext;
    const { comments,getComments, addComment,clearComments } = commentsContext;
    const { clearCurrent,current,deleteWorkSite } = workSiteContext;
    
    const { _id,name,description,imagePaths } = current;
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
            console.log(location);
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
    }
    
    setComment({
        ...comment,
        name:'',
        body:''
    })
    }
    const onEdit = () => {
        history.push(`/chantier/${_id}/modifier`);
    }
    const onDelete = () =>{
        if(window.confirm('Vous etes sur?')){
            deleteWorkSite(_id);
            history.push('/chantiers');
            setAlert('Chantier supprimé!','warning')
        }
    }
    return (
        <div>
            <div className="card mb-5">
                <div className="card-header d-flex justify-content-between"> <h4 className="mb-0"> {current && name} </h4> 
                        <div>
                        { isAuthenticated && <span  className="ml-1  delete-button" onClick={onEdit}>
                            <i className="fas fa-edit"></i>
                        </span>}
                        { isAuthenticated && <span  className="ml-1  delete-button" onClick={onDelete}>
                            <i className="fa fa-trash"></i>
                        </span>}
                        </div>
                </div>
                <div className="card-body">
                {current && <div className="card-text" dangerouslySetInnerHTML={{__html:description}}></div>}
                    {
                        imagePaths.map(image => (<div key={uuidv4()} className="text-center mb-4"><img src={image} alt="Chantier Image" className="img-fluid rounded" /> </div> ))
                    }
                </div>
            </div>
            {comments.length > 0 && <h5 className="mb-4">Vos commentaires</h5>}
            <div className="list-group mb-5">
                <Comments comments={comments}/>
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
