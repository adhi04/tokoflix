import axios from 'axios';
import {GET_CASH, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, BUY_MOVIE} from './types';

export const getCash = () => dispatch => {
    dispatch(setItemsLoading());
    dispatch({
        type: GET_CASH
    })
};

export const buyMovie = (data) => dispatch => {
    dispatch({
        type: BUY_MOVIE,
        payload: data
    })
};

export const addItem = item => dispatch => {
    axios
        .post('/api/items', item)
        .then(res =>
            dispatch({
                    type: ADD_ITEM,
                    payload: res.data
            })
        )
};



export const deleteItem = id => dispatch => {
    axios.delete(`api/items/${id}`).then(res =>
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
    )
};

export const setItemsLoading = item => {
    return {
        type: ITEMS_LOADING
    };
};
