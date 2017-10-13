

const {Client}  = require("pg");


const client = new Client({
                    user : "lbbebook",
                    password : "lbbebook",
                    host : "134.214.32.145",
                    database : "lbbebook",
                    port:5432})
client.connect()



var InteragitBDD = {}; 



function get1LivreEmpruntStatus(id_livre, callback){
    
    const text1 = 'SELECT id_livre,id_emprunteur FROM emprunt';
    const text2 = ' WHERE id_livre=$1';
    const text = text1 + text2;

    const values = [id_livre]
    // callback
    client.query(text, values, (err, res) => {

    var has = false;

    if (err) {
        console.log(err.stack)
    } else {

        if( res.rows.length > 0)
        {
            has=true; 
        }

        if( res.rows.length > 1){throw "erreur, plus d'un seul emprunt pout ce livre!";}
    }

    callback(err,has);

    })

}


function get1LivreEmprunteur(id_livre, callback){

    const text1 = 'SELECT id_livre,id_emprunteur FROM emprunt';
    const text2 = ' WHERE id_livre=$1';
    const text = text1 + text2;

    const values = [id_livre]
    // callback
    client.query(text, values, (err, res) => {

    var emprunt;

    if (err) {
        console.log(err.stack)
    } else {

        if( res.rows.length > 0)
        {
            var i = 0;
            emprunt = {
                id_livre : res.rows[i].id_livre,
                id_emprunteur : res.rows[i].id_emprunteur,
                } 
        }

        if( res.rows.length > 1){throw "erreur, plus d'un seul emprunt pout ce livre!";}
    }

    callback(err,emprunt);

    })

}


InteragitBDD.getListLivres = function( orderBy="titre", getEmpruntStatus=false, BLIP){

    // i'll do getEmpruntStatus later.

    const text1 = 'SELECT id_livre,isbn,titre,auteurs,id_proprietaire,emplacement FROM livre ORDER BY $1 DESC';
    
    var values = [orderBy];

    
    const text2 = 'SELECT livre.id_livre,livre.isbn,livre.titre,livre.auteurs,livre.id_proprietaire,livre.emplacement,emprunt.id_emprunteur FROM livre LEFT OUTER JOIN emprunt ON (livre.id_livre = emprunt.id_livre)';

    var text = text1;
    if(getEmpruntStatus)
    {
        text = text2;
        values = [];
    }


    client.query(text, values ,(err, res) => {

        var listL = [];
    
        if (err) {
            console.log(err.stack)
        } else {
            for( var i = 0; i < res.rows.length; i++)
            {
                console.log(res.rows[i])
                var livre = {
                    id : res.rows[i].id_livre,
                    isbn : res.rows[i].isbn,
                    titre : res.rows[i].titre,
                    auteurs : res.rows[i].auteurs,
                    id_proprietaire : res.rows[i].id_proprietaire,
                    emplacement : res.rows[i].emplacement
                }
                if(getEmpruntStatus)
                {
                    console.log(res.rows[i].id_emprunteur)
                    livre.empruntStatus = false;
                    if(res.rows[i].id_emprunteur)
                    {
                    }
                }
                listL.push(livre);
            }
        }

        BLIP(err,listL);

    })    



};

InteragitBDD.get1Livre = function(id_livre, callback, getEmpruntStatus=false){


    const text1 = 'SELECT id_livre,isbn,titre,auteurs,id_proprietaire,emplacement FROM livre';
    const text2 = ' WHERE id_livre=$1';
    const text = text1 + text2;

    const values = [id_livre]
    // callback
    client.query(text, values, (err, res) => {


    var livre;

    if (err) {
        console.log(err.stack)
    } else {

        if( res.rows.length > 0)
        {
        var i = 0;
        livre = {
            id : res.rows[i].id_livre,
            isbn : res.rows[i].isbn,
            titre : res.rows[i].titre,
            auteurs : res.rows[i].auteurs,
            id_proprietaire : res.rows[i].id_proprietaire,
            emplacement : res.rows[i].emplacement
            }
        if(getEmpruntStatus)
        {
            get1LivreEmpruntStatus(livre.id , function(e,r){
                if(e){console.log(e)}
                else{ 
                    livre.empruntStatus = r
                }
                callback(err,livre)
            } )
        }

        }

        if( res.rows.length > 1){throw "erreur, plus d'un seul livre pour cet id.";}
    }

    if(!getEmpruntStatus)
        callback(err,livre);

    })


};

