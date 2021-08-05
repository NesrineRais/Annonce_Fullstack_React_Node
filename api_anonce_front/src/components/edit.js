import React from 'react';
import {Redirect,Link} from 'react-router-dom';
// import {getOneAd,getUpdate, savePict,saveOneAd} from '../api/articles'; =>sans redux
import {getOneAd,getUpdate, savePict,saveOneAd,getAllArticle} from '../api/articles';
import {config} from '../config'
import {connect} from 'react-redux';
import {loadAllAnonces} from '../actions/anonces/adAction';
class Edit extends React.Component {
    constructor(props) {
        super(props);
        
        this.state={
        //anonce : null j ai enlever ca car je veux pas avoir la condtion que title = nul de l async
        //on a declarer title rempli et content remplir car on vas pas chnger tous le contenu soi ca soi ca 
            // title : "",
            // content : "",
            // url : "",
            // picture: null,
            redirect: false
            
            
        }
        this.title = "";
        this.content = "";
        this.url = "";
        this.isChangePict = false //pour verifier si on a ajouter une image ou pas
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        console.log(id) //sans redux on fais avec les state
        // getOneAd(id)
        //     .then((res)=>{
        //         this.setState({title: res.anonce.title,content : res.anonce.contents,url : res.anonce.url})
        //     })

        // i=on mais ca dans helpers  if(this.props.item.anonces.length === 0){
        //     getAllArticle()
        //     .then((res)=>{
        //         console.log(res);
        //         this.props.loadAllAnonces(res.anonces);
        //     })
        // }
    }
    onSubmitForm = () =>{
        console.log(this.props)
        let id = this.props.match.params.id;
        
       
        if(this.isChangePict  === true) {//on vérifie si l input est a recu un chnagement manuelle 
            //save image
             //savePict(this.state.picture) c etais comme ca avant redux this.state.picture 
             //on l a déclarer dans le constructor this.state.url

             savePict(this.url) //on met l information qu on la déclarer au debut dans le constructor

            .then((res)=>{
                console.log(res)
                if(res.status === 200) {
                   // this.setState({redirect: true});
                   let data = {
                        title : this.title,
                        contents : this.content,
                        url : res.url//je sauvegarde mon image
                        //si diffrent de 0 alors il récupére mon image
                    }
                    console.log(data)

                     //save data
                      getUpdate (data,id)
                        .then((res)=>{//anonce.data
                            console.log(res); 
                            if(res.status === 200) {


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

           
        }else {
            let data = {
                 title: this.title,
                 contents: this.content,
                   url: this.url
              }
            console.log("data erreur",data)
            //save data
            getUpdate (data,id)
                .then((res)=>{//anonce.data
                    console.log(res); 
                    if(res.status === 200) {
                        getAllArticle()
                        .then((res2)=>{
                            console.log(res2);
                            this.props.loadAllAnonces(res2.anonces);
                            this.setState({redirect: true});
                        })
                       
                    }
                })
        }
    }
    changeValueText = (type, value)=>{
        
        // this['title'] = value
        this[type] = value;
    }
    render() {
        console.log(this.props)

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
            this.title = anonce.title;
            this.content = anonce.contents;
            this.url = anonce.url;
        }
        console.log("anonce", anonce)

        if(this.state.redirect){
            return <Redirect to="/admin"/>
        }
        return (
            <div>
                <h1>Edit</h1>
                
                {/* {this.state.anonce !== null && <div> 
                j'enlléve la condition car j ai declarer dans le state title et content 
                remplis non pas null avec anonce= null*/}
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
                            value={this.title}
                            onChange={(e)=>{
                                this.changeValueText('title', e.target.value)//
                                // this.title = e.target.value;
                                // this.setState({title: e.target.value}) sans redux
                            }}
                        />
                    </div>
                    <div>
                        <label>Contenu : </label>
                        <textarea
                           
                            value={this.content}
                            onChange={(e)=>{
                                this.changeValueText('content', e.target.value);
                                // this.content = e.target.value;
                                // this.setState({content: e.target.value})
                            }}
                        />
                    </div>
                    <div>
                        <label>Image : </label>
                   {adFilter.length>0 &&  <img src={config.pict_url+anonce.url} /> }     
{/* il a raouter cette fonction ternaire pour enlever le bug car je click sur actualiser me dit url null
car il envois requete d  iage avant le chatrgement de html */}
                        <input type = "file"
                           
                            onChange={(e)=>{
                               // console.log(e.target.files[0]);
                                // this.setState({picture: e.target.files[0]})//sans redux
                                this.changeValueText('url', e.target.files[0]);
                          //  this.setState({url: e.target.files[0]})
                                this.isChangePict = true;
                               }}
                        />
                    </div>
                    
                    <div>
                        <input
                            type="submit"
                            value='envoyer'
                            onSubmit={(e)=>{
                                this.onSubmitDelete()
                            }}

                            onSubmit={(e)=>{
                        e.preventDefault();
                        this.onSubmitForm();
                    }}
                        />
                    </div>
                </form>
                {/* </div>} */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

