import React from 'react';
import {Link} from 'react-router-dom';
import {getAllArticle,getUpdate,deletOneAnnonce} from '../api/articles'
import {connect} from 'react-redux';
import {loadAllAnonces} from '../actions/anonces/adAction';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            anonces:[],
            newanonces:[],
            redirect: false
        }
        
    }
    componentDidMount(){
        // getAllArticle ()
        // .then((res)=>{//anonce.data
        //     // this.setState({ anonces: res.anonces },()=>{//on a mis cette fonction fléche car c est asynchrone
        //     //     console.log("response",this.state.anonces)
        //     // })//c est pour voir dans le fetch
        //     this.setState({ anonces: res.anonces })
        // })

        //apres redux on a mis ca dans helpers d ou vins l utilisation des hocks
        // console.log(this.props)
        // if(this.props.item.anonces.length === 0){
        //     getAllArticle ()
        //     .then((res)=>{
        //         console.log(res)
        //         this.props.loadAllAnonces(res.anonces)
        //     })
        // }
           
    }
    
    onSubmitDelete = (id) =>{
        
        deletOneAnnonce(id)
        .then((res)=>{
            console.log(res)
            if(res.status === 200) {
                //il a rajouter cette condition car on veut voir l affichage l element supprimer
                //sans actualisation manuelle de la page
                //on a recrer un nouveau state de tous les element avec le submit de bouton supprimer
                    getAllArticle ()
                    .then((res)=>{//anonce.data
                        this.setState({ anonces: res.anonces })
                        
                    })
                
            }
        })
    }
    render() {
        console.log("state",this.state);
        console.log("props",this.props);
        return (
            <div className="admin-page">  
                <h1>Admin</h1>
            	<table>
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Action</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
            {/* {this.state.anonces.map((anonce,index)=>{ 
                sans redux on stock tous dans le state avec redux dans les props*/}
                        {this.props.item.anonces.map((anonce,index)=>{
                            return(
                                <tr>
                                <td  key={index}>
                                    {anonce.title}
                                   
                                </td>
                                <td  key={index}>
                                    <Link to={"/edit/"+anonce.id}>modifiers</Link>
                                   
                                </td>
                                <td  key={index}>
                                    <button
                                        type="button"
                                        onClick={()=>{
                                            console.log(anonce.id)
                                          this.onSubmitDelete(anonce.id)
                                         }}
                                    >Supprimer
                                    </button>
                                </td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
                </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
