import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector} from 'react-redux';

import useStyles from './styles';
import Csv from './Csv/Csv';
const Csvs = ({ setCurrentId }) => {

    const csvs = useSelector((state) => state.csvs);
    const classes = useStyles();

    // console.log(csvs);

    return (
        !csvs.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    csvs.map((csv) => (
                        <Grid key={csv._id} item xs={12} sm={6} md={6} lg={3}>
                            <Csv csv={csv} setCurrentId={ setCurrentId }  />
                        </Grid>
                    ))
                }
            </Grid>
        )
     );
}

export default Csvs;
