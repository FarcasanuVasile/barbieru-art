import React,{useReducer} from 'react';
import ImagesContext from './imagesContext';
import imagesReducer from './imagesReducer';
import axios from 'axios';

import { ADD_IMAGE,CLEAR_IMAGES} from '../types';

const ImagesState = props => {
    const initialState = [];
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
    
    const removeImages = () =>{
        dispatch({type:CLEAR_IMAGES});
    }

    return (
        <ImagesContext.Provider
        value={{
            images:state,
            addImage,
            removeImages
            }}>
            {props.children}
        </ImagesContext.Provider>
    )
}
export default ImagesState