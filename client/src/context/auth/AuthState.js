import React , { useReducer } from 'react';
import authReducer from './authReducer';
import AuthContext from './authContext';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthoken';
import {
    REGISTER_FAIL,REGISTER_SUCCESS,USER_LOADED,AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT,CLEAR_ERRORS
} from '../types';

const AuthState = props => {
    const initialState = {
        user:null,
        token:localStorage.getItem('token'),
        isAuthenticated:null,
        loading:true,
        error:null
    }
    const [state,dispatch] = useReducer(authReducer,initialState);
    // Load User
    const loadUser = async () =>{
        // @todo - load token into global headers
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        try {
            const res = await axios.get('/api/auth');
            dispatch({type:USER_LOADED,payload:res.data});
        } catch (err) {
            dispatch({type:AUTH_ERROR})
        }
    }
    // Register User
    const register = async formData => {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const response = await axios.post('/api/users',formData,config);
            dispatch({type:REGISTER_SUCCESS,payload:response.data});
            loadUser();
        } catch (err) {
            dispatch({type:REGISTER_FAIL,payload:err.response.data.msg})
        }
    }
    // Login User
    const login = async formData =>{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const response = await axios.post('/api/auth',formData,config);
            dispatch({type:LOGIN_SUCCESS,payload:response.data});
            loadUser();
        } catch (err) {
        
            dispatch({type:LOGIN_FAIL,payload:err.response.data.msg})
        }
    }
    // Logout User
    const logout = () => {
        dispatch({type:LOGOUT})
    }
    // Clear Errors
    const clearErrors = () => {
        dispatch({type:CLEAR_ERRORS})
    }

    return <AuthContext.Provider
        value={{
            token:state.token,
            user:state.user,
            isAuthenticated:state.isAuthenticated,
            loading:state.loading,
            error:state.error,
            register,
            clearErrors,
            loadUser,
            login,
            logout
        }}
    >
        {props.children}
    </AuthContext.Provider>


}
export default AuthState;