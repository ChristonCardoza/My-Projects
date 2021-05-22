import React from 'react';
// import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { 
    Card, 
    CardActions, 
    CardContent, 
    CardMedia, 
    Button, 
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizonIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { CSVLink, CSVDownload } from "react-csv";

import useStyles from './styles';
import csvImage from '../../../images/csv.png';
import { deleteCsv } from '../../../actions/csvs';

    
const Csv = ({ csv, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    // console.log(csv);
    const objectToCsv = function(data) {

        // console.log(data);
        const csvRows = [];

        //get the headers
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));
        // console.log(csvRows);

        //loop over the rows
        for (const row of data){
            const values = headers.map(header => {
                const escaped = (''+row[header]).replace(/"/g, '\\"');
                // console.log(escaped)
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
            // console.log(values.join(','));
        }
        console.log(csvRows);
        return csvRows.join('\n');
    }

    const download = function(data) {
        const blob = new Blob([data], {type: 'text/csv'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'download.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeAttribute(a);

    }


    const handleDownload = () => {
        // console.log(csv);
     
        const data = [csv].map( row => ({
            name: row.name,
            username: row.username,
            email: row.email,
            phone: row.phone,
            website: row.website
        }));

        // console.log(data);

        const csvData = objectToCsv(data);
        // console.log(csvData);
        download(csvData);
    }

    return (
        <Card className={classes.card}>
             <CardMedia className={classes.media} image={csvImage} title={csv.name} />
             <div className={classes.overlay}>
                <Typography variant="h6">{csv.name}</Typography>
                <Typography variant="body2">{moment(csv.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() =>{setCurrentId(csv._id)}} >
                    <MoreHorizonIcon fontSize="default" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" >{csv.username}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom >{csv.phone}</Typography> 
            <CardContent>
                <Typography variant="body2" colour="textSecondary"  component="p">{csv.website}</Typography>
            </CardContent> 
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={ handleDownload }>
                    <CloudDownloadIcon fontSize="small" />
                    &nbsp; Download &nbsp;
                    {csv.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => { dispatch(deleteCsv(csv._id))} }>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>     
        </Card>
    );

    // return (
    //     <Card className={classes.card}>
    //         <CardContent>  
    //             <TableContainer>
    //                 <Table className={classes.table} aria-label="simple table">
    //                     <TableHead>
    //                         <TableRow>
    //                         <TableCell>Name</TableCell>
    //                         <TableCell align="right">username</TableCell>
    //                         <TableCell align="right">Email</TableCell>
    //                         <TableCell align="right">Phone</TableCell>
    //                         <TableCell align="right">Website</TableCell>
    //                         </TableRow>
    //                     </TableHead>
    //                     <TableBody>
    //                         <TableRow key={csv.name}>
    //                             <TableCell component="th" scope="row">
    //                             {csv.name}
    //                             </TableCell>
    //                             <TableCell align="right">{csv.username}</TableCell>
    //                             <TableCell align="right">{csv.email}</TableCell>
    //                             <TableCell align="right">{csv.phone}</TableCell>
    //                             <TableCell align="right">{csv.website}</TableCell>
    //                         </TableRow>
    //                     </TableBody>
    //                 </Table>
    //             </TableContainer>
    //         </CardContent> 
    //         <CardActions className={classes.cardActions}>
    //             <Button size="small" color="primary" onClick={() => { } }>
    //                 <CloudDownloadIcon fontSize="small" />
    //                 &nbsp; Download &nbsp;
    //                 {csv.likeCount}
    //             </Button>
    //             <Button size="small" color="primary" onClick={() => { } }>
    //                 <DeleteIcon fontSize="small" />
    //                 Delete
    //             </Button>
    //         </CardActions>     
    //     </Card>
    // );
}

export default Csv;
