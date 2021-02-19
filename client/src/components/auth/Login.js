import React, { useState,useContext,useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { useHistory } from 'react-router-dom';
const Login = () => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const history = useHistory();
    const { login ,error, isAuthenticated} = authContext;
    const { setAlert } = alertContext;
    const [user,setUser] = useState({
        email:'',
        password:''
    });
    const {  email, password} = user;
    useEffect(()=>{
        if(isAuthenticated){
            history.push('/');
        }
        if(error=="Invalid Credentials"){
            setAlert('L’adresse mail ou le mot de passe ne correspondent pas.','danger')
        }
    },[error,isAuthenticated]);
    const onChange = e =>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const onSubmit = e =>{
        e.preventDefault();
        if( email==='' || password===''){
            setAlert('Tous les champs sont obligatoires','warning');
        }else{
            login({email,password});
        }
        
    }
    return (
        <div className="row">
        <div className="col-md-6 ">
            <h1>Connectez-vous.</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group"> <label htmlFor="email">Email</label> <input type="email" name="email" placeholder="Email" className="form-control" value={email} onChange={onChange} /> </div>
                <div className="form-group"> <label htmlFor="password">Mot de passe</label> <input type="password" placeholder="Mot de passe" name="password" className="form-control" value={password} onChange={onChange} /> </div>
                <input className="btn btn-primary" type="submit" value="S'Inscrire"/>
            </form>
        </div>
        </div>
    )
}
export default Login