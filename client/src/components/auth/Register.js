import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
const Register = () => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { register,error ,clearErrors,isAuthenticated} = authContext;
    const { setAlert } = alertContext;
    const history = useHistory();
    useEffect(() => {
        if(isAuthenticated){
            history.push('/');
        }
        if(error==='User already exists'){
            setAlert('Cette adresse e-mail est déjà utilisée','warning');
            clearErrors();
        }
    },[error,isAuthenticated])

    const [user,setUser] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });
    const { name, email, password,password2} = user;
    const onChange = e =>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const onSubmit = e =>{
        e.preventDefault();
        if(name==='' || email ==='' || password ===''){
            setAlert('Tous les champs sont obligatoires','danger');
        }
        if(password !== password2){
            setAlert("Les mots de passe ne sont pas identiques",'danger');
        }else{
            register(user);
            
        }
    }
    return (
        <div className="row">
        <div className="col-md-6 ">
            <h1>Créer un compte</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group"> <label htmlFor="name">Nom</label> <input type="text" name="name" className="form-control" placeholder="Nom" value={name} onChange={onChange} /> </div>
                <div className="form-group"> <label htmlFor="email">Email</label> <input type="email" name="email" className="form-control" placeholder="Email" value={email} onChange={onChange} /> </div>
                <div className="form-group"> <label htmlFor="password">Mot de passe</label> <input type="password" minLength="6" name="password" className="form-control" placeholder="Mot de passe" value={password} onChange={onChange} /> </div>
                <div className="form-group"> <label htmlFor="password2">Confirmation du mot de passe</label> <input type="password" minLength="6" placeholder="Confirmation mot de passe" className="form-control" name="password2" value={password2} onChange={onChange} /> </div>
                <input className="btn btn-primary" type="submit" value="S'Inscrire"/>
            </form>
        </div>
        </div>
    )
}
export default Register