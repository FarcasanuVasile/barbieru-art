import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MessageContext from '../../context/message/messageContext';
import AlertContext from '../../context/alert/alertContext';
const Contact = () => {
    const messageContext = useContext(MessageContext);
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const history = useHistory();
    const { addMessage,current,clearCurrentMessage,updateMessage } = messageContext;
    useEffect(()=>{
        if(current!==null){
            setMessage(current);
        }else{
            setMessage({
                name:'',
                email:'',
                phone:'',
                body:''
            });
        }
    },[messageContext,current])
    const [message, setMessage ] = useState({
        name:'',
        email:'',
        phone:'',
        body:''
    });

    const { name, email, phone, body} = message;
    const onChange = e => setMessage({ ...message, [e.target.name]:e.target.value  });
    const onSubmit = e => {
        e.preventDefault();
        if(current === null){
            addMessage(message);
            setAlert('Message envoyé!','success');
        }else{
            updateMessage(message);
            setAlert('Message modifié!','success');
            history.push('/admin-panel/messages');
            onClearCurrent();
        }
        
        setMessage({
            name:'',
            email:'',
            phone:'',
            body:''
        });
    }
    const onClearCurrent = () =>{
        if(current){
            history.push('/admin-panel/messages');
        }
        clearCurrentMessage();
    }
    return (
        <div className="row">
            <div className="col-md-6">
                <form onSubmit={onSubmit}>
                    <h1 className="mb-4">{ current===null ? 'Envoyez-nous un message' : 'Modifier le message'}</h1>
                    <div className="form-group"> 
                    <label htmlFor="msgName">Nom</label> 
                    <input className="form-control" id="msgName" type="text" name="name" placeholder="Nom" value={name} onChange={onChange}/>
                    </div>
                    <div className="form-group"> 
                    <label htmlFor="msgEmail">Email</label> 
                    <input className="form-control" id="msgEmail" type="email" name="email" placeholder="Email" value={email} onChange={onChange}/> 
                    </div>
                    <div className="form-group">
                    <label htmlFor="msgPhone">Téléphone</label> 
                    <input className="form-control" id="msgPhone" type="text" name="phone" placeholder="Téléphone" value={phone} onChange={onChange}/> 
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="msgBody">Votre Message</label>
                    <textarea className="form-control" id="msgBody" type="text" name="body" placeholder="Message" value={body} onChange={onChange}/> 
                    </div>
                    <div>
                        <input  type="submit" value={current === null ? "Envoyer" : "Modifier"} className="btn btn-primary" />
                        { current && <button className="btn btn-light ml-2" onClick={onClearCurrent}>Anuler</button> }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact;