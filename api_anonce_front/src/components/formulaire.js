import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {saveOneAd, savePict,getAllArticle} from '../api/articles';
import {config} from '../config'
import {connect} from 'react-redux';
import {loadAllAnonces} from '../actions/anonces/adAction';

class Formulaire extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            title : "",
            content : "",
            picture: null,
            redirect: false
        
            
        }
    }
    onSubmitForm = () =>{
        if(this.state.picture !== null) {
            savePict(this.state.picture)
            .then((res)=>{
                console.log(res); 
                if(res.status === 200) {
                    let data = {
                        title: this.state.title,
                        contents: this.state.content,
                        url: res.url
                    }
                    
                    console.log(data);
                    saveOneAd(data)
                    .then((res)=>{//anonce.data
                        console.log(res); 
                        if(res.status === 200) {
                            // this.setState({redirect: true}); //sans redux on avait ca
                            //on ajouté ca poyr faire le mise a jour et afficher ll anonce ajouter dans tous les pages
                            getAllArticle()
                            .then((res2)=>{
                                console.log(res2);
                                this.props.loadAllAnonces(res2.anonces);
                                this.setState({redirect: true});
                            })
                        }
                        
                    })
                }
            })
        }
        else {
            let data = {
                        title: this.state.title,
                        contents: this.state.content,
                        url: "no-picture.png"
                        }
                    
                    console.log(data);
                    
                    saveOneAd(data)
                    .then((response)=>{
                       console.log(response); 
                       if(response.status === 200) {
                           //this.setState({redirect: true})
                       }
                    })
        }
        
    }
    
    render() {
        if(this.state.redirect === true) {
            return <Redirect to="/"/>
        }
        return (
            <div>  
                <h1>Formulaire</h1>
                <form
                    onSubmit={(e)=>{
                        e.preventDefault();
                        this.onSubmitForm();
                    }}
                >
                    <div>
                        <label>Titre : </label>
                        <input
                            type="text"
                            value={this.state.title}
                            onChange={(e)=>{
                                this.setState({title: e.target.value})
                            }}
                        />
                    </div>
                    <div>
                        <label>Contenu : </label>
                        <textarea
                           
                            value={this.state.content}
                            onChange={(e)=>{
                                this.setState({content: e.target.value})
                            }}
                        />
                    </div>
                    <label>Photo</label>
                    <input type="file" 
                        onChange={(e)=>{
                            console.log(e.target.files[0]);
                            this.setState({picture: e.target.files[0]})
                        }}
                    />
                    <div>
                        <input
                            type="submit"
                            value='envoyer'
                        />
                    </div>
                </form>
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
export default connect(mapStateToProps, mapDispatchToProps)(Formulaire);
