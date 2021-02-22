import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import WorkSiteContext from '../../context/worksite/workSiteContext';
const WorkSiteItem = (props) => {
    const workSiteContext = useContext(WorkSiteContext);
    const { setCurrent } = workSiteContext;
    const { _id,name,description,date } = props.workSite;

    const onSetCurrent = () =>{
        setCurrent(props.workSite);
    }
    return (

        <div>    
    <Link to={`/chantier/${_id}`} onClick={onSetCurrent} className="list-group-item mb-2 list-group-item-action flex-column align-items-start">
    
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">{name}</h5>
      <small>{date.slice(0,10)}</small>
    </div>
    <p className="mb-1">{description}</p>
    
    </Link>
        </div>
        
    )
}

export default WorkSiteItem
