import {LOAD_ALL_ANNONCES} from './actions-types';

export const loadAllAnonces = (anonces)=>{
    return function(dispatch){
        dispatch({
            type: LOAD_ALL_ANNONCES,
            payload: anonces
        })
    }
}