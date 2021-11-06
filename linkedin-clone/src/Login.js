import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';

import { auth } from './firebase';
import './Login.css';
import { login } from './features/userSlice';

const Login = () => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('');

    const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then( userAuth => {
            dispatch(login ({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                profileUrl: userAuth.user.photoURL
            }))
        })
        .catch(error => alert(error))

    };

    const register = () => {

        if(!name) alert('Please enter full name');

        createUserWithEmailAndPassword(auth,email,password)
        .then((userAuth) => {
            updateProfile(userAuth.user,{
                displayName: name,
                photoURL: profilePic
            })
            .then(() => {
                dispatch(
                    login({
                        email: userAuth.user.email,
                        uid:userAuth.user.uid,
                        displayName: name,
                        photoUrl: profilePic
                    })
                )
            })
        })
        .catch(error => alert(error));
    };

    return (
        <div className='login'>

            <img 
                src= 'https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png?itok=q_lR0Vks'
                alt=''
            />

            <form>
                <input 
                    placeholder='Full name (required if registering)'
                    type='text'
                    onChange={e => setName(e.target.value)}
                    value= {name}
                />
                <input 
                    placeholder='Profile pic URL (optional)'
                    type='text'
                    onChange={e =>setProfilePic(e.target.value)}
                    value= {profilePic}
                />
                <input 
                    placeholder='Email'
                    type='email'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
                <input 
                    placeholder='Password'
                    type='password'
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
                <button type='submit' onClick={loginToApp}>Sign In</button>
            </form>

            <p>
                Not a member?
                <span className='login__register' onClick={register}> Register Now</span>
            </p>
        </div>
    )
}

export default Login
