import React from 'react';
import { Avatar } from '@material-ui/core';

import './Sidebar.css';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';


const Sidebar = () => {
    
    const user = useSelector(selectUser);

    const recentItem = (topic) => (
        <div className='sidebar__recentItem'>
            <span className='sidebar__hash'>#</span>
            <p>{topic}</p>
        </div>
    );

    return (
        <div className='sidebar'>

            <div className="sidebar__top">
                <img src='https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YmFja2dyb3VuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60' alt='' />
                <Avatar src={user?.photoUrl} className='sidebar__avatar'>{user?.email[0]}</Avatar>
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
            </div>

            <div className="sidebar__status">
                 <div className="sidebar__stat">
                     <p>Who viewed you</p>
                     <p className='sidebar__statNumber'>2,543</p>
                 </div>
                 <div className="sidebar__stat">
                 <p>Views on post</p>
                 <p className='sidebar__statNumber'>2,448</p>
                 </div>
            </div>

            <div className="sidebar__bottom">
                <p>Recent</p>
                {recentItem('reactjs')}
                {recentItem('programming')}
                {recentItem('rsoftwareengineering')}
                {recentItem('design')}
                {recentItem('developer')}
            </div>

        </div>
    )
}

export default Sidebar
