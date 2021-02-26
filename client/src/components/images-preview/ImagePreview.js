import React, { Fragment, useContext } from 'react'
import ImagesContext from '../../context/images/imagesContext';
const ImagePreview = ({image}) => {
    const imagesContext = useContext(ImagesContext);
    const { removeImage } = imagesContext;
    
    const onRemove =  () =>{
        removeImage(image);
    }   
    return (
        <Fragment>
            <div className="position-relative w-25 pr-1">
                        <img  className="img-fluid" src={image}  alt="Photo"/> 
                        <span onClick={onRemove} className="px-1 position-absolute rounded-circle bg-light text-dark" 
                        style={{fontWeight:'bold',cursor:'pointer',right:'6px',top:'1px',height:'15px',lineHeight:"11px"}}>x</span>
                    </div>
        </Fragment>
    )
}

export default ImagePreview
