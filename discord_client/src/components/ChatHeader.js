import React from 'react';
import './styles/ChatHeader.css';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import InboxIcon from '@material-ui/icons/Inbox';
import HelpIcon from '@material-ui/icons/Help';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'

const ChatHeader = ({channelName}) => {
    return (
        <header className='chat_header'>
            <div className='chat_headerLeft'>
                <span>#</span>
                <h1>{channelName}</h1>
            </div>
            <div className='chat_headerRight'>
                <NotificationsIcon/>
                <PeopleAltIcon/>
                <InboxIcon/>
                <div className='chat_headerSearch'>
                    <input type='text' placeholder='Search'/>
                    <SearchRoundedIcon/>
                </div>
                <SendRoundedIcon/>
                <HelpIcon/>
            </div>
        </header>
    )
}

export default ChatHeader;