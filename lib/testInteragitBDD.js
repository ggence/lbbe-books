
var IBDD = require("./InteragitBDD.js");



var LU;
IBDD.getListUtilisateurs(function(e,r){
    if(e){console.log(e);}
    else{console.log(r);}
})



IBDD.get1Utilisateur(0,function(e,r){
    if(e){console.log(e);}
    else{console.log(r);}
}) // will not find anything


IBDD.get1Utilisateur(1,function(e,r){
    if(e){console.log(e);}
    else{console.log(r);}
}) // will find 1 user


//IBDD.Add1Utilisateur("Duchemin","Wandrille","wandrille.duchemin@univ-lyon1.fr", function(e,r){
//    if(e){console.log(e);}
//    else{console.log(r);}
//});

//IBDD.Add1Livre( "titre" , "auteurs", 3 ,"emplacement", "","",callback=function(e,r){
//    if(e){console.log(e);}
//    else{console.log(r);} }) // should print true if all goes well



IBDD.getListLivres("titre", false, function(e,r){
        if(e){console.log(e);}
        else{console.log(r);}
    } );

IBDD.get1Livre(2,function(e,r){
        if(e){console.log(e);}
        else{console.log(r);}
    }, true);

IBDD.debutEmprunt(2, 3, function(e,r){
        if(e){console.log(e);}
        else{console.log(r);}
    });

//IBDD.finEmprunt(2,function(e,r){
//        if(e){console.log(e);}
//        else{console.log(r);}
//    });