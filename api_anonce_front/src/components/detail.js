import React from 'react';
import {Link} from 'react-router-dom';
// import {getOneAd} from '../api/articles';
import {getAllArticle} from '../api/articles';
import {config} from '../config'
import {connect} from 'react-redux';
import {loadAllAnonces} from '../actions/anonces/adAction';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anonce: null
            //on a fais le null ici car on va tous remplir
        }

    }

    componentDidMount() {
        console.log(this.props)
        //pour récuper l id dans componentdidmonun on this.props dans console.log
        console.log(this.state)
        let id = this.props.match.params.id;
        // getOneAd(id)
        //     .then((res)=>{
        //         console.log(res);
        //         this.setState({anonce: res.anonce})
        //  sans redux   }) 

        //avec redux ca on l amis dans helpers
        //
    }
    render() {
        console.log(this.props);
        let id = this.props.match.params.id;
        let adFilter = this.props.item.anonces.filter((anonce)=>{
            return anonce.id === parseInt(id);
            //id récupérer de paramétre de l url est il considére comme un string
            //on dois le convertir on int avec parseint
        })
        console.log("adFilter", adFilter);
        let anonce = null;
        if(adFilter.length > 0) {
            anonce = adFilter[0];
        }
        console.log("anonce", anonce)
        return (
            <div>
                <h1>Detail</h1>
                <Link to="/">Retour home</Link>
                {anonce !== null && <div>
                {/* on a fait la condition si elle diifrent de null car c est asynchrone on dois attendre la re
                reponse de la requete 
                //alors a la chargement de la pagenet le contenue de state anonce =0 il
                n a pas recu la reponse de la base*/}
                   
                    <img src={config.pict_url+anonce.url} />
                    <h3>{anonce.title}</h3>
                    <p>{anonce.contents}</p>
                </div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
