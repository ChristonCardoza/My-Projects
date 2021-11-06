import React, { useEffect, useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import { collection, getDocs,query, addDoc, serverTimestamp, orderBy } from 'firebase/firestore/lite';
import { useSelector } from 'react-redux';
import FlipMove from 'react-flip-move';

import './Feed.css';
import InputOption from './InputOption';
import Post from './Post';
import { db } from './firebase';
import { selectUser } from './features/userSlice';

const Feed = () => {

  const [posts, setPosts] = useState([]);
  const [input, setInput ] = useState('');

  const user = useSelector(selectUser);

  useEffect(() => {

    const fetData = async () => {
      const postSnapshot = await getDocs(query(collection(db, 'posts'),orderBy('timestamp','desc')));
      setPosts(
        postSnapshot.docs.map((doc) => ( {
          id: doc.id,
          data: doc.data()
        }))
      )
    }

    fetData();
  },[input]);

  const sendPost = async(e) => {
    e.preventDefault();

    await addDoc(collection(db, 'posts'),{
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || "",
      timestamp: serverTimestamp()
    });
    setInput('');
  };

  return (
      <div className='feed'>

        <div className="feed__inputContainer">

          <div className="feed__input">
              <CreateIcon />
              <form>
                  <input type='text'  value={input} onChange = { e => setInput(e.target.value) }/>
                  <button type='submit' onClick={sendPost}>Send</button>
              </form>
          </div>

          <div className="feed__inputOptions">
              <InputOption Icon={ImageIcon} title='Photo' color='#70B5F9' />
              <InputOption Icon={SubscriptionIcon} title='Video' color='#E7A33E' />
              <InputOption Icon={EventNoteIcon} title='Event' color='#C0CBCD' />
              <InputOption Icon={CalendarViewDayIcon} title='Write article' color='#7FC15E' />
          </div> 
            
        </div> 

        <FlipMove>
          {
            posts.map(({id, data: {name, description, message, photoUrl}}) => (

              <Post 
                key= { id }
                name= { name }
                description= { description}
                message= { message }
                photoUrl = { photoUrl }
              />
            ))
          }
        </FlipMove>

      </div>
  )
}

export default Feed
