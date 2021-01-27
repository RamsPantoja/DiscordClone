import React from 'react';
import './styles/ChatInput.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import axios from '../axios';

const ChatInput = ({inputTextMessage, setInputTextMessage, channelId, channelName, user}) => {
    
    const sendMessage = (e) => {
        e.preventDefault();
        axios.post(`/new/message?id=${channelId}`, {
            message: inputTextMessage,
            timestamp: Date.now(),
            user: user
        })
        setInputTextMessage('');
    }

    return (
        <div className='chat_input'>
            <AddCircleIcon className='chat_inputAdd'/>
            <form>
                <input value={inputTextMessage} onChange={(e) => setInputTextMessage(e.target.value)} disabled={!channelId} placeholder={`Message #${channelName}`}/>
                <button disabled={!channelId} className='chat_inputButton' type='submit' onClick={(e) => { sendMessage(e)}}>Send Message</button>
            </form>

            <div className='chat_inputIcons'>
                <CardGiftcardIcon/>
                <GifIcon/>
                <EmojiEmotionsIcon/>
            </div>
        </div>
    )
}

export default ChatInput;