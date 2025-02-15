import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BusinessCenterIcon  from '@material-ui/icons/BusinessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useDispatch } from 'react-redux';

import './Header.css';
import linkedInLogo from './images/linkedin.png';
import HeaderOption from './HeaderOption';
import { logout } from './features/userSlice';
import { auth } from './firebase';


const Header = () => {

    const dispatch = useDispatch();

    const logoutOfApp = () => {
        dispatch(logout());
        auth.signOut();
    };

    return (
        <div className='header'>
            <div className='header__left'>
                <img src={linkedInLogo} alt='' />

                <div className='header__search'>
                    <SearchIcon />
                    <input type='text'/>
                </div>
            </div>

            <div className='header__right'>
                <HeaderOption Icon={ HomeIcon } title='Home'/>
                <HeaderOption Icon={ SupervisorAccountIcon } title='My Network' />
                <HeaderOption Icon={ BusinessCenterIcon } title='Jobs'/>
                <HeaderOption Icon={ ChatIcon } title='Messaging' />
                <HeaderOption Icon={ NotificationsIcon } title='Notifications' />
                <HeaderOption onClick= { logoutOfApp } title='me' avatar={true}/>
            </div>

        </div>
    )
}

export default Header
