import React,{ useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { parse } from 'papaparse';

import useStyles from './styles';
import { createCsv, updateCsv } from '../../actions/csvs';

const Form = ({ currentId, setCurrentId }) => {

    const classes = useStyles();
    const [csvData, setCsvData] = useState({
        name: '', username: '', email: '', phone: '', website: ''
    });
    const dispatch = useDispatch();
    // console.log(currentId);
    const csv = useSelector((state) => currentId ? state.csvs.find((sc) => sc._id === currentId) : null );
    // console.log(csv);

    useEffect(() => {
        if(csv){
            setCsvData(csv);
            // console.log(csvData);
        }
    },[csv]);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(csvData);
        
        if(currentId){
            dispatch(updateCsv(currentId, csvData));
        } else {
            dispatch(createCsv(csvData));
        }
        
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setCsvData({ name: '', username: '', email: '', phone: '', website: '' });
    }

    const onFileChange = async(e) => {
        const filedata =  await e.target.files[0].text();
        // console.log(filedata);
        const result = parse(filedata, { header: true });
        console.log(result);
    }

    const upload = () => {
        
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Editing' : 'Creating'} a Csv</Typography>
                <TextField name="name" variant="outlined" label="Name" fullWidth value={csvData.name} onChange={(e) => setCsvData({ ...csvData,name: e.target.value})} />
                <TextField name="username" variant="outlined" label="Username" fullWidth value={csvData.username} onChange={(e) => setCsvData({ ...csvData,username: e.target.value})} />
                <TextField name="email" variant="outlined" label="Email" fullWidth value={csvData.email} onChange={(e) => setCsvData({ ...csvData,email: e.target.value})} />
                <TextField name="phone" variant="outlined" label="Phone" fullWidth value={csvData.phone} onChange={(e) => setCsvData({ ...csvData,phone: e.target.value})} />
                <TextField name="website" variant="outlined" label="Website" fullWidth value={csvData.website} onChange={(e) => setCsvData({ ...csvData,website: e.target.value})} />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="large" onClick={clear} fullWidth>Clear</Button>
                {/* <Button variant="contained" component="label">Upload File<input type="file" /></Button> */}
                <div className={classes.fileInput}><input type="file"  onChange={ onFileChange } /></div>
                <Button variant="contained" size="large" onClick={upload} fullWidth>Upload</Button>
                
            </form>
        </Paper>
    );
}

export default Form;
