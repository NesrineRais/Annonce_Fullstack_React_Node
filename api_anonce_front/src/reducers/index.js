import { combineReducers } from "redux";
import AdReducer from './adReducer';


const rootReducer = combineReducers({
    anonces: AdReducer
       //anonce ici on le trouve aussi dans home.js dans component dans 
       //const mapStateToProps = (store)=>{ return { item: store.anonces 
    
        

});

export default rootReducer;