import {GET_CASH, BUY_MOVIE, ITEMS_LOADING} from '../actions/types'

const initialState = {
    items: [],
    cash: 100000,
    loading: false
}

export default function(state = initialState, action) {

    switch(action.type) {
        case GET_CASH:
            return {
                ...state,
                loading: false
            }
        case BUY_MOVIE:
            return {
                ...state,
                cash: action.payload.cash,
                items:[...state.items, action.payload.items]
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}