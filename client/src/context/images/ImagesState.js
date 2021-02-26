import React,{useReducer} from 'react';
import ImagesContext from './imagesContext';
import imagesReducer from './imagesReducer';
import axios from 'axios';

import { ADD_IMAGE,CLEAR_IMAGES,SET_IMAGES,REMOVE_IMAGE} from '../types';

const ImagesState = props => {
    const initialState = {
        images:[]
    };
    const [state,dispatch] = useReducer(imagesReducer,initialState);

    // ADD IMAGE
    const addImage = async (formData) =>{
        try {
            const res = await axios.post('/api/upload',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });
            dispatch({type:ADD_IMAGE,payload:res.data.filePath});
        } catch (error) {
            console.error(error);
        }
    }
    // Clear IMAGES
    const setImages  = (images) =>{
        dispatch({type:SET_IMAGES,payload:images})
    }
    const removeImages = () =>{
        dispatch({type:CLEAR_IMAGES});
    }
    const removeImage = (image) =>{
        dispatch({type:REMOVE_IMAGE,payload:image})
    }

    return (
        <ImagesContext.Provider
        value={{
            images:state.images,
            addImage,
            removeImages,
            removeImage,
            setImages
            }}>
            {props.children}
        </ImagesContext.Provider>
    )
}
export default ImagesState