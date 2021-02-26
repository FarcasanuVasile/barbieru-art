import React, { useReducer } from 'react';
import axios from 'axios';
import WorkSiteContext from './workSiteContext';
import workSiteReducer from './workSiteReducer';
import { ADD_WORKSITE, GET_WORKSITES,SET_CURRENT,CLEAR_CURRENT, DELETE_WORKSITE } from '../types';

const WorkSiteState = props =>{
    const initialState = {
        workSites:[],
        current:null,
        filtered:null,
        error:null
    }
    const [state,dispatch] = useReducer(workSiteReducer,initialState);

    // Get WorkSites
    const getWorkSites = async () => {
        try {
            const res = await axios.get('/api/work-sites');
            dispatch({type:GET_WORKSITES,payload:res.data.data});
        } catch (error) {
            console.log(error.response.msg);
        }
    }
    // Get Worksite

    const getWorkSite = async id => {
        try {
            const res = await axios.get(`/api/work-sites/${id}`);
            dispatch({type:SET_CURRENT,payload:res.data});
        } catch (error) {
            console.log(error.response)
        }
    }

    // Add WorkSite
    const addWorkSite = async ws => {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        };
        try {
            const res = await axios.post('/api/work-sites',ws,config);
            dispatch({type:ADD_WORKSITE,payload:res.data.data});
        } catch (error) {
            console.log(error.response.msg);
        }
    }
    
    // Delete WorkSite
    const deleteWorkSite = async id =>{
        try {
            await axios.delete(`/api/work-sites/${id}`);
            dispatch({type:DELETE_WORKSITE,payload:id})
        } catch (error) {
            console.log(error.response.msg);
        }
    }
    // Edit WorkSite
    const updateWorkSite = async workSite =>{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const res = axios.put(`/api/work-sites/${workSite._id}`,workSite,config);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    // Set Current
    const setCurrent = workSite =>{
        dispatch({type:SET_CURRENT,payload:workSite})
    }
    // Clear Current
    const clearCurrent = () =>{
        
        dispatch({type:CLEAR_CURRENT})
    }
    return (
        <WorkSiteContext.Provider 
            value={{
                workSites:state.workSites,
                current:state.current,
                filtered:state.filtered,
                error:state.error,
                getWorkSites,
                getWorkSite,
                addWorkSite,
                updateWorkSite,
                deleteWorkSite,
                setCurrent,
                clearCurrent
            }}
        >
            {props.children}
        </WorkSiteContext.Provider>
    )
}
export default WorkSiteState