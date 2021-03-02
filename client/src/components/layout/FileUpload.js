import React,{ Fragment,useState,useContext, useEffect } from 'react';
import ImagesContext from '../../context/images/imagesContext';
import AlertContext from '../../context/alert/alertContext';
import WorkSiteContext from '../../context/worksite/workSiteContext';
import ImagesPreview from '../images-preview/ImagesPreview';

const FileUpload = () => {
    const imagesContext = useContext(ImagesContext);
    const alertContext = useContext(AlertContext);
    const workSiteContext = useContext(WorkSiteContext);
    const { current } = workSiteContext;
    const { setAlert } = alertContext;
    const { setImages,addImage } = imagesContext;
    
    useEffect(()=>{
        if(current !== null){
            setImages(current.imagePaths);
        }
    },[current])

    const [fileName,setFileName]=useState('Choisir Photo');
    const [file,setFile]=useState('');
    const onSubmit = e =>{
        e.preventDefault();
        if(file===''){
            setAlert('Aucune photo sélectionnée!','warning');
        }else{
            const formData = new FormData();
            formData.append('file',file);
            addImage(formData);
            setFile('');
            setFileName('Choisir Photo');
        }
    }
    
    const onChange = e =>{
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }
    return (
        <Fragment>
            <form onSubmit={onSubmit} className="mb-4">
                <h3 className="my-4">Ajouter des photos</h3>
                    <label htmlFor="customFile" className="mb-0">Photo</label>
                <div className="mb-1 custom-file">
                    <input type="file" className="custom-file-input" id='customFile' onChange={onChange}/>
                    <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
                </div>
                <input className="mt-1" type="submit" value="Charger"/>
            </form>
            <div className="images-preview-container">
                <ImagesPreview />
            </div>
        </Fragment>
    )
}

export default FileUpload
