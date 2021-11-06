import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import './Widget.css';

const Widgets = () => {

    const newsArticle = (heading, subtitle) => (
        <div className='widgets__article'>
            <div className="widgets__articleLeft">
                <FiberManualRecordIcon />
            </div>
            <div className="widgets__articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    )

    return (
        <div className='widgets'>
            <div className='widgets__header'>
                <h2>LinkedIn News</h2>
                <InfoIcon />
            </div>

            { newsArticle('LinkedIn UI Cloning', 'Top news - 9999 readers') }
            { newsArticle('Firebase for Auth', 'Top news - 999 readers') }
            { newsArticle('Firebase for Storage', 'Top news - 99 readers') }
            { newsArticle('React as Front-End', 'Top news - 9999 readers') }
            { newsArticle('Redux for State Management', 'Top news - 99 readers') }
            { newsArticle('Basic CSS for Styling', 'Top news - 9 readers') }
        </div>
    )
}

export default Widgets
