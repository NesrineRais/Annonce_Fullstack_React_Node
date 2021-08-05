import { LOAD_ALL_ANNONCES } from "../actions/anonces/actions-types";


const initialState = {
    anonces: []
}

export default function AdReducer(state=initialState, action) {
    // il faut ajouter l action pour voir tous le tableau dans switch
    switch(action.type){
        case LOAD_ALL_ANNONCES:
            return {anonces: action.payload}
        break;
    }
    return state;
}