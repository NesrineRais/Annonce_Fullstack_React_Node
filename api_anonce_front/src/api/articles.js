import axios from 'axios';
import {config} from '../config';
//connexion avec la base pour affichage des donné de tous les contacts
//apres on l appel dans le component
export const getAllArticle = ()=> {
    console.log('requête vers le server');
    return axios.get(config.api_url)
    .then((anonces)=>{
        return anonces.data
        //je met apres ce qui est la dans le then(anonce) de anonce data dans le 2 then
    })

}
//connexion avec la base pour affichage des donné avec get
//apres on l appel dans le component
export const getOneAd = (id)=>{
    console.log('requête vers le server');
    return axios.get(config.api_url+'/save/anonce/'+id)
            .then((response)=>{
                console.log("anonce 1response",response)
                return response.data;
            })
}
//connexion avec la base pour enregistrer des donné avec post
//apres on l appel dans le component
export const saveOneAd = (data)=>{
    // data est un objet qui doit ressembler à :
    // {title: "le titre de mon annonce", contents: "la descrition de mon annonce"}
    console.log('requête vers le server');
    return axios.post(config.api_url+'/save/anonce', data)
            .then((response)=>{
              
                return response.data;
            })
}
//connexion avec la base pour affichage des donné avec url mise a jour et uppdate de donner avec put
//apres on l appel dans le component
export const getUpdate = (data,id)=>{
    console.log('requête vers le server');
    return axios.put(config.api_url+'/update/anonce/'+id, data)
    //modification id il faut faire +id et data (les donner qu on va les envoyer et l id l element qu on la selectioner)
            .then((response)=>{
                //console.log("response",response)
                return response.data;
                
            })
            
}


//connexion avec la base pour delete avec axios delete
//apres on l appel dans le component
export const deletOneAnnonce = (id)=>{
    console.log('requête vers le server');
    return axios.delete(config.api_url+'/delete/anonce/'+id)
            .then((response)=>{
                //console.log("response",response)
                return response.data;
                
            })
            
}

//pour récupérer l image
export const savePict = (file)=>{
    console.log('requête vers le server');
    let formData = new FormData();//enregistrement nouveau format javascript native
    formData.append('image', file);
    
    return axios({
        method: "post",
        url: config.api_url+'/api/v1/anonce/pict',
        data: formData,
        headers: {
                    'Content-Type': 'multipart/form-data'
                }
    })
    .then((response)=>{
        return response.data;      
    })
}


