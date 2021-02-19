import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import MessageContext from '../../context/message/messageContext';
const AdminPanel = () =>{
    const authContext = useContext(AuthContext);
    const messageContext = useContext(MessageContext);
    const { user} = authContext;
    const { messages} = messageContext;
    
    
    return <div>
        <div className="row">
            <div className="col-md-12">
                <p className="display-4 pb-4 d-block border-bottom">Salut {user.name}</p>
                <p>Vous avez reçu {messages && messages.length} messages.</p>
                <p>Dernier message:</p>
                <div className="card mb-2">
                    <h5 className="card-title pb-0 pt-4 px-4 ">{messages[0].name}</h5>
                <div className="card-body">
                    {messages[0].body.slice(1,30) + '...'}
                    </div>
                </div>
                <Link to='/admin-panel/messages'>Voir tout les messages</Link>
            </div>

        </div>
    </div>
}
export default AdminPanel