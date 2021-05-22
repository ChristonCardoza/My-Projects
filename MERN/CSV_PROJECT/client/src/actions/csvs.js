import * as api from '../api';

export const getCsvs = () => async (dispatch) => {
    try {

        const { data } = await api.fetchCsvs();

        dispatch({type: "FETCH_ALL", payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createCsv = (csv) => async (dispatch) => {
    try {

        const { data } = await api.createCsv(csv);

        dispatch({type: "CREATE", payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateCsv = (id, csv) => async (dispatch) => {
    try{
        const { data } = await api.updateCsv(id, csv);

        dispatch({ type: "UPDATE", payload: data});
    } catch (error) {
        console.error(error);
    }
}

export const deleteCsv = (id) => async (dispatch) => {
    try{
        await api.deleteCsv(id);

        dispatch({ type: "DELETE", payload: id });
    } catch (error) {
        console.error(error);
    }
}