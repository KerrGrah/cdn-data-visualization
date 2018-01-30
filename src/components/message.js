import React from 'react';

const Message = (props) => {
  return (
    <div className={"msg " + props.msgClass}>
      <p>{props.msgText}</p>
    </div>
  )
}

export default Message
