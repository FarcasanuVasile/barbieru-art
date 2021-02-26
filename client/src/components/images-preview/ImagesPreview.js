import React, { useContext } from 'react'
import ImagesContext from '../../context/images/imagesContext';
import ImagePreview from './ImagePreview';
import {v4 as uuidv4 } from 'uuid';
const ImagesPreview = () => {
    const imagesContext = useContext(ImagesContext);
    const { images } = imagesContext;
    if(images.length == 0)
    return <p>Aucune image n'a été téléchargée</p> 
    return (
        <div className="d-flex flex-wrap">
            { images && images.map(image => <ImagePreview key={uuidv4()}  image={image} />) }
        </div>
    )
}

export default ImagesPreview
