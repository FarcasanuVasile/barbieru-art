import React, { useContext, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';


import AuthContext from '../../context/auth/authContext';
import AdminPanel from '../admin/AdminPanel';
import Messages from '../messages/Messages';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Contact from '../pages/Contact';
import Home from '../pages/Home';
import PrivateRoute from '../routing/PrivateRoute';

export const Routes = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;
    useEffect(()=>{
        loadUser();
    },[])
    return (
        <div>
            <Switch>
                <Route exact path="/creer-un-compte" component={Register}/>
                <Route exact path="/connexion/" component={Login}/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/contact" component={Contact}/>
                <Route exact path="/admin-panel/messages/edit" component={Contact}/>
                <PrivateRoute exact path="/admin-panel/messages" component={Messages}/>
                <PrivateRoute exact path="/admin-panel" component={AdminPanel}/>
                
            </Switch> 
        </div>
    )
}
