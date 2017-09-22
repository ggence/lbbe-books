


var InteragitBDD = {}; 

// empruntStatus:   -1 : inconnu
//                  0  : non-emprunté
//                  1  : emprunté


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


InteragitBDD.getListLivres = function(orderBy="titre", getEmpruntStatus=false){

    // check que le orderby correspond bien à une colone existante??

    // requete BDD
    var listLivres = [];

    var livre1 = {
        id : 0,
        isbn : "1234567890",
        titre : "ceci est un titre",
        auteurs : "A. Uteur et C. Oauteur",
        id_proprietaire : 0,
        emplacement : "là où il se trouve"
        empruntStatus : -1
    } // pour une vue plus "compacte" je ne récupère pas le résumé

    var erreur = false;
    if(erreur)
    {
        throw "erreur";
    }

    if(getEmpruntStatus){
        
        livre1.getEmpruntStatus = get1LivreEmpruntStatus(livre1.id_livre);
    }

    listLivres.push(livre1);

    return  listLivres;
);

InteragitBDD.get1Livre = function(id_livre, getEmpruntStatus=false){


    if(!isInt(id_livre))
    {
        throw "erreur get1Livre: l'id fournit n'est pas un int." ;
    }

    // requete BDD

    var livre1 = {
        id : id_livre,
        isbn : "1234567890",
        titre : "ceci est un titre",
        auteurs : "A. Uteur et C. Oauteur",
        id_proprietaire : "P. Ropriétaire",
        resume ; "resumé\ntrès\ncomplet!"
        emplacement : "là où il se trouve"
        empruntStatus : -1
    }


    var erreur = false;
    if(erreur)
    {
        throw "erreur";
    }

    if(getEmpruntStatus){
        
        livre1.getEmpruntStatus = get1LivreEmpruntStatus(livre1.id_livre);
    }

    return  livre1;
);

InteragitBDD.getListUtilisateurs = function(includeContact=false){

    // requete BDD
    var erreur = false;
    var listUsers = [];

    var user1 = {
        id : 0,
        nom : "Ropriétaire",
        prenom : "P.",
    } 
    var user2 = {
        id : 1,
        nom : "Mprunteur",
        prenom : "E.",
    };

    if(includeContact)
    {
        user1.contact : "PR@user.com";
        user2.contact : "EM@user.com";
    }

    if(erreur)
    {
        throw "erreur";
    }

    listUsers.push(user1);
    listUsers.push(user2);
    
    return  listUsers;
);


InteragitBDD.get1Utilisateur= function(id_user){

    // requete BDD
    var erreur = false;


    var user1 = {
        id : 0,
        nom : "Ropriétaire",
        prenom : "P.",
        contact : "PR@user.com"
    } 
    var user2 = {
        id : 1,
        nom : "Mprunteur",
        prenom : "E.",
        contact : "EM@user.com"
    };


    if(id_user>1)
    {
        throw "erreur : pas d'utilisateur avec cet id";
    }

    listUsers.push(user1);
    listUsers.push(user2);
    
    return  listUsers[id_user];
);

InteragitBDD.Add1Livre = function( titre , auteurs, id_proprietaire ,emplacement, isbn="", resume="")

    //add stuff

    var erreur = false;
    if(erreur)
    {
        throw "erreur";
    }
    return true;
}

InteragitBDD.Add1Utilisateur = function(nom , prenom , contact){

    var erreur = false;
    if(erreur)
    {
        throw "erreur";
    }
    
    return true;

}

InteragitBDD.debutEmprunt = function(id_livre, id_user){

    //do stuff

    var erreur = false;
    if(erreur)
    {
        throw "erreur";
    }
    return true;
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
