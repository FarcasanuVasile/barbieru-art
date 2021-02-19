import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import  {useHistory} from 'react-router-dom';
import MessageContext from '../../context/message/messageContext';
import AlertContext from '../../context/alert/alertContext';
const MessageItem = ( msg ) =>{
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const {_id,name, email , body , phone,date } = msg.message;
    const messageContext = useContext(MessageContext);
    const history = useHistory();
    const { deleteMessage, setCurrentMessage,clearCurrentMessage } = messageContext;
    const onDelete = () =>{
        if(window.confirm('Vous êtes sûr?')){
        clearCurrentMessage();
        setAlert('Message supprimé!','warning')
        deleteMessage(_id);
    }
    }
    const onEdit = () =>{
        setCurrentMessage(msg.message);
        history.push('/admin-panel/messages/edit');
    }
    return(
        <div className="col-md-6">
        <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
            <h5> { name } </h5>
            <div className="right-content">
                <span className="font-italic mr-2"> { date && date.toString().slice(0,10) } </span>
            <span onClick={onEdit} className="edit-button mr-2">
                <i className="fas fa-edit"></i>
            </span>
            <span onClick={onDelete} className="delete-button">
                <i className="fa fa-trash"></i>
            </span>
            </div>
            </div>
            <div className="card-body">
                <p className="card-text"> { body } </p>
            </div>
            <div className="card-bottom d-flex flex-wrap justify-content-between align-items-center px-4 py-2 bg-light">
                <div> <i className="fas fa-envelope-open"></i> { email } </div>
                <div> <i className="fas fa-phone"></i> { phone } </div>
            </div>
        </div>
        </div>
    )
}

export default MessageItem;