var express = require('express');
var router = express.Router();
var isbn = require('node-isbn');
const InteragitBDD = require('../lib/InteragitBDD');

/* =============================================================
partie bidon en attendant le developpement de l'API BDD */

/* definition d'une classe livre */
function Livre(id, isbn, titre, auteurs, id_proprietaire, emplacement, empruntStatus) {
    this.id = id;
    this.isbn = isbn;
    this.titre = titre;
    this.auteurs = auteurs;
    this.id_proprietaire = id_proprietaire;
    this.emplacement = emplacement;
    this.empruntStatus = empruntStatus;
}


/*instanciation de livre */
var livre1 = new Livre(1, "132321321312", "Toto à la plage", "Hugo V", 4, "dtc", false);
var livre2 = new Livre(2, "98746468987", "Toto à la montagne", "Zola E", 4, "dtc", true);
var livre3 = new Livre(3, "1337", "Toto à la ferme de calcul", "Delmotte S", 12, "Omega", false);

/* constructiuon d'un tableau de livres */
var listeLivres = [];
listeLivres.push(livre1, livre2, livre3);
//console.log(listeLivres);

// ============================================================== */

/* GET home page. */
router.get('/', function(req, res, next) {

  InteragitBDD.getListLivres("titre", false, function(e,r){
        if(e){console.log(e);}
        else{
          console.log(r);
          res.render('index', { title: 'LBBE-Books', liste: r });
        }
    } );

});

/* GET creerCompte. */
router.get('/creerCompte', function(req, res, next) {
  res.render('creerCompte');
});


// router.post('/creerCompte', function(requete, res) {
//   res.render('index', { title: 'LBBE-zob', msg: requete.body.nom});
// });

router.get('/livre/:id', function(req, res, next) {
  InteragitBDD.GetLivre(req.params.id, function(err, livre) {
    if (livre !== undefined) {
      res.render('LivreRecherche', livre);
    } else {
      var errorGetlivre = {
        status : "",
        stack : ""
      }
      res.render('error',{message:"Le livre demandé n'a pas été trouvé", error:errorGetlivre});
    }
  });

  // var livre ={
  //   titre : "Guerre et pet",
  //   auteur : "Voldemort",
  //   resume : "..."
  // }
  // res.render('LivreRecherche', livre);

});

/* Add a book to the DB. */
router.post('/AjouterLivre', function (req, res) {
  var ISBN = req.body.ISBN;
  var titre_livre= req.body.titre;
  // console.log(titre_livre);
  var auteurs = req.body.auteurs;
  var resume = req.body.resume;
  var emplacement = req.body.emplacement;
  var id_proprietaire = req.body.id_proprietaire;
  // InteragitBDD.Add1Livre( titre_livre , auteurs, id_proprietaire ,emplacement, ISBN, resume);

  InteragitBDD.Add1Livre( titre_livre , auteurs, id_proprietaire ,emplacement, ISBN, resume, callback=function(e,r){
      if(e){console.log(e);}
      else{
        console.log(r);
        if(r){ res.render('ValidationLivreAjoute',{title: 'contact' , titre_livre:titre_livre}); }// render et pas sendFile car utilisation d un moteur de rendu
        else{ res.render('ErreurLivreAjoute',{title: 'contact' , titre_livre:titre_livre}); }
      } 
    
  }) // should print true if all goes well


});


router.post('/Emprunter', function(requete, res, next) {
  console.log("Miaou");
  console.log("L'utilisateur "+ requete.body.emprunteur, "a emprunte " +requete.body.livre);

  // Ici une requete
  //
  //une promesse qui fait la requete, qui renvoie sur une page bilan en cas de succes et vers une page d'erreur sinon
  res.render('ErreurEmprunterRendre', { title:requete.body.emprunteur+ ' a echoue a emprunter '+requete.body.livre  });
  //res.render('Emprunter', { title:requete.body.emprunteur+ ' a emprunte '+requete.body.livre ,livre: requete.body.livre,emprunteur: requete.body.emprunteur });
});

router.post('/Rendre', function(requete, res, next) {
  console.log("Le livre " +requete.body.livre + "est rendu");

  // Ici une requete
  //
  //une promesse qui fait la requete, qui renvoie sur une page bilan en cas de succes et vers une page d'erreur sinon
  res.render('ErreurEmprunterRendre', { title:'La restitution de '+requete.body.livre + ' a echoue' });
  //res.render('Rendre', {livre: requete.body.livre });

});

/* GET page ajouter livre */
router.get('/ajouterLivre', function(req, res, next) {
  // recuperer ici les proprietaires ds la bdd (utilisation de la methode adequat du module interragitBDD  var proprietaires =  interrogation_bdd.getListUtilisateurs();
  InteragitBDD.getListUtilisateurs(function(e,r){
    if(e){console.log(e);}
    else{
      console.log(r);
      res.render('ajouterLivre', { title: 'LBBE-Books ajouter un livre', liste_proprietaires: r });
    }
  });
});

/* POST search ISBN*/
router.post('/searchISBN', function(req, res, next) {
  var isbn_livre=req.body.isbn;
  isbn.resolve(isbn_livre, function (err, book) {
    // il faut ameliorer ici la gestion de l'erreur voir dans la donc node-isbn
    if (err) {
      res.status(444).json('Pas de livre trouvé avec cet ISBN');
    } else {
      res.json(book);
    }
  });
});


module.exports = router;
