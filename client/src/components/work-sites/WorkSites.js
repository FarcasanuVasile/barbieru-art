import React, { useContext, useEffect } from 'react'
import WorkSiteContext from '../../context/worksite/workSiteContext';
import WorkSiteItem from './WorkSiteItem';
const WorkSites = () => {
    const workSiteContext = useContext(WorkSiteContext);
    const { getWorkSites,workSites } = workSiteContext;
    useEffect(()=>{
        getWorkSites();
    },[]);
    
    if(workSites && workSites.length == 0){
        return(
            <div>
                <h2 className="mb-4 ">Les chantiers</h2>
                <h5>Il n'y a pas de chantiers ajoutee.</h5>
            </div>
        )
    }
    return (
        <div>
            <div className="list-group">
                <h2 className="mb-4">Les chantiers</h2>
                { workSites && workSites.map(workSite=> <WorkSiteItem key={workSite._id}  workSite={workSite} />) }
            </div>
        </div>
    )
}
export default WorkSites
