import React, { useContext, useRef,useEffect } from 'react';
import MessageContext from '../../context/message/messageContext';

const MessageFilter = () =>{
    const messageContext = useContext(MessageContext);
    const { filtered,clearFilter , filterMessages } = messageContext;
    const text = useRef('');
    useEffect(()=>{
        if(filtered === null){
            text.current.value ='';
        }
    })
    const onChange = e =>{
        if(text.current.value ===''){
            clearFilter();
        }else{
            filterMessages(e.target.value);
        }
    }
    const onSubmit = e => {
        e.preventDefault();
    }   
    return (
        <form onSubmit={onSubmit}>
            <input ref={text} type="text" className="form-control rounded-pill px-4" onChange={onChange} placeholder="Recherce..."/>
        </form>
    )
}
export default MessageFilter