

const {Client}  = require("pg");



var InteragitBDD = {}; 

// empruntStatus:   -1 : inconnu
//                  0  : non-emprunté
//                  1  : emprunté

const client = new Client({
                    port:5432})
client.connect()





function get1LivreEmpruntStatus(id_livre){
    
    //requete BDD

    if(id_livre !== 0){
        throw "erreur : aucun livre avec l'id demandé";
    }

    //requete BDD
    var erreur = false;
    if(erreur)
    {
        throw "erreur";
    }

    return 1;
}


function get1LivreEmprunteur(id_livre){
    
    if(!isInt(id_livre))
    {
        throw "erreur get1LivreEmpruntStatus: l'id fournit n'est pas un int." ;
    }

    //requete BDD

    if(id_livre !== 0){
        throw "erreur : aucun livre avec l'id demandé";
    }

    var user = {
        id : 1,
        nom : "Mprunteur",
        prenom : "E.",
    };


    return user;
}


InteragitBDD.getListLivres = function( orderBy="titre", getEmpruntStatus=false, BLIP){

    // i'll do getEmpruntStatus later.

    const text = 'SELECT id_livre,isbn,titre,auteurs,id_proprietaire,emplacement FROM livre';
    
    //const values = [orderBy]

    
    client.query(text ,(err, res) => {

        var listL = [];
    
        if (err) {
            console.log(err.stack)
        } else {
            for( var i = 0; i < res.rows.length; i++)
            {
                var livre = {
                    id : res.rows[i].id_livre,
                    isbn : res.rows[i].isbn,
                    titre : res.rows[i].titre,
                    auteurs : res.rows[i].auteurs,
                    id_proprietaire : res.rows[i].id_proprietaire,
                    emplacement : res.rows[i].emplacement
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
        }

        if( res.rows.length > 1){throw "erreur, plus d'un seul livre pour cet id.";}
    }

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

InteragitBDD.debutEmprunt = function(id_livre, id_user, callback){

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

InteragitBDD.finEmprunt = function(id_livre){

    //do stuff

    var erreur = false;
    if(erreur)
    {
        throw "erreur";
    }
    return true;
}






module.exports = InteragitBDD;
