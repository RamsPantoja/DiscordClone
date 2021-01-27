import React, { useEffect, useState } from 'react';
import './styles/Sidebar.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import Channel from './Channel';
import AddChannelForm from './AddChannelForm';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import Avatar from '@material-ui/core/Avatar'
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import Pusher from 'pusher-js';

//http request library
import axios from '../axios';

const pusher = new Pusher('f3df24617a5e9aacdfec', {
    cluster: 'us2'
  });

const Sidebar = () => {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);
    const [addChannelFormActivate, setAddChannelFormActivate] = useState(false)
    
    const queryChannels = () => {
        axios.get('/channels').then((res) => {
            setChannels(res.data)
        });
    }   
    useEffect(() => {
        queryChannels();
        const channelsPusher = pusher.subscribe('channels');
        channelsPusher.bind('newChannel', function(data) {
          queryChannels();
        });
    }, []);

    const handleAddChannel = () => {
        if(addChannelFormActivate === false) {
            setAddChannelFormActivate(true)
        } else {
            setAddChannelFormActivate(false)
        }
    } 

    const isAddChannelFormActivated = addChannelFormActivate ? <AddChannelForm handleAddChannel={handleAddChannel}/> : null;

    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <h1>Discord</h1>
                <ExpandMoreIcon/>
            </div>

            <div className='sidebar_channels'>
                <div className='sidebar_channels_header'>
                    <div className='sidebar_channels_headerLeft'>
                        <ExpandMoreIcon/>
                        <h3>Text Channels</h3>
                    </div>
                    <AddIcon onClick={handleAddChannel} className='sidebar_channels_headerAdd'/>
                </div>

                <div className='sidebar_channels_list'>
                    {channels.map( item => (
                        <Channel key={item.id} channelName={item.channelName} id={item.id}/>
                    ))}
                </div>
            </div>

            <div className='sidebar_voice'>
                <SignalCellularAltIcon className='sidebar_voiceIcon' fontSize='large'/>
                <div className='sidebar_voiceInfo'>
                    <h4>Voice Connected</h4>
                    <span>Stream</span>
                </div>
                <div className='sidebar_voiceIcons'>
                    <InfoOutlinedIcon/>
                    <CallIcon/>
                </div>
            </div>

            <div className='sidebar_profile'>
                <Avatar onClick={() => { auth.signOut() }} src={user.photo}/>
                <div className='sidebar_profileInfo'>
                    <h4>{user.displayName}</h4>
                    <p><span>#</span>{user.uid.substring(0, 5)}</p>
                </div>
                <div className='sidebar_profileIcons'>
                    <MicIcon/>
                    <HeadsetIcon/>
                    <SettingsIcon/>
                </div>
            </div>
            {isAddChannelFormActivated}
        </div>
    )
}

export default Sidebar;