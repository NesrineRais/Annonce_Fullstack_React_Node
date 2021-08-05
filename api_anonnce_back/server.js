const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('promise-mysql');

const fileUpload = require('express-fileupload');//c a pour l upload les files
//avec extension npm install express-fileupload
// permet de traiter les fichier arrivant depuis un input de type file
app.use(fileUpload({
    createParentPath: true
}));

// permet de traiter les donner arriver depuis un  formulaire (format: JSON)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// dossier static dans le dossier "public"
//dossier pour inserer dedant les images
app.use(express.static(__dirname + '/public'));


//npm install cors
const cors = require('cors');
app.use(cors());

mysql.createConnection({
	host: "localhost",
	database: "momo_ads",
	user: "root",
	password: "root",
	port: 8889 //on trouve le port dans le localhost php en haut server localhost
}).then((db) => {
    console.log('connecté bdd');
	setInterval(async function () {
		let res = await db.query('SELECT 1');
	}, 10000);
   // {
    //     "firstName" : "John",
    //     "lastName": "Gérald",
    //     "promo": "A"
    // }postman requete
    app.get('/', async (req, res, next)=>{

        let anonces = await db.query('SELECT * FROM ads');
	    
	    if(anonces.code) {
	        res.json({status: 500, msg: 'Un problème est survenu', err: anonces})
	    }
	    
	    res.json({status: 200, msg: 'bdd connecté', anonces: anonces})
		//mon retour c est un tableau s appek anonces
    })

    app.get('/save/anonce/:id', async (req, res, next)=>{
	    
	    let id = req.params.id;
        let anonce = await db.query('SELECT * FROM ads WHERE id = ?', [id]);
        console.log(anonce);
        if(anonce.code) {
            res.json({status: 500, msg: 'Un problème est survenu', err: anonce})
        }
        
        res.json({status: 200, msg: 'bdd connecté', anonce: anonce[0]})//c est ce que je veux me l enviter la reqeute
		//tableau s appel anonce
    })

    app.post('/save/anonce', async (req, res, next)=>{
        //dans la requete base donné insert into on dois pas inderer l id et le ? de l id car il s incrémente automatiquement
	    console.log(req.body);

		
        let result = await db.query('INSERT INTO ads(title, contents, creationTimestamp,url) VALUES ( ?, ?, NOW(),?)', [req.body.title, req.body.contents,req.body.url]);

	    if(result.code) {
	        res.json({status: 500, err: result});
	    }

	    
		res.json({status: 200, result: result});
	})

    app.put('/update/anonce/:id', async (req, res, next)=>{
    	let id = req.params.id;
	    
	    let result = await db.query('UPDATE ads SET title = ?, contents = ?, url = ? WHERE id = ?', [req.body.title, req.body.contents, req.body.url, id]);

		if(result.code) {
	        res.json({status: 500, err: result});
	    }
		
	    res.json({status: 200,result: result})
	})

    app.delete('/delete/anonce/:id', async (req, res, next)=>{
    	let id = req.params.id;
	    
	    let result = await db.query('DELETE FROM ads WHERE id= ?', [id]);

	    if(result.code) {
	        res.json({status: 500, err: result});
	    }
	    
	    res.json({status: 200,result: result})
	})

	//le lien pour inserer l image dans le base donné
	app.post('/api/v1/anonce/pict', (req, res, next)=>{
		console.log(req.files)
		if(!req.files || Object.keys(req.files).length === 0) {
			res.json({status: 404, msg: "La photo n'a pas pu être récupérée"});
		}
		
		req.files.image.mv('public/images/'+req.files.image.name, (err)=>{
			console.log('enregistré');
			if(err) {
				res.json({status: 500, msg: "La photo n'a pas pu être enregistrée"})
			}
			res.json({status: 200, msg: 'ok', url: req.files.image.name});
		})
	})
	
})


const PORT = 9100;
app.listen(PORT, ()=>{
	console.log('listening port '+PORT+' all is ok');
})