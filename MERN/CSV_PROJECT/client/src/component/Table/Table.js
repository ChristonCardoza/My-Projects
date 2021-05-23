import React, { forwardRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable  from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


const Table = () => {

    // const [pageReloader, setPageReloader] = useState(0);

    const csv = useSelector((state) => state.csvs );
    // console.log(csv);
    const allTableData = [];
    csv.map(table => {
        // console.log(table.data);
        table.data.map( row => {
            console.log(row);
            allTableData.push(row);
        })
        // allTableData.concat(table.data);
    })
    console.log(allTableData);
    
    const columns= [
        {
            title: 'Name', field:'name'
        },
        {
            title: 'Username', field:'username'
        },
        {
            title: 'Email', field:'email'
        },
        {
            title: 'Phone', field:'phone'
        },
        {
            title: 'Website', field:'website'
        }

    ]

    // useEffect(() => {
    //     allTableData= JSON.parse(window.localStorage.getItem('allCsvData'));
    //  },[allTableData]);

    // useEffect(() => {
    //    window.localStorage.setItem('allCsvData',JSON.stringify(allTableData));
    // });

    return (

        <MaterialTable title="All Csv Data Table"
            data={ allTableData }
            columns={ columns }
            icons={tableIcons}
            options= {
               { 
                pageSize: 25,
                pageSizeOptions : [ 25 ,50,100, 500 ],
                filtering: true,
                exportButton: true
                }
            }
          
        
        />

    )
}

export default Table
