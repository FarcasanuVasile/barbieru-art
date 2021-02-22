import React,{ Fragment,useState,useContext } from 'react';
import {v4 as uuidv4 } from 'uuid';
import ImagesContext from '../../context/images/imagesContext';
import AlertContext from '../../context/alert/alertContext';

const FileUpload = () => {
    const imagesContext = useContext(ImagesContext);
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const { addImage,images } = imagesContext;
   
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
                <div className="mb-1 custom-file">
                    <input type="file" className="custom-file-input" id='customFile' onChange={onChange}/>
                    <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
                </div>
                <input className="mt-1" type="submit" value="Charger"/>
            </form>
            <div>
                { images.length >= 1 && <p>Les photos</p>  }
                { images.length >= 1 && images.map(img => <img key={uuidv4()} src={img} className="w-25 mr-1" /> )}
            </div>
        </Fragment>
    )
}

export default FileUpload
