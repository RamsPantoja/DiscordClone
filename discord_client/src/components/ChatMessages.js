import { Avatar } from '@material-ui/core';
import React from 'react';
import './styles/ChatMessages.css';

const ChatMessages = ({user, timestamp, message}) => {
    const {displayName, photo} = user;

    return (
        <div className='message'>
            <Avatar src={photo}/>
            <div className='message_info'>
                <h4>{displayName}
                    <span className='message_timeStamp'>{new Date(parseInt(timestamp)).toDateString()}</span>
                </h4>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default ChatMessages;