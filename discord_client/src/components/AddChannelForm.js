import { Button } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import './styles/AddChannelForm.css';
import useAddChannelValidation from '../hooks/handleAddChannelHook';
import { stateSchemaChannelName, disableSchema, validationSchema } from '../hooks/handleAddChannelHook';
import axios from '../axios';

const AddChannelForm = ({handleAddChannel}) => {
    const [state, disable, handleInput] = useAddChannelValidation(stateSchemaChannelName, validationSchema, disableSchema);
    const [isInputEmpty, setIsInputEmpty] = useState(false);

    const errorMessage = isInputEmpty ? <span className='add_channelForm_inputError'>{disable.error}</span> : null;

    const handleCancel = () => {
        handleAddChannel();
    }

    const hanleOnSubmit = (e) => {
        e.preventDefault();
        if (disable.status) {
            setIsInputEmpty(true)
        } else {
            axios.post('/new/channel', {
                channelName: state.channelName.value
            })
            setIsInputEmpty(false)
            handleAddChannel();
        }
    }

    return (
        <Fragment>
            <div className='add_channel_backdrop'></div>
            <div className='add_channel'>
                <div className='add_channelInert'>
                    <form className='add_channelForm' onSubmit={(e) => { hanleOnSubmit(e)}}>
                        <div className='add_channelForm_header'>
                            <h4>CREATE A TEXT CHANNEL</h4>
                            <span>in Text Channels</span>
                        </div>
                        <div className='add_channelForm_input'>
                            <h5>CHANNEL NAME</h5>
                            <input type='text' name='channelName' onChange={handleInput} value={state.channelName.value}/>
                            {errorMessage}
                        </div>
                        <div className='add_channelForm_buttons'>
                            <span onClick={handleCancel}>Cancel</span>
                            <Button type='submit'>Create Channel</Button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default AddChannelForm;