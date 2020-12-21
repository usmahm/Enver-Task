import React from 'react';

import MessageBox from './MessageBox/MessageBox';
import classes from './MessageGroup.module.css'

const MessageGroup = props => {
    const msgGroupDetails = props.messageGroup;
    
    const messages = msgGroupDetails.messages.map(msg => <MessageBox message={msg.text} key={msg.id} curUser={props.userID === msgGroupDetails.senderId} /> )

    return (
        <div className={`${classes.MessageGroup} ${props.userID === msgGroupDetails.senderId ? classes.CurUser : ""}` }>
            <div className={classes.UserDetails}>
                <div>
                    <img src={msgGroupDetails.userAvater} alt="" />
                    <span></span>
                </div>
                <span>
                    <p>{msgGroupDetails.fullName}</p>
                    <p>{msgGroupDetails.title}</p>
                </span>
            </div>
            {messages}
            <p className={classes.MessageTime}>{msgGroupDetails.timeDifference}</p>
        </div>
    )
}

export default MessageGroup