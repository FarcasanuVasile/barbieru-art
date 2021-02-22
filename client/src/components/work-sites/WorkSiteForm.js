import React, { useContext, useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FileUpload from '../layout/FileUpload';
import AlertContext from '../../context/alert/alertContext';
import WorkSiteContext from '../../context/worksite/workSiteContext';
import ImagesContext from '../../context/images/imagesContext';
const WorkSiteForm = () => {
    const imagesContext = useContext(ImagesContext);
    const alertContext = useContext(AlertContext);
    const workSiteContext = useContext(WorkSiteContext);
    const { images } = imagesContext;
    const { addWorkSite } = workSiteContext;
    const { setAlert } = alertContext;
    const [workSite,setWorkSite] = useState({
        name:'',
        description:'',
        imagePaths:[]
    });
    const history = useHistory();
    const { name, description,imagePaths } = workSite;
    useEffect(()=>{
      setWorkSite({...workSite,imagePaths:images}); 
    },[images]);
    
    const onChange  = e => {
        setWorkSite({...workSite,[e.target.name]:e.target.value});
    }
    const onSubmit = e => {
        e.preventDefault();
        if(name=='' && description == ''){
            setAlert("Chantier nom et chantier détails sont obligatoires.",'danger');
        }
        else if(imagePaths.length == 0){
            setAlert("Pas des images ont ete charges",'warning')
        }
        else{
            setAlert('Chantier ajoutée','success');
            addWorkSite(workSite);
            history.push('/admin-panel');
        }
    }
    
    return (
        <div className="row">
            <div className="col-md-6">

                <form onSubmit={onSubmit}>
                    <h1 className="mb-4">Ajouter un chantier</h1>
                    <div className="form-group">
                        <label htmlFor="name">Chantier nom</label>
                        <input className="form-control" name="name" type="text" value={name} placeholder="Chantier nom..." onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Chantier détails</label>
                        <textarea className="form-control" name="description" type="text" value={description} placeholder="Chantier détails..." onChange={onChange} ></textarea>
                    </div>
                    
                    <div>
                        <input type="submit" value="Ajouter" className="btn btn-primary"/>
                    </div>
                    
                </form>
                
            </div>
            <div className="col-md-6">
                <FileUpload />
            </div>
        </div>
    )
    }
export default WorkSiteForm
