import React from 'react';
import {Link} from 'react-router-dom';
import {getAllArticle} from "../api/articles"
import {config} from '../config'
import {connect} from 'react-redux';
import {loadAllAnonces} from '../actions/anonces/adAction';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            anonces:[]
        }
        
    }
    componentDidMount(){
        console.log(this.props)
        //on la mis dans le component helpers
        // if(this.props.item.anonces.length === 0) {   
        //     getAllArticle ()
        //         .then((res)=>{//anonce.data
        //             // this.setState({ anonces: res.anonces },()=>{//on a mis cette fonction fléche car c est asynchrone
        //             //     console.log("response",this.state.anonces)
        //             // })
        //             console.log(res);
        //             this.props.loadAllAnonces(res.anonces);
        //         })
            
        // }
       
        
    }
    
    
    render() {
        console.log(this.props);
       
        return (
            <div className="home-page">  
                <h1>Home</h1>
                            <ul>
                            {this.props.item.anonces.map((anonce,index)=>{
                              return(
                                <li key={index}>
                                 <img src={config.pict_url+anonce.url} /> 
                                 <Link to={"/detail/"+anonce.id}>{anonce.title}</Link>   
                                
                                </li>
                              )  
                            })}
                            </ul>
                            
                        
                   
                
            	
           </div> 
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);