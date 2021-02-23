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
import WorkSiteForm from '../work-sites/WorkSiteForm';
import WorkSites from '../work-sites/WorkSites';
import WorkSiteDetails from '../work-sites/WorkSiteDetails';

export const Routes = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;
    useEffect(()=>{
        loadUser();
    },[])
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/connexion/" component={Login}/>
                <Route exact path="/creer-un-compte" component={Register}/>
                <Route exact path="/contact" component={Contact}/>
                <Route exact path="/admin-panel/messages/edit" component={Contact}/>
                <Route exact path="/chantiers" component={WorkSites}/>
                <Route exact path="/chantier/:id" component={WorkSiteDetails}/>
                <PrivateRoute exact path="/chantier/:id/modifier" component={WorkSiteForm}/>
                <PrivateRoute exact path="/chantiers/ajouter-un-chantier" component={WorkSiteForm}/>
                <PrivateRoute exact path="/admin-panel/messages" component={Messages}/>
                <PrivateRoute exact path="/admin-panel" component={AdminPanel}/>
                
            </Switch> 
        </div>
    )
}
