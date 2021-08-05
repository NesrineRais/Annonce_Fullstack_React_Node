import React from 'react';
import {loadAllAnonces} from '../actions/anonces/adAction';
import {connect} from 'react-redux';
import {getAllArticle} from '../api/articles';
import {Redirect,Link} from 'react-router-dom';

export default function(ChildComponent) {
    class RequireData extends React.Component {
        constructor(props){
            super(props);
        }
        
        componentDidMount(){
            if(this.props.item.anonces.length === 0) {   
                console.log('JE CHARGE LES ANNONCES')
                getAllArticle ()
                    .then((res)=>{//anonce.data
                        // this.setState({ anonces: res.anonces },()=>{//on a mis cette fonction fléche car c est asynchrone
                        //     console.log("response",this.state.anonces)
                        // })
                        console.log(res);
                        this.props.loadAllAnonces(res.anonces);
                    })
                
            }
            
        }
        
        
        render(){
            return (
                <ChildComponent {...this.props} />  
            )
        }
        
        
    }

    const mapStateToProps = (store)=>{
        return {
           item: store.anonces
           //anonce ici on le trouve aussi dans index.js dans reducers 
           //on dois mettre la méme chose anonces: AdReducer
       }
    }
    
    const mapDispatchToProps = {
        loadAllAnonces
    }
    
    return connect(mapStateToProps, mapDispatchToProps)(RequireData);
    

}
