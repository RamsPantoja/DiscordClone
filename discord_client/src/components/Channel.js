import React from 'react';
import { useDispatch } from 'react-redux';
import { setChannelInfo } from '../features/appSlice';
import './styles/Channel.css';

const Channel = ({id,channelName}) => {
    const dispatch = useDispatch();
    return (
        <div className='channel_container' onClick={() => (
            dispatch(setChannelInfo({
                channelId: id,
                channelName: channelName
            }))
        )}>
            <span className='channel_hash'>#</span>
            <h4 className='channel_title'>{channelName}</h4>
        </div>
    )
}

export default Channel;