import React, { useContext, useEffect } from "react";
import MessageContext from "../../context/message/messageContext";
import MessageFilter from "./MessageFilter";
import MessageItem from "./MessageItem";

const Messages = () => {
  const messageContext = useContext(MessageContext);
  const { getMessages, loading, messages, filtered } = messageContext;
  useEffect(() => {
    getMessages();
  }, []);
  if (messages !== null && messages.length === 0 && !loading) {
    return (
      <div>
        <h2 className="mb-4">Votre messages</h2>
        <h5>Il n'y a pas de messages.</h5>
      </div>
    );
  }

  return (
    <div className="row">
      <h2 className="px-3 mb-4">Votre messages</h2>
      <div className="w-100 mb-3 mx-3">
        <MessageFilter />
      </div>
      {filtered !== null
        ? filtered.map((message) => (
            <MessageItem key={message._id} message={message} />
          ))
        : messages !== null &&
          messages.map((message) => (
            <MessageItem key={message._id} message={message} />
          ))}
    </div>
  );
};
export default Messages;
