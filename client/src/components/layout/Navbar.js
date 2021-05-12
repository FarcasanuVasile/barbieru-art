import React, { Fragment,useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import MessageContext from '../../context/message/messageContext'
const Navbar = () => {
    const authContext = useContext(AuthContext);
    const [collapse,setCollapse]= useState(false);
    const messageContext = useContext(MessageContext);
    const { clearMessages } = messageContext;
    const { user,isAuthenticated,logout } = authContext;
    const onLogout = () => {
      logout();
      clearMessages();
    }
    const onClose = (e) =>{
      if(e.currentTarget.classList.contains('show')){
        e.currentTarget.classList.remove('show');
      }
    }
    const authLinks = (
      <Fragment>
        <li className="nav-item"><span className="nav-link">
          Salut {user && user.name}
          </span>
        </li>
        <li className="nav-item ">
                <Link className="nav-link" to="/">Accueil</Link>
            </li>
        <li className="nav-item">
                <Link className="nav-link" to="/chantiers">Chantiers</Link>
        </li>
            <li className="nav-item">
                <Link className="nav-link" to="/admin-panel/messages">Messages</Link>
        </li>
        <li className="nav-item">
                <Link className="nav-link" to="/contact">Contacter Nous</Link>
        </li>
        <li className="nav-item">
                <Link className="nav-link" to="/admin-panel">Admin</Link>
        </li>
        <li className="nav-item" onClick={onLogout}> <a className="nav-link" href="#!"><i className="fas fa-sign-out-alt mr-1"></i><span className="d-none d-sm-inline">Déconnection</span></a> </li>
        
      </Fragment>
    );
    const guestLinks = (
      <Fragment>
            <li className="nav-item ">
                <Link className="nav-link" to="/">Accueil</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/contact">Contacter Nous</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/chantiers">Chantiers</Link>
            </li>
      </Fragment>
    )
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <Link to="/" className="navbar-brand" ><h1>BARBIERU ART</h1></Link>
        <button  className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div onClick={onClose} className="collapse navbar-collapse flex-grow-0" id="navbarNavDropdown">
          <ul className="navbar-nav">
              { isAuthenticated ? authLinks : guestLinks}   
              
          </ul>
        </div>
      </nav>
    )
}



export default Navbar