import React, { useEffect, useState } from 'react';
import './styles/Chat.css';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useSelector } from 'react-redux';
import { selectChannelName, selectChannelId } from '../features/appSlice';
import { selectUser } from '../features/userSlice';
import axios from '../axios';
import Pusher from 'pusher-js';

const pusher = new Pusher('f3df24617a5e9aacdfec', {
    cluster: 'us2'
});

const Chat = () => {
    const channelName = useSelector(selectChannelName);
    const channelId = useSelector(selectChannelId);
    const user = useSelector(selectUser);
    const [inputTextMessage, setInputTextMessage ] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        queryMessages(channelId)
        const messagesPusher = pusher.subscribe('messages');
        messagesPusher.bind('newMessage', (data) => {
            queryMessages(channelId);
        })
    }, [channelId]);
    

    const queryMessages = (channelId) => {
        if (channelId) {
            axios.get(`/channel/messages?id=${channelId}`).then((res) => {
                setMessages(res.data[0].messages)
            })
        }
    }

    return (
        <div className='chat_container'>
            <ChatHeader channelName={channelName}/>
            <div className='chat_messages'>
                { messages.map( item => (
                    <ChatMessages key={item._id} timestamp={item.timestamp} user={item.user} message={item.message}/>
                ))}
            </div>
            <ChatInput 
            inputTextMessage={inputTextMessage} 
            setInputTextMessage={setInputTextMessage} 
            channelId={channelId}
            channelName={channelName}
            user={user}/>
        </div>
    )
}

export default Chat;