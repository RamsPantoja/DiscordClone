import React from 'react';
import './styles/Login.css';
import Button from '@material-ui/core/Button';
import { auth, provider } from '../firebase';

const Login = () => {

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch( error => alert(error.message))
    };

    return (
        <div className='login'>
            <div className='login_logo'>
                <img src='https://download.logo.wine/logo/Discord_(software)/Discord_(software)-Logo.wine.png' alt='login logo'/>
            </div>
            <Button onClick={e => {signIn(e)}}>Sign In</Button>
        </div>
    )
}

export default Login;