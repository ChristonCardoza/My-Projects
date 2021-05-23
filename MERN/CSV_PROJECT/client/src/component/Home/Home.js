import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid }  from '@material-ui/core';
import { useDispatch } from 'react-redux';


import { getCsvs } from '../../actions/csvs';
import Csvs from '../Csvs/Csvs';
import Form from '../Form/Form';
import useStyles from './styles';

const Home = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [ currentId, setCurrentId ] = useState(null);

    useEffect(() => {
        dispatch(getCsvs());
    }, [dispatch]);

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Csvs setCurrentId={setCurrentId} />
                    </Grid> 
                    <Grid item xs={12} sm={4} md={3}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
