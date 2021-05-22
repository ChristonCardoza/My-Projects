export default (csvs = [], action) => {
    switch(action.type){
        case 'FETCH_ALL' :
            return action.payload;
        case 'CREATE' :
            return [...csvs, action.payload];
        case 'UPDATE':
            return csvs.map((csv) => csv._id === action.payload._id ? action.payload : csv);
        case 'DELETE':
            return csvs.filter((csv) => csv._id !== action.payload);
        default :
            return csvs;
    }
}