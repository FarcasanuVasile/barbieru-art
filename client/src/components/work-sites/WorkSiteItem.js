import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import WorkSiteContext from '../../context/worksite/workSiteContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
const WorkSiteItem = ({workSite}) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const workSiteContext = useContext(WorkSiteContext);
    const { setAlert } = alertContext;
    const { isAuthenticated } = authContext;
    const { deleteWorkSite } = workSiteContext;
    const { _id,name,description,date } = workSite;

  
    const onDelete = (e) =>{
        if(window.confirm('Vous etes sur?')){
            e.preventDefault();
            deleteWorkSite(_id);
            setAlert('Chantier supprimé!','warning')
        }
    }
    
    return (

        <div>    
    <Link to={`/chantier/${_id}`} className="list-group-item mb-2 list-group-item-action flex-column align-items-start">
    
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">{name}</h5>
      <div>
      <small>{date.slice(0,10)}</small>
      { isAuthenticated && <span  className="ml-1  delete-button" onClick={onDelete}>
                            <i className="fa fa-trash"></i>
        </span>}
      </div>
    </div>
    <div className="mb-1" dangerouslySetInnerHTML={{__html:description}}></div>
    
    </Link>
        </div>
        
    )
}

export default WorkSiteItem