InteragitBDD.getListUtilisateurs = function(callback, includeContact=false){

    const text1 = 'SELECT id_emprunteur,nom,prenom';
    var text1bis = '';
    if(includeContact)
    {
        text1bis = ',contact';
    }
    const text2 = ' FROM personne';

    const text = text1 + text1bis + text2;

    // callback
    client.query(text, (err, res) => {


    var listUsers = [];

    if (err) {
        console.log(err.stack)
    } else {
        for( var i = 0; i < res.rows.length; i++)
        {
            var user = {
                id : res.rows[i].id_emprunteur,
                nom : res.rows[i].nom,
                prenom : res.rows[i].prenom
            }

            if( res.rows[i].contact )
            {
                user.contact = res.rows[i].contact
            }
            listUsers.push(user)
        }
    }
    
    if(!getEmpruntStatus)
        callback(err,livre);

    callback(err,listUsers);

    })    
    
};


InteragitBDD.get1Utilisateur= function(id_user,callback){


    const text1 = 'SELECT id_emprunteur,nom,prenom,contact';

    const text2 = ' FROM personne';
    const text3 = ' WHERE id_emprunteur=$1';
    const text = text1 + text2 + text3;

    const values = [id_user]
    // callback
    client.query(text, values, (err, res) => {


    var User;

    if (err) {
        console.log(err.stack)
    } else {

        if( res.rows.length > 0)
        {
        var i = 0;
        User = {
                id : res.rows[i].id_emprunteur,
                nom : res.rows[i].nom,
                prenom : res.rows[i].prenom,
                contact : res.rows[i].contact
             }
        }

        if( res.rows.length > 1){throw "erreur, plus d'un seul utilisateur pour cet id.";}
    }

    callback(err,User);

    })    

};

InteragitBDD.Add1Livre = function( titre , auteurs, id_proprietaire ,emplacement, isbn, resume, callback){

    const text = 'INSERT INTO livre(titre,isbn,auteurs, resume, id_proprietaire, emplacement) VALUES($1, $2, $3,$4,$5,$6) RETURNING id_livre'
    const values = [titre, isbn, auteurs, resume, id_proprietaire, emplacement]

    // callback
    client.query(text, values, (err, res) => {

    var success = false;

    if (err) {
        console.log(err.stack)
    } else {
        success = true;
        //console.log(res.rows[0])
    }
    callback(err,success);

    })
}

InteragitBDD.Add1Utilisateur = function(nom , prenom , contact, callback){

    const text = 'INSERT INTO personne(nom,prenom,contact) VALUES($1, $2, $3) RETURNING id_emprunteur'
    const values = [nom, prenom, contact]

    // callback
    client.query(text, values, (err, res) => {

    var success = false;

    if (err) {
        console.log(err.stack)
    } else {
        success = true;
        //console.log(res.rows[0])
    }
    callback(err,success);

    })
}

InteragitBDD.debutEmprunt = function(id_livre, id_user, deleteFirst = true, callback){

    if(deleteFirst)
    {
        InteragitBDD.finEmprunt(id_livre, function(err,res)
            {
                if(err){console.log(err)}
                else{ InteragitBDD.debutEmprunt(id_livre, id_user, false, callback) }
            })
    }
    else
    {


    const text = 'INSERT INTO emprunt(id_livre, id_emprunteur) VALUES($1, $2)'
    const values = [id_livre, id_user]

    // callback
    client.query(text, values, (err, res) => {

    var success = true;

    if (err) {
        console.log(err.stack)
        success = false;
    } else {
        success = true;
        //console.log(res.rows[0])
    }
    callback(err,success);

    })

    }
}

InteragitBDD.finEmprunt = function(id_livre,callback){

    const text = 'DELETE FROM emprunt WHERE id_livre=$1 RETURNING id_livre'
    const values = [id_livre]
    client.query(text, values, (err, res) => {

    var success = false;

    if (err) {
        console.log(err.stack)
    } else {

        if( res.rows.length > 0)
        {
            success=true;
        }

        if( res.rows.length > 1){throw "erreur, plus d'un seul emprunt pour ce livre.";}
    }

    callback(err,success);

    })
}






module.exports = InteragitBDD;
