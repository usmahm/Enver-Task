import React from 'react';

import classes from './MessageBox.module.css'

const MessageBox = (props) => {
    return (
        <div className={`${classes.MessageBox} ${props.curUser ? classes.CurUser : ""}`}>
            <p>{props.message}</p>
        </div>
    )
}

export default MessageBox