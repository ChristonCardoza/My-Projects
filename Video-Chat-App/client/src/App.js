import React from 'react';
import { Typography, AppBar } from '@material-ui/core';

import { VideoPlayer, Notifications, Options } from './Components';
import useStyles from './styles';

const App = () => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <Typography variant="h2" align="center">Video Chat</Typography>
            </AppBar>
            <VideoPlayer/>
            <Options>
                <Notifications />
            </Options>
        </div>
    )
}

export default App
