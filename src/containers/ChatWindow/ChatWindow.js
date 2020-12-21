import React, { useCallback, useEffect, useState } from "react";

import MessageGroup from '../../components/MessageGroup/MessageGroup';
import classes from './ChatWindow.module.css'

import {parseTime} from '../../shared/utilities';

const ChatWindow = () => {
    const [messages, setMessages] = useState([])
    const userID = '0hr4z9EAXCXHd8SSED8o0crfKJO2' // Current User ID, Should be dynamic.
    
    const addMessage = (msg) => {
        let addAsNewMessage = true;

        let newMsg = {
            senderId: msg.user.id,
            fullName: msg.user.fullName,
            userAvater: msg.user.avatar,
            title: msg.user.title.join(", "),
            messages: [
                {
                   text: msg.text,
                   id: msg._id
                }
            ],
            time: msg.createdAt._seconds,
            timeDifference: parseTime(msg.createdAt._seconds),
            id: msg._id // Used as dummy ID for the message group to be used as key prop
        }
        
        let prevmsgs = [];
        setMessages(prevState => {
            prevmsgs = [...prevState]
            return prevState
        })

        let lastMessage = prevmsgs.slice(-1)[0]

        if (lastMessage && lastMessage.senderId === newMsg.senderId) {

            // Check if the new Message arrived not longer than 1 day apart from the previous message
            const timeDifference = newMsg.time - lastMessage.time;
            if (timeDifference < 86400) {
                //Appends new message to previous one thus we don't need to add as new message
                addAsNewMessage = false

                // Updates previous messages with newly recieved data
                lastMessage = {
                    ...lastMessage,
                    messages: [
                        ...lastMessage.messages,
                        ...newMsg.messages
                    ],
                    timeDifference: newMsg.timeDifference
                }

                const newState = [
                    ...prevmsgs.slice(0, prevmsgs.length - 1),
                    lastMessage
                ]
                setMessages(newState)
            }
        }

        if (addAsNewMessage) {
            setMessages(prevState => {
                return [
                    ...prevState,
                    newMsg
                ]
            })
        }
    }

    const getMessages = useCallback(() => {
        fetch('messages.json',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then (response => {
                return response.json()
            })
            .then(response => {
                const msgs = response.messages

                msgs.forEach((msg, index) => {
                    addMessage(msg, index)
                })
            })
    }, [])

    useEffect(() => {
        getMessages()
    }, [getMessages])

    let allMessages = <p>Loading Messages!</p>;

    if (messages.length > 0) {
        allMessages = (
            messages.map(msg => <MessageGroup messageGroup={msg} userID={userID} key={msg.id} />)
        )
    }

    return (
        <div className={classes.ChatWindow}>
            {allMessages}
        </div>
        );
};

export default ChatWindow;

