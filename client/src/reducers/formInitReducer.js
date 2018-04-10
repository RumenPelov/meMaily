import {FETCH_DRAFT, INIT_DRAFT} from '../actions/types';

export function fetchDraftReducer (state = {}, action) {
    switch (action.type) {
        case FETCH_DRAFT:
            return action.payload;
        
        default:
            return state;
    }
}

export function fetchInitReducer (state = {}, action) {
    switch (action.type) {
        case INIT_DRAFT:
            return action.payload;
        
        default:
            return state;
    }
}