import React, { useContext, useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FileUpload from '../layout/FileUpload';
import AlertContext from '../../context/alert/alertContext';
import WorkSiteContext from '../../context/worksite/workSiteContext';
import ImagesContext from '../../context/images/imagesContext';
const WorkSiteForm = () => {
    const imagesContext = useContext(ImagesContext);
    const alertContext = useContext(AlertContext);
    const workSiteContext = useContext(WorkSiteContext);
    const { addWorkSite,clearCurrent,current,updateWorkSite } = workSiteContext;
    const { images,removeImages } = imagesContext;
    const { setAlert } = alertContext;
    const [workSite,setWorkSite] = useState({
        name:'',
        description:'',
        imagePaths:[]
    });
    const history = useHistory();
    const { name, description,imagePaths } = workSite;
    useEffect(()=>{
        if(current !==null){
            setWorkSite(current);
        }
        setWorkSite({...workSite,imagePaths:images});
    },[current,images]);
    
    const onChange  = e => {
        setWorkSite({...workSite,[e.target.name]:e.target.value});
    }
    const onCancel = () => {
        history.goBack();
    }
    const onSubmit = e => {
        e.preventDefault();
        if(name=='' && description == ''){
            setAlert("Chantier nom et chantier détails sont obligatoires.",'danger');
        }
        else if(imagePaths.length == 0){
            setAlert("Pas des images ont ete charges",'warning');
            console.log(workSite);
        }
        else if(current!=null){
            console.log(workSite);
            updateWorkSite(workSite);
            setAlert('Chantier modifié','success');
            history.goBack();
            removeImages();
        }
        else{
            setAlert('Chantier ajoutée','success');
            addWorkSite(workSite);
            history.push('/admin-panel');
            clearCurrent();
            removeImages();
        }
    }
    
    return (
        <div className="row">
            <div className="col-md-6">

                <form onSubmit={onSubmit}>
                    <h1 className="mb-4">{current==null ?  'Ajouter un chantier' : 'Modifier un chantier'}</h1>
                    <div className="form-group">
                        <label htmlFor="name">Chantier nom</label>
                        <input className="form-control" name="name" type="text" value={name} placeholder="Chantier nom..." onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Chantier détails</label>
                        <CKEditor 
                            editor={ ClassicEditor }
                            data={ current!=null && `${current.description}`}
                            
                            onChange={(event,editor)=>{
                                const data = editor.getData();
                                setWorkSite({...workSite,description:data});                                
                            }}
                            config= {{
                                toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'blockQuote', 'insertTable', 'undo', 'redo'],
                                placeholder: 'Chantier détails...'
                            }}
                        />

                    </div>
                    
                    <div>
                        <input type="submit" value={current==null ? "Ajouter" : "Modifier"} className="btn btn-primary mr-1"/>
                        { current && <button onClick={onCancel} className="btn btn-light">Anuler</button> }
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
