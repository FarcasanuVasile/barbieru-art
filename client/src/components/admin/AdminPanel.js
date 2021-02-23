import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import MessageContext from '../../context/message/messageContext';
const AdminPanel = () =>{
    const authContext = useContext(AuthContext);
    const messageContext = useContext(MessageContext);
    const { user} = authContext;
    const { getMessages,messages} = messageContext;
    
    useEffect(()=>{
        getMessages();
    },[getMessages]);
    
    return <div>
        <div className="row">
            <div className="col-md-12">
            <p className="display-4 pb-4 d-block">Bon jour {user && user.name}</p>
            </div>
        </div>
        <div className="row">
            <div className="col-md-8 p-0">
                
                <div className="border">
                <h4 className="px-3 py-2 mb-0"><i className="fas fa-envelope"></i> Messages</h4>
                    <div className="border-top px-3">
                        <p className="mt-1">Vous avez reçu <b>{messages && messages.length}</b> messages.</p>
                    </div>
                    {messages && ( <div className="bg-light "> <div className="px-3"> <p>Dernier message:</p> 
                
                    <span><i className="fa fa-user"></i> { messages.length > 0 && messages[0].name}</span>
                    <div>
                        <i className="fas fa-at"></i> { messages.length > 0 && messages[0].email}
                    </div>
                    <div className="text-justify">
                    <i className="far fa-sticky-note"></i> { messages.length > 0 && messages[0].body}
                    </div>
                    </div>                
                </div>
                    )}
                </div>
                
                
                
            </div>
            <div className="col-md-4">
            <div className="border p-3">
                <h4><i className="fas fa-link"></i> Liens</h4>
                    <div className="border-top py-2">
                        <Link to='/admin-panel/messages'>Voir tout les messages</Link>
                        <br />
                        <Link to='/chantiers/ajouter-un-chantier'>Ajouter un Chantier</Link>
                    </div>
                </div>
            
                
            </div>


        </div>
    </div>
}
export default AdminPanel